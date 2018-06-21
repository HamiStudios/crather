const
  Result      = require('./../src/Result'),
  Expression  = require('./../src/definitions/Expression')
;

let
  result  = undefined
;

beforeEach(() => {
  
  result = new Result(
    'rendered content',
    [
      new Expression('{{ test }}', 'test', 'STANDARD'),
      new Expression('{{> test }}', 'test', 'TEMPLATE'),
      new Expression('{{; test }}', 'test', 'SCRIPT')
    ]
  );
  
});

test('getRendered() should return `rendered content`', () => {
  
  expect(result.getRendered())
    .toBe('rendered content');
  
});

test('getExpressions() should return an array with 3 entries', () => {
  
  expect(result.getExpressions())
    .toHaveLength(3);
  
});

test('getExpressions() array index 0 should be a STANDARD expression', () => {
  
  expect(result.getExpressions()[0].getType())
    .toBe('STANDARD');
  
});


test('getExpressions() array index 1 should be a TEMPLATE expression', () => {
  
  expect(result.getExpressions()[1].getType())
    .toBe('TEMPLATE');
  
});


test('getExpressions() array index 2 should be a SCRIPT expression', () => {
  
  expect(result.getExpressions()[2].getType())
    .toBe('SCRIPT');
  
});
