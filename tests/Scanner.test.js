const
  Scanner         = require('./../src/Scanner'),
  Expression      = require('./../src/definitions/Expression'),
  dataWithMatch   = 'Hi there {{ name }}\n{{ name }} you have a message: {{> message }}\n{{; some.script }}',
  dataNoMatch     = 'test text'
;

let
  scannerMatch    = undefined,
  scannerNoMatch  = undefined
;

beforeEach(() => {
  
  scannerMatch = new Scanner(dataWithMatch);
  scannerNoMatch = new Scanner(dataNoMatch);
  
});

describe('private methods', () => {
  
  describe('Expression', () => {
  
    test('_getValueFromEntity() should return `test` from `{{ test }}`', () => {
    
      expect(Scanner.prototype._getValueFromEntity('{{ test }}', '{{\\s*', '\\s*}}'))
        .toBe('test');
    
    });
  
    test('_findMatches() should return an empty array', () => {
    
      expect(scannerNoMatch._findMatches())
        .toHaveLength(0);
    
    });
  
    test('_findMatches() array index 0 should be an Expression', () => {
  
      expect(scannerMatch._findMatches()[0])
        .toBeInstanceOf(Expression);
    
    });
    
    test('_getExpressionType() should return `UNKNOWN` when it cannot match the type', () => {
    
      expect(scannerNoMatch._getExpressionType('[ UNKNOWN_TYPE ]'))
        .toBe('UNKNOWN');
    
    });
    
  });
  
});

describe('public methods', () => {
  
  test('getExpressions() should return an array with 4 entries', () => {
    
    expect(scannerMatch.getExpressions())
      .toHaveLength(4);
    
  });
  
  test('getExpressions() array index 0 should be an Expression', () => {
    
    expect(scannerMatch.getExpressions()[0])
      .toBeInstanceOf(Expression);
    
  });
  
});
