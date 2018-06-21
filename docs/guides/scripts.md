# Scripts

Scripts can be used to process data and have an output or to change the data object.

### Defining a script

Script expressions are defined with the script opening and closing tags (default opening: `{{;` default closing: `}}`)
these tags can be changed in the [Crather](/reference/Crather.md?id=options) options.

Example:
```text
{{; isLoggedIn }}
```

The value in the middle is the path/filename of the script you want to run, in this case `isLoggedIn` is the filename. When parsed crather
will search for a file named `isLoggedIn.js` inside the scripts path which is specified in the [Crather](/reference/Crather.md?id=options)
options.

### Navigating directories

You can use `.` to navigate directories to help organize your scripts.
```text
{{> actions.canEditPost }}
```

### Writing scripts

Creating script files is very easy with crather The [Crather](/reference/Crather.md) instance has a function
attached which allows you to create scripts with ease, here is an example.

```javascript
// scripts/firstScript.js

const Crather = require('@hamistudios/crather');

module.exports = Crather.script(function() {
  
  // your script goes here
  
  this.setRender('I ran my first script');
  
  this.finished();
  
});
```

The above script will output a value of `I ran my first script` in the place of the expression in the `.crather` file.

```crather
{{; firstScript }}
```

Would resolve to

```html
I ran my first script
```

The script callback has some powerful methods attached to its context, you can see all the methods attached [here](/reference/Crather.script.md).

You MUST always call `this.finished()` to mark your script as done or your view will hang until the server timeout.

### Modifying the data object

Scripts can be used to modify the data object for the context of the current file. You can do this via the `setData()`
function attached to the [Crather.script](/reference/Crather.script.md?id=callback-context-methods) callback context.

```javascript
// scripts/changeMessage.js

const Crather = require('@hamistudios/crather');

module.exports = Crather.script(function() {
  
  this.setData({
    message: 'Message changed'
  });
  
  this.setRender(null); // don't render anything
  
  this.finished();
  
});
```

```crather
<!-- views/example.crather -->

{{ message }}

{{; changeMessage }}

{{ message }}
```

```javascript
let data = {
  message: 'Some message'
};
```

With the above data the view would resolve to the following

```html
Some message

Message change
```

### Example

Here is an example with a [Crather](/reference/Crather.md) instance.

```javascript
// scripts/isLoggedIn.js

const Crather = require('@hamistudios/crather');

module.exports = Crather.script(function() {
  
  if(userIsLoggedIn()) {

    this.setRender('User "' + this.getData()['username'] + '" is logged in.');
    
  } else {
    
    this.setRender('User is not logged in');
    
  }
  
  this.finished();
  
});
```

```crather
<!-- views/example.crather -->>

{{; isLoggedIn }}
```

```javascript
// index.js

const Crather = require('@hamistudios/crather');

let crather = new Crather({
  data: {
    username: 'hammy2899'
  },
  scripts: './scripts'
});

crather.parse('./views/example.crather', function(err, result) {
  
  if(err) console.error(err);
  else console.log(result.getRendered());
  
});
```

The following should output:
```html
User "hammy2899" is logged in.
```
