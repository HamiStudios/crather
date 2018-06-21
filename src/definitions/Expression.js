/**
 * Create a new Expression instance
 *
 * @param {string} entity The expression as written in the data e.g. "{{ some.value }}"
 * @param {string} value The expression value e.g. "some.value"
 * @param {string} type The expression type
 * @constructor
 */
function Expression(entity, value, type) {

  this.entity = entity;
  this.value = value;
  this.type = type;
  this.resolved = '';

}

/**
 * Get the expression entity
 *
 * @returns {string} The expression entity
 */
Expression.prototype.getEntity = function () {

  return this.entity;

};

/**
 * Get the expression value
 *
 * @returns {string} The expression value
 */
Expression.prototype.getValue = function () {
  
  return this.value;
  
};

/**
 * Get the expression type
 *
 * @returns {string} The expression type
 */
Expression.prototype.getType = function () {
  
  return this.type.toUpperCase();
  
};

/**
 * Get the resolved value
 *
 * @returns {string} The resolved value
 */
Expression.prototype.getResolved = function () {

  return this.resolved;

};

/**
 * Set the resolved value
 *
 * @param {string} value The value to set as resolved
 */
Expression.prototype.setResolved = function (value) {

  this.resolved = value;

};

/**
 * Check if an expression matches this expression
 *
 * @param {Expression} expression The expression to compare too
 * @returns {boolean} Whether it equals this expression
 */
Expression.prototype.equals = function (expression) {
  
  return expression.getEntity() === this.entity &&
    expression.getValue() === this.value &&
    expression.getType().toLowerCase() === this.type.toLowerCase();
  
};


module.exports = Expression;
