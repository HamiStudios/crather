# Standard Expressions

Standard expressions are the most basic of the three but can be the most helpful. Standard expressions are used to
output data from an object passed to Crather allowing you to dynamically change data on a page.

### Defining a standard expression

Standard expressions are defined with the standard opening and closing tags (default opening: `{{` default closing: `}}`)
these tags can be changed in the [Crather](/reference/Crather.md?id=options) options.

Example:
```text
{{ message }}
```

The value in the middle is the path to the data you want to output, in this case `message` is the path. When parsed using
the following data the expression would resolve to `Your first standard expression!`.

```javascript
let data = {
  message: 'Your first standard expression!'
};
```

### Navigating multi-level data objects

You can use `.` to navigate multi-level objects.
```text
{{ person.forename }} ({{ person.username }})
```

With the following data would output `Sean (hammy2899)`.

```javascript
let data = {
  person: {
    forename: 'Sean',
    username: 'hammy2899'
  }
};
```

### Example

Here is an example with a [Crather](/reference/Crather.md) instance.

```crather
<!-- views/example.crather -->>

<p>{{ message }}</p>

<p>Developed by {{ author.forename }} ({{ author.username }})</p>
```

```javascript
// index.js

const Crather = require('@hamistudios/crather');

let crather = new Crather({
  data: {
    message: 'Hello from crather!',
    author: {
      forename: 'Sean',
      username: 'hammy2899'
    }
  }
});

crather.parse('./views/example.crather', function(err, result) {
  
  if(err) console.error(err);
  else console.log(result.getRendered());
  
});
```

The following should output:
```html
<p>Hello from crather!</p>

<p>Developed by Sean (hammy2899)</p>
```
