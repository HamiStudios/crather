const
  ScriptFunction  = require('./../../../src/definitions/ScriptFunction')
;


module.exports = ScriptFunction(function () {
  
  this.setRender('test script');
  
  this.finished();

});
