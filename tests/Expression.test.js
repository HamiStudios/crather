const
  Expression  = require('./../src/definitions/Expression')
;

let
  expression  = undefined
;

beforeEach(() => {
  
  expression = new Expression('{{ test }}', 'test', 'STANDARD');
  
});
  
test('getEntity() should return `{{ test }}`', () => {
  
  expect(expression.getEntity())
    .toBe('{{ test }}');
  
});

test('getValue() should return `test`', () => {
  
  expect(expression.getValue())
    .toBe('test');
  
});

test('getType() should return `STANDARD`', () => {
  
  expect(expression.getType())
    .toBe('STANDARD');
  
});

test('setResolved() should set the resolved value', () => {
  
  expression.setResolved('test text');
  
  expect(expression.resolved)
    .toBe('test text');
  
});

test('getResolved() should return `test text`', () => {
  
  expression.resolved = 'test text';
  
  expect(expression.getResolved())
    .toBe('test text');
  
});

test('equals should return true when compared to itself', () => {
  
  expect(expression.equals(expression))
    .toBe(true);
  
});
