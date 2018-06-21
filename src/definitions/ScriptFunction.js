const
  // node
  circleAssign  = require('circle-assign')
;

/**
 * Create a new instance of ScriptFunction
 *
 * @param {function} func The script function
 * @returns {function} The script function with a custom context
 * @constructor
 */
function ScriptFunction(func) {
  
  let
    context = this
  ;
  
  return function (data, finished) {
    
    context._render = '';
    context._data  = data;
    context._finished = finished;
  
    /**
     * Get the data
     *
     * @return {Object} The data
     */
    context.getData = function () {
    
      return context._data;
    
    };
  
    /**
     * Set the specified key to the value in the data
     *
     * @param {Object} value An object to override the current data with
     */
    context.setData = function (value) {
    
      context._data = circleAssign(context._data, value || {});
    
    };
  
    /**
     * Set what the script expression will be rendered as
     *
     * @param {string} value The render value
     */
    context.setRender = function (value) {
    
      context._render = value;
    
    };
  
    /**
     * Marks the script as complete
     */
    context.finished = function () {
    
      context._finished(context._render, context._data);
    
    };
  
    func.apply(context);
    
  };

}


module.exports = ScriptFunction;
