const
  nodePath  = require('path'),
  fs        = jest.genMockFromModule('fs')
;

let
  mock_files = Object.create(null)
;

function __setMockFiles(new_files) {

  mock_files = Object.create(null);
  
  for(let i = 0; i < new_files.length; i++) {

    let
      file  = new_files[i],
      dir   = nodePath.dirname(file.path)
    ;

    if(dir.indexOf(nodePath.dirname(__dirname)) > -1) {

      dir = nodePath.normalize(dir.replace(nodePath.dirname(__dirname), './'));

    }

    if(!mock_files[dir]) {
      mock_files[dir] = {};
    }
    
    mock_files[dir][nodePath.basename(file.path)] = {
      content: file.content,
      perms: {
        canSee: file.perms.canSee,
        canRead: file.perms.canRead,
        canWrite: file.perms.canWrite,
        canExec: file.perms.canExec
      }
    };
    
  }

  return mock_files;

}

function access(path, mode, callback) {

  if(path.indexOf(nodePath.dirname(__dirname)) > -1) {

    path = nodePath.normalize(path.replace(nodePath.dirname(__dirname), './'));

  }

  let
    file  = mock_files[nodePath.dirname(path)]
  ;

  if(file !== undefined) {
    
    file = file[[nodePath.basename(path)]];
    
    if(file !== undefined) {
  
      if(mode === 0) { // F_OK (0)
    
        if(file.perms.canSee) {
      
          callback();
      
        } else {
      
          callback(new Error(`File '${path}' does not exist`));
      
        }
    
      } else if(mode === 4) { // R_OK (4)
    
        if(file.perms.canRead) {
      
          callback();
      
        } else {
      
          callback(new Error('File cannot be read'));
      
        }
    
      } else if(mode === 2) { // W_OK (2)
    
        if(file.perms.canWrite) {
      
          callback();
      
        } else {
      
          callback(new Error('File cannot be written to'));
      
        }
    
      } else if(mode === 1) { // X_OK (1)
    
        if(file.perms.canExec) {
      
          callback();
      
        } else {
      
          callback(new Error('File cannot be executed'));
      
        }
    
      }
  
    } else {
  
      callback(new Error(`File '${path}' does not exist`));
  
    }
  
  } else {
  
    callback(new Error(`File '${path}' does not exist`));
  
  }
  
}

function readFile(path, options, callback) {

  if(path.indexOf(nodePath.dirname(__dirname)) > -1) {

    path = nodePath.normalize(path.replace(nodePath.dirname(__dirname), './'));

  }

  let
    file  = mock_files[nodePath.dirname(path)]
  ;
  
  if(file !== undefined) {
    
    file = file[[nodePath.basename(path)]];
  
    if(file !== undefined) {
  
      callback(null, file.content);
    
    } else {
  
      callback(new Error(`File '${path}' does not exist`));
    
    }
  
  } else {
  
    callback(new Error(`File '${path}' does not exist`));
    
  }

}


fs.__setMockFiles = __setMockFiles;
fs.access = access;
fs.readFile = readFile;
fs.constants = {
  F_OK: 0,
  R_OK: 4,
  W_OK: 2,
  X_OK: 1
};


module.exports = fs;
