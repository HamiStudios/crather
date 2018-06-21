let
  scriptContext         = undefined,
  scriptDataText        = undefined,
  scriptDataNull        = undefined,
  scriptDataTextChanged = undefined,
  scriptReturnRender    = undefined,
  scriptReturnData      = undefined
;

const
  ScriptFunction  = require('./../src/definitions/ScriptFunction')
;

let
  script  = undefined
;

beforeEach((done) => {
  
  script = ScriptFunction(function () {
    
    scriptContext = this;
    
    scriptDataText = this.getData().text;
    
    this.setData(null);
    
    scriptDataNull = this.getData();
    
    this.setData({
      text: 'text changed'
    });
    
    scriptDataTextChanged = this.getData().text;
    
    this.setRender('test script');
    
    this.finished();
    
  });
  
  script({
    text: 'test text'
  }, function (render, data) {
    
    scriptReturnRender = render;
    scriptReturnData = data;
    
    done();
    
  });
  
});

test('ScriptFunction() should return a function', () => {
  
  expect(typeof script)
    .toBe('function');
  
});

test('Script should have access to getData()', () => {
  
  expect(typeof scriptContext.getData)
    .toBe('function');
  
});

test('Script should have access to setData()', () => {
  
  expect(typeof scriptContext.setData)
    .toBe('function');
  
});

test('Script should have access to setRender()', () => {
  
  expect(typeof scriptContext.setRender)
    .toBe('function');
  
});

test('Script should have access to finished()', () => {
  
  expect(typeof scriptContext.finished)
    .toBe('function');
  
});

test('Script data should equal same since setData() value was not an object', () => {
  
  expect(scriptDataNull)
    .toEqual({ text: 'test text' });
  
});

test('Script data `text` should equal `test text` with getData() call', () => {
  
  expect(scriptDataText)
    .toBe('test text');
  
});

test('Script data `text` should change to `text changed` on setData() call', () => {
  
  expect(scriptDataText)
    .toBe('test text');
  
});

test('Script result should be `test script`', () => {
  
  expect(scriptReturnRender)
    .toBe('test script');
  
});

test('Script return data should be `{ text: "text changed" }`', () => {
  
  expect(scriptReturnData)
    .toEqual({ text: "text changed" });
  
});
