jest.mock('fs');

const
  Resolver        = require('./../src/Resolver'),
  Expression      = require('./../src/definitions/Expression'),
  MOCK_FILES      = [
    {
      path: __dirname + '/mocks/view.crather',
      content: '{{ test }} {{> template }} {{; script }}',
      perms: {
        canSee: true,
        canRead: true,
        canWrite: true,
        canExec: true
      }
    },
    {
      path: __dirname + '/mocks/templates/template.crather',
      content: 'test template',
      perms: {
        canSee: true,
        canRead: true,
        canWrite: true,
        canExec: true
      }
    },
    {
      path: __dirname + '/mocks/scripts/script.js',
      content: '', // it doesn't need content because it will be require()ed
      perms: {
        canSee: true,
        canRead: true,
        canWrite: true,
        canExec: true
      }
    },
    {
      path: __dirname + '/mocks/scripts/scriptNull.js',
      content: '', // it doesn't need content because it will be require()ed
      perms: {
        canSee: true,
        canRead: true,
        canWrite: true,
        canExec: true
      }
    },
    {
      path: __dirname + '/mocks/scripts/scriptUndefined.js',
      content: '', // it doesn't need content because it will be require()ed
      perms: {
        canSee: true,
        canRead: true,
        canWrite: true,
        canExec: true
      }
    },
    {
      path: __dirname + '/mocks/scripts/notScript.js',
      content: '', // it doesn't need content because it will be require()ed
      perms: {
        canSee: true,
        canRead: true,
        canWrite: true,
        canExec: true
      }
    }
  ]
;

let
  resolver  = undefined
;

beforeEach(() => {

  require('fs').__setMockFiles(MOCK_FILES);
  
  resolver = new Resolver(
    {
      test: 'test text'
    },
    __dirname + '/mocks/templates',
    __dirname + '/mocks/scripts'
  );
  
});

describe('private methods', () => {
  
  test('_resolveExpression() should error if the type cannot be resolved', (done) => {
    
    resolver._resolveExpression(
      new Expression('[ UNKNOWN ]', 'UNKNOWN', 'UNKNOWN'),
      function (err) {
        
        expect(err)
          .toBeTruthy();
        
        done();
        
      }
    );
    
  });
  
  test('_resolveExpression() should resolve `{{ test }}` to `test text`', (done) => {

    resolver._resolveExpression(
      new Expression('{{ test }}', 'test', 'STANDARD'),
      function (err, result) {
      
        expect(result)
          .toBe('test text');
        
        done();
        
      }
    );
    
  });
  
  test('_resolveExpression() should resolve `{{> template }}` to `test template`', (done) => {
    
    resolver._resolveExpression(
      new Expression('{{> template }}', 'template', 'TEMPLATE'),
      function (err, result) {
        
        expect(result)
          .toBe('test template');
        
        done();
        
      }
    );
    
  });
  
  test('_resolveExpression() should return an error if the template does not exist', (done) => {
    
    resolver._resolveExpression(
      new Expression('{{> iDontExist }}', 'iDontExist', 'TEMPLATE'),
      function (err) {
        
        expect(err)
          .toBeTruthy();
        
        done();
        
      }
    );
    
  });
  
  test('_resolveExpression() should return an error if the template exists but can\'t be accessed' , (done) => {
    
    resolver._checkFileExists = function (path, callback) {
      
      callback(true);
      
    };
    
    resolver._resolveExpression(
      new Expression('{{> iDontExist }}', 'iDontExist', 'TEMPLATE'),
      function (err) {
        
        expect(err)
          .toBeTruthy();
        
        done();
        
      }
    );
    
  });
  
  test('_resolveExpression() should resolve `{{; script }}` to `test script`', (done) => {
    
    resolver._resolveExpression(
      new Expression('{{; script }}', 'script', 'SCRIPT'),
      function (err, result) {
        
        expect(result)
          .toBe('test script');
        
        done();
        
      }
    );
    
  });
  
  test('_resolveExpression() should resolve `null` results to ``', (done) => {
    
    resolver._resolveExpression(
      new Expression('{{; scriptNull }}', 'scriptNull', 'SCRIPT'),
      function (err, result) {
        
        expect(result)
          .toBe('');
        
        done();
        
      }
    );
    
  });
  
  test('_resolveExpression() should resolve `undefined` results to ``', (done) => {
    
    resolver._resolveExpression(
      new Expression('{{; scriptUndefined }}', 'scriptUndefined', 'SCRIPT'),
      function (err, result) {
        
        expect(result)
          .toBe('');
        
        done();
        
      }
    );
    
  });
  
  test('_resolveExpression() should return error if the script is not an instance of ScriptFunction or a function', (done) => {
    
    resolver._resolveExpression(
      new Expression('{{; notScript }}', 'notScript', 'SCRIPT'),
      function (err) {
        
        expect(err)
          .toBeTruthy();
        
        done();
        
      }
    );
    
  });
  
  test('_resolveExpression() should return error if the script does not exist', (done) => {
    
    resolver._resolveExpression(
      new Expression('{{; iDontExist }}', 'iDontExist', 'SCRIPT'),
      function (err) {
        
        expect(err)
          .toBeTruthy();
        
        done();
        
      }
    );
    
  });
  
});

describe('public methods', () => {
  
  test('resolve() should resolve a standard expression', (done) => {

    resolver.resolve(
      new Expression('{{ test }}', 'test', 'STANDARD'),
      function (err, result) {

        expect(result)
          .toBe('test text');

        done();

      }
    );

  });

  test('resolve() should resolve a template expression', (done) => {

    resolver.resolve(
      new Expression('{{> template }}', 'template', 'TEMPLATE'),
      function (err, result) {

        expect(result)
          .toBe('test template');

        done();

      }
    );

  });
  
  test('resolve() should resolve a script expression', (done) => {
    
    resolver.resolve(
      new Expression('{{; script }}', 'script', 'SCRIPT'),
      function (err, result) {
        
        expect(result)
          .toBe('test script');
        
        done();
        
      }
    );
    
  });
  
  test('resolve() should error if the expression is not an instance of Expression', (done) => {
    
    resolver.resolve(
      function () { },
      function (err) {
        
        expect(err)
          .toBeTruthy();
        
        done();
        
      }
    );
    
  });

});
