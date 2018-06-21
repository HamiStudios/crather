# Templates

Templates can be used to help reduce repetitive code. Templates are like normal `.crather` files you can have [standard](/guides/standard-expressions.md) expressions, other [templates](/guides/templates.md) and [scripts](/guides/scripts.md) them.

### Defining a template

Template expressions are defined with the template opening and closing tags (default opening: `{{>` default closing: `}}`)
these tags can be changed in the [Crather](/reference/Crather.md?id=options) options.

Example:
```text
{{> footer }}
```

The value in the middle is the path/filename you want to output, in this case `footer` is the filename. When parsed crather
will search for a file named `footer.crather` inside the templates path which is specified in the [Crather](/reference/Crather.md?id=options)
options.

### Navigating directories

You can use `.` to navigate directories to help organize your templates.
```text
{{> navbar.loggedin }}
```

### Example

Here is an example with a [Crather](/reference/Crather.md) instance.

```crather
<!-- views/templates/header.crather -->>

<title>{{ page.head.title }}</title>
```

```crather
<!-- views/templates/footer.crather -->>

<p>&copy; {{ page.footer.year }} Some Company</p>
```

```crather
<!-- views/example.crather -->>

<head>
  {{> header }}
</head>

<footer>
  {{> footer }}
</footer>
```

```javascript
// index.js

const Crather = require('@hamistudios/crather');

let crather = new Crather({
  data: {
    page: {
      head: {
        title: 'Cool page title',
      },
      footer: {
        year: new Date().getFullYear()
      }
    }
  },
  templates: './views/templates'
});

crather.parse('./views/example.crather', function(err, result) {
  
  if(err) console.error(err);
  else console.log(result.getRendered());
  
});
```

The following should output:
```html
<head>
  <title>Some cool page title</title>
</head>

<footer>
  <p>&copy; 2018 Some Company</p>
</footer>
```
