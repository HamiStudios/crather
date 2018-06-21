const
  Replacer    = require('./../src/Replacer'),
  Expression  = require('./../src/definitions/Expression')
;

let
  replacer    = undefined,
  expression  = undefined
;

beforeEach(() => {
  
  replacer  = new Replacer(
    'Hi there {{ name }}'
  );
  
  expression = new Expression('{{ name }}', 'name', 'STANDARD');
  
  expression.resolved = 'hammy2899';
  
});

test('replace() should replace `{{ test }}` to `hammy2899`', () => {
  
  replacer.replace(
    expression
  );
  
  expect(replacer.fileContent)
    .toBe('Hi there hammy2899');
  
});

test('getResult() should return the replaced content', () => {
  
  replacer.replace(
    expression
  );
  
  expect(replacer.getResult())
    .toBe('Hi there hammy2899');
  
});
