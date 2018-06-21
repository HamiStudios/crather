const
  Expression  = require('./definitions/Expression')
;

/**
 * Create a new instance of Result
 *
 * @param {string} rendered The rendered file content
 * @param {Expression[]} expressions An array of the expressions parsed in the content
 * @constructor
 */
function Result(rendered, expressions) {

  this._rendered = rendered;
  this._expressions = expressions;

}

/**
 * Get the rendered file content
 *
 * @returns {string} The rendered content
 */
Result.prototype.getRendered = function () {
  
  return this._rendered;
  
};

/**
 * Get the expressions parsed in the content
 *
 * @returns {Expression[]} The expressions parsed
 */
Result.prototype.getExpressions = function () {
  
  return this._expressions;
  
};


module.exports = Result;
