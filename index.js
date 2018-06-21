const
  Crather         = require('./src/Crather'),
  ScriptFunction  = require('./src/definitions/ScriptFunction')
;

/**
 * Express render function initializer
 */
function express() {

  let
    crather = new Crather()
  ;
  
  /**
   * Express render function for crather
   *
   * @param {string} filePath The path to the file you want to render
   * @param {Object} options An object of data and options
   * @param {function(err: Error, result: string)} callback The callback for when the file is rendered
   */
  return function (filePath, options, callback) {
    
    crather.setOptions({
      data             : options,
      templates        : options.settings.templates || './templates',
      scripts          : options.settings.scripts || './scripts'
    });
  
    crather.parse(
      filePath,
      function (err, result) {
      
        callback(err, err ? '' : result.getRendered());
      
      }
    );
    
  }.bind(this);

}

// add the express function onto Crather
Crather.express = express;

// add ScriptFunction onto Crather
Crather.script = ScriptFunction;


module.exports = Crather;
