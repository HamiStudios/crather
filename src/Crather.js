const
  // node
  fs              = require('fs'),
  path            = require('path'),
  circleAssign      = require('circle-assign'),

  // lib modules
  Scanner         = require('./Scanner'),
  Resolver        = require('./Resolver'),
  Replacer        = require('./Replacer'),
  Result          = require('./Result'),
  Expression      = require('./definitions/Expression'),

  // global variables
  defaultOptions  = {
    data            : {},
    templates       : './templates',
    scripts         : './scripts',
    tags            : {
      standard        : {
        open            : '{{\\s*',
        close           : '\\s*}}'
      },
      templates       : {
        open            : '{{>\\s*',
        close           : '\\s*}}'
      },
      scripts         : {
        open            : '{{;\\s*',
        close           : '\\s*}}'
      }
    }
  }
;


/**
 * Create a new instance of Crather
 *
 * @param {Object} [options] Specify custom options
 * @param {Object} [options.data] An object containing expression data
 * @param {string} [options.templates] The templates directory path
 * @param {string} [options.scripts] The scripts directory path
 * @param {Object} [options.tags] An object defining expression tags
 * @param {Object} [options.tags.standard] An object defining tags for the standard expressions
 * @param {string} [options.tags.standard.open] A string specifying the open tag for the standard expression
 * @param {string} [options.tags.standard.close] A string specifying the close tag for the standard expression
 * @param {Object} [options.tags.templates] An object defining tags for the template expressions
 * @param {string} [options.tags.templates.open] A string specifying the open tag for the template expression
 * @param {string} [options.tags.templates.close] A string specifying the close tag for the template expression
 * @param {Object} [options.tags.scripts] An object defining tags for the script expressions
 * @param {string} [options.tags.scripts.open] A string specifying the open tag for the script expression
 * @param {string} [options.tags.scripts.close] A string specifying the close tag for the script expression
 * @constructor
 */
function Crather(options) {

  /**
   * @property {Object} data
   * @property {string} templates
   * @property {string} scripts
   * @property {Object} tags
   * @property {Object} tags.standard
   * @property {string} tags.standard.open
   * @property {string} tags.standard.close
   * @property {Object} tags.templates
   * @property {string} tags.templates.open
   * @property {string} tags.templates.close
   * @property {Object} tags.scripts
   * @property {string} tags.scripts.open
   * @property {string} tags.scripts.close
   */
  this._originalOptions = circleAssign(defaultOptions, options);
  this.options = circleAssign({}, this._originalOptions);

  this.globals = circleAssign({}, Crather.globals);

}

// set default globals value
Crather.globals = {};

/**
 * Set the options
 *
 * @param {Object} [options] Specify custom options
 * @param {Object} [options.data] An object containing expression data
 * @param {string} [options.templates] The templates directory path
 * @param {string} [options.scripts] The scripts directory path
 * @param {Object} [options.tags] An object defining expression tags
 * @param {Object} [options.tags.standard] An object defining tags for the standard expressions
 * @param {string} [options.tags.standard.open] A string specifying the open tag for the standard expression
 * @param {string} [options.tags.standard.close] A string specifying the close tag for the standard expression
 * @param {Object} [options.tags.templates] An object defining tags for the template expressions
 * @param {string} [options.tags.templates.open] A string specifying the open tag for the template expression
 * @param {string} [options.tags.templates.close] A string specifying the close tag for the template expression
 * @param {Object} [options.tags.scripts] An object defining tags for the script expressions
 * @param {string} [options.tags.scripts.open] A string specifying the open tag for the script expression
 * @param {string} [options.tags.scripts.close] A string specifying the close tag for the script expression
 */
Crather.prototype.setOptions = function (options) {
  
  this._originalOptions = circleAssign(defaultOptions, options);
  this.options = circleAssign({}, this._originalOptions);
  
};

/**
 * Parse the specified file
 *
 * @param {string} filepath File path for the file you want to resolve
 * @param {function(err: Error, result: Result)} callback The function ran when complete
 */
Crather.prototype.parse = function (filepath, callback) {
  
  this.options = circleAssign({}, this._originalOptions);
  
  this.filepath = path.resolve(filepath);
  this.expressions = [];

  let
    self  = this
  ;

  this._getFileData(this.filepath, function (err, content) {
    
    if(err) {

      callback(err, null);

    } else {
  
      self.fileContent = content;
  
      let
        performParse  = function (callback) {
      
          let
            scanner         = new Scanner(
              self.fileContent,
              self.options.tags
            ),
            replacer        = new Replacer(
              self.fileContent
            ),
            expressions     = scanner.getExpressions(),
            resolved        = [],
            resolve_queue   = [],
            completed_queue = -1,
            queueControl    = function () {
            
              completed_queue++;
              
              if(typeof resolve_queue[completed_queue] === 'function') {
              
                resolve_queue[completed_queue](function () {
                
                  queueControl();
                
                });
              
              } else {
  
                callback(replacer.getResult(), resolved);
              
              }
             
            }
          ;
      
          for (let i = 0; i < expressions.length; i++) {
        
            let
              expression  = expressions[i]
            ;
        
            // add a new resolve to the queue
            resolve_queue.push(function (done) {
  
              // create a new resolve to resolve the expression
              let
                resolver        = new Resolver(
                  circleAssign(self.globals, self.options.data),
                  self.options.templates,
                  self.options.scripts
                )
              ;

              resolver.resolve(expression, function (err, resolution, data) {

                self.options.data = circleAssign(self.options.data, data);
                
                expression.setResolved(resolution);
                resolved.push(expression);

                replacer.replace(expression);
                
                // mark the resolve as done (moves on to the next resolve in the queue)
                done();
    
              });
            
            });
        
          }
          
          // start resolving the queue
          queueControl();
      
        },
        check         = function () {
      
          let
            scanner = new Scanner(
              self.fileContent,
              self.options.tags
            )
          ;
      
          // check if the content still has expressions
          if(scanner.getExpressions().length > 0) {
        
            performParse(function (result, expressions) {
          
              self.fileContent = result;
          
              self.expressions.push(...expressions);
          
              check();
          
            });
        
          } else {
        
            let
              result = new Result(
                self.fileContent,
                self.expressions
              )
            ;
        
            callback(null, result);
        
          }
      
        }
      ;

      check();

    }

  });

};

/**
 * Check if a file exists
 *
 * @param {string} path The file path
 * @param {function(exists: boolean)} callback The function which is ran once checked
 * @private
 */
Crather.prototype._checkFileExists = function (path, callback) {
  
  // check if the file exists
  fs.access(
    path,
    fs.constants.F_OK,
    function (err) {

      callback(!err);
      
    }
  );
  
};

/**
 * Get the specified file's content
 *
 * @param {string} path The file path
 * @param {function(err: Error, content: string)} callback The function to run when the content is fetched
 * @private
 */
Crather.prototype._getFileData = function (path, callback) {
  
  let
    self  = this
  ;
  
  this._checkFileExists(path, function (exists) {
    
    if(!exists) {
  
      callback(new Error(`File '${self.filepath}' does not exist.`), '');
    
    } else {
  
      fs.readFile(
        path,
        {
          encoding  : 'utf8',
          flag      : 'r'
        },
        function (err, content) {
      
          if(err) {
          
            callback(err, '');
          
          } else {
        
            callback(null, content);
        
          }
      
        }
      );
      
    }
    
  });

};


module.exports = Crather;
