const
  // lib modules
  Expression    = require('./definitions/Expression')
;

/**
 * Create a new instance of Replacer
 *
 * @param {string} fileContent The original file content
 * @constructor
 */
function Replacer(fileContent) {

  this.fileContent = fileContent;

}

/**
 * Replace an expression within the file content with a value
 *
 * @param {Expression} expression The expression to replace
 */
Replacer.prototype.replace = function (expression) {

  let
    regex = new RegExp(expression.getEntity(), '')
  ;

  this.fileContent = this.fileContent.replace(regex, expression.getResolved());

};

/**
 * Get the replaced result
 *
 * @returns {string} The result
 */
Replacer.prototype.getResult = function () {

  return this.fileContent;

};


module.exports = Replacer;
