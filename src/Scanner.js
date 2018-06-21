const
  // node
  circleAssign    = require('circle-assign'),

  // lib modules
  Expression    = require('./definitions/Expression'),

  // global variables
  defaultTags   = {
    standard      : {
      open          : '{{\\s*',
      close         : '\\s*}}'
    },
    templates     : {
      open          : '{{>\\s*',
      close         : '\\s*}}'
    },
    scripts       : {
      open          : '{{;\\s*',
      close         : '\\s*}}'
    }
  },
  allowedValue  = '[A-Za-z0-9\\-\\_\\.]*'
;


/**
 * Create a new instance of Scanner
 *
 * @param {string} data Data to scan
 * @param {Object} [tags] An object defining expression tags
 * @param {Object} [tags.standard] An object defining tags for the standard expressions
 * @param {string} [tags.standard.open] A string specifying the open tag for the standard expression
 * @param {string} [tags.standard.close] A string specifying the close tag for the standard expression
 * @param {Object} [tags.templates] An object defining tags for the template expressions
 * @param {string} [tags.templates.open] A string specifying the open tag for the template expression
 * @param {string} [tags.templates.close] A string specifying the close tag for the template expression
 * @param {Object} [tags.scripts] An object defining tags for the script expressions
 * @param {string} [tags.scripts.open] A string specifying the open tag for the script expression
 * @param {string} [tags.scripts.close] A string specifying the close tag for the script expression
 * @constructor
 */
function Scanner(data, tags) {

  this.data = data;
  this.tags = circleAssign(defaultTags, tags || {});
  
  this.expressions = this._findExpressions();

}

Scanner.prototype._getExpressionType = function (match) {

  let
    standard  = new RegExp(`${this.tags['standard']['open']}${allowedValue}${this.tags['standard']['close']}`, 'g'),
    template  = new RegExp(`${this.tags['templates']['open']}${allowedValue}${this.tags['templates']['close']}`, 'g'),
    script    = new RegExp(`${this.tags['scripts']['open']}${allowedValue}${this.tags['scripts']['close']}`, 'g')
  ;
  
  if(standard.test(match)) {
    
    return 'STANDARD';
    
  } else if(template.test(match)) {
  
    return 'TEMPLATE';
    
  } else if(script.test(match)) {
  
    return 'SCRIPT';
    
  } else {
  
    return 'UNKNOWN';
  
  }

};

/**
 * Find expression matches in the data
 *
 * @returns {Expression[]} An array of matches
 * @private
 */
Scanner.prototype._findMatches = function () {

  let
    regex     = new RegExp(
      `(${this.tags['standard']['open']}|${this.tags['templates']['open']}|${this.tags['scripts']['open']})(${allowedValue})(${this.tags['standard']['close']}|${this.tags['templates']['close']}|${this.tags['scripts']['close']})`,
      'g'
    ),
    matches   = [ ...this.data.match(regex) || [] ],
    instances = []
  ;

  for (let i = 0; i < matches.length; i++) {

    let
      match   = matches[i],
      type    = this._getExpressionType(match).toLowerCase(),
      tagType = (type === 'standard') ? 'standard' : type + 's',
      value   = this._getValueFromEntity(
        match,
        this.tags[tagType]['open'],
        this.tags[tagType]['close']
      )
    ;

    instances.push(new Expression(match, value, type));

  }

  return instances;

};

/**
 * Get the value from an expression entity
 *
 * @param {string} entity Entity from the data
 * @param {string} open Opening tag for the expression
 * @param {string} close Closing tag for the expression
 * @returns {string} The entity value
 * @private
 */
Scanner.prototype._getValueFromEntity = function (entity, open, close) {

  let
    regex   = new RegExp(`${open}|${close}`, 'g')
  ;
  
  return entity.replace(regex, '');

};

/**
 * Find expressions in the data provided
 *
 * @returns {Expression[]} An array of expressions
 * @private
 */
Scanner.prototype._findExpressions = function () {

  return this._findMatches();
  
};

/**
 * Get an array of expressions in the data provided
 *
 * @returns {Expression[]} An array of expressions
 */
Scanner.prototype.getExpressions = function () {

  return this.expressions;

};


module.exports = Scanner;
