const
  // node
  dotProp         = require('dot-prop'),
  fs              = require('fs'),
  path            = require('path'),
  circleAssign      = require('circle-assign'),
  
  // lib modules
  Expression      = require('./definitions/Expression')
;

/**
 * Create a new instance of Resolver
 *
 * @param {Object} data An object containing the data for expressions
 * @param {string} templatesDir The path to the templates directory
 * @param {string} scriptsDir The path to the scripts directory
 * @constructor
 */
function Resolver(data, templatesDir, scriptsDir) {
  
  this.data = data;
  this.templatesDir = path.resolve(templatesDir);
  this.scriptsDir = path.resolve(scriptsDir);
  
}

/**
 * Resolve the expressions
 *
 * @param {Expression} expression The expression to resolve
 * @param {function(err: Error, result: string, data: Object)} callback The function ran which returns the result
 * @private
 */
Resolver.prototype._resolveExpression = function (expression, callback) {
  
  if(expression instanceof Expression) {
  
    if(expression.getType().toLowerCase() === 'standard') {
    
      // return the specified value from the data
      callback(null, dotProp.get(this.data, expression.getValue(), null), this.data);
    
    } else if(expression.getType().toLowerCase() === 'template') {
    
      // generate the template path
      let
        self          = this,
        value         = expression.getValue().split('.'),
        filename      = value.pop() + '.crather',
        dir           = value.join('/') + '/',
        templatePath  = path.resolve(this.templatesDir + '/' + dir + filename)
      ;
    
      this._checkFileExists(templatePath, function (exists) {
      
        if(!exists) {
        
          // if the file doesn't exist return an error with a custom error message
          callback(new Error(`Template file '${templatePath}' does not exist.`), '', self.data);
        
        } else {
        
          self._getTemplateContent(templatePath, function (err, content) {
          
            if (err) {
            
              // if error return it with no content
              callback(err, '', self.data);
            
            } else {
            
              // if no errors return the template file content
              callback(null, content, self.data);
            
            }
          
          });
        
        }
      
      });
    
    } else if(expression.getType().toLowerCase() === 'script') {
      
      // generate the script path
      let
        self          = this,
        value         = expression.getValue().split('.'),
        filename      = value.pop() + '.js',
        dir           = value.join('/') + '/',
        scriptPath    = path.resolve(this.scriptsDir + '/' + dir + filename)
      ;

      this._checkFileExists(scriptPath, function (exists) {
      
        if(!exists) {

          // if it doesn't exist return a custom error message
          callback(new Error(`Script file '${scriptPath}' does not exist.`), '', self.data);
        
        } else {

          // require the script file
          let
            script  = self._getScriptFunction(scriptPath)
          ;

          // check if the script file is a function
          if(typeof script === 'function') {

            // if the script is a function execute it
            script(self.data, function (result, data) {

              // return the script result
              callback(
                null,
                (
                  (result === null ||
                    result === undefined)
                    ? '' : result
                ),
                circleAssign({}, self.data, data)
              );
            
            });
          
          } else {
          
            // if the script isn't a function return a custom error
            callback(new Error(`Script file '${scriptPath}' does not return a ScriptFunction instance or function.`), '', self.data);
          
          }
        
        }
      
      });
  
    } else {
  
      callback(new Error(`The expression is not an instance of Expression.`), '', self.data);
  
    }
    
  } else {
  
    callback(new Error(`The expression is not an instance of Expression.`), '', self.data);
  
  }
  
};

/**
 * Get the specified template file content
 *
 * @param {string} templatePath The template file path
 * @param {function(err: Error, content: string)} callback The function ran when the content is fetched
 * @private
 */
Resolver.prototype._getTemplateContent = function (templatePath, callback) {
  
  // read the template file
  fs.readFile(
    templatePath,
    {
      encoding  : 'utf8',
      flag      : 'r'
    },
    function (err, content) {
      
      callback(err, content);
      
    }
  );
  
};

/**
 * Check if a file exists
 *
 * @param {string} path The file path
 * @param {function(exists: boolean)} callback The function which is ran once checked
 * @private
 */
Resolver.prototype._checkFileExists = function (path, callback) {
  
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
 * Fetch the function from a script file
 *
 * @param scriptPath
 * @returns {*}
 * @private
 */
Resolver.prototype._getScriptFunction = function (scriptPath) {

  return require(scriptPath);
  
};

/**
 * Resolve expressions for there values
 *
 * @param {Expression} expression The expression to resolve
 * @param {function(err: Error, result: string, data: Object)} callback The function ran which returns the result
 */
Resolver.prototype.resolve = function (expression, callback) {
  
  this._resolveExpression(expression, callback);
  
};


module.exports = Resolver;
