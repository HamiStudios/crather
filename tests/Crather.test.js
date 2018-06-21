jest.mock('fs');

const
  path        = require('path'),
  Crather     = require('./../src/Crather'),
  Result      = require('./../src/Result'),
  Expression  = require('./../src/definitions/Expression'),
  MOCK_FILES  = [
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
  crather = undefined
;

beforeEach(function () {

  require('fs').__setMockFiles(MOCK_FILES);

  Crather.globals = {
    message: 'global message'
  };
  
  crather = new Crather({
    data                : {
      test: 'test text'
    },
    templates           : __dirname + '/mocks/templates',
    scripts             : __dirname + '/mocks/scripts'
  });
  
});

test('setOptions() should be accessible', () => {
  
  expect(typeof crather.setOptions)
    .toBe('function');
  
});

test('parse() should be accessible', () => {
  
  expect(typeof crather.parse)
    .toBe('function');
  
});

test('globals should be a "snapshot" of globals taking when the Crather instance was made', () => {
  
  expect(crather.globals)
    .toEqual({ message: 'global message' });
  
});

test('Setting globals after the Crather instance was made should not change the value', () => {
  
  Crather.globals = {
    message: 'changed global message'
  };
  
  expect(crather.globals)
    .toEqual({ message: 'global message' });
  
});

describe('private methods', () => {
  
  test('_getFileData() should return the file content', (done) => {
    
    crather._getFileData(__dirname + '/mocks/view.crather', function (err, content) {

      expect(content)
        .toBe('{{ test }} {{> template }} {{; script }}');

      done();

    });

  });

  test('_getFileData() should error when the file does not exist', (done) => {

    crather._getFileData(__dirname + '/mocks/notExist.crather', function (err) {

      expect(err)
        .toBeTruthy();

      done();

    });

  });

  test('_getFileData() should error when the file exists but can\'t be accessed', (done) => {

    crather._checkFileExists = function (path, callback) {

      callback(true);

    };

    crather._getFileData(__dirname + '/mocks/notExist.crather', function (err) {

      expect(err)
        .toBeTruthy();

      done();

    });

  });

});

describe('public methods', function () {

  test('setOptions() should change the options', () => {

    crather.setOptions({
      data: {
        test: 'changed text'
      }
    });

    expect(crather.options.data)
      .toEqual({ test: 'changed text' });

  });

  test('parse() should return a Result instance', (done) => {

    crather.parse(
      './tests/mocks/view.crather',
      function (err, result) {

        expect(result)
          .toBeInstanceOf(Result);

        done();

      }
    );

  });

  test('parse() result getRendered() should return the parsed content', (done) => {

    crather.parse(
      __dirname + '/mocks/view.crather',
      function (err, result) {

        expect(result.getRendered())
          .toBe('test text test template test script');

        done();

      }
    );

  });

  test('parse() should return an error if the file does not exist', (done) => {

    crather.parse(
      __dirname + '/mocks/notExist.crather',
      function (err) {
        
        expect(err)
          .toBeTruthy();
        
        done();
        
      }
    );
    
  });
  
});
