# Quick start

## Installation

Install `crather` via [npm](https://www.npmjs.com)
```bash
npm install --save @hamistudios/crather
```

## Usage

### Create `.crather` files

`.crather` files can contain anything, from HTML to text you could even use crather with CSS :astonished:. Now you are
probably wondering what makes `.crather` files so different? Well you can include custom Expressions which crather will 
parse for you. Expressions can be standard input, templates or scripts.

Here is a basic file containing a [standard](/guides/standard-expressions.md) and [template](/guides/templates.md) Expression.
```crather
<!-- /views/example.crather -->

<!-- standard expression -->
<p>{{ message }}</p>

<!-- template expression -->
{{> watermark }}
```

```crather
<!-- /views/templates/watermark.crather -->

<!-- standard expression inside a template -->
<p>Parsed using <a href="{{ github.repo }}">crather</a>.</p>
```

### Create a new Crather instance

Create a new [`Crather`](/reference/Crather.md) instance to parse the file.
```javascript
// index.js

const Crather = require('@hamistudios/crather');

let crather = new Crather({
  data: {
    message: 'Hello from crather!',
    github: {
      repo: 'https://github.com/HamiStudios/crather'
    }
  },
  templates: './views/templates/',
  scripts: './views/templates/'
});
```

* `data` should be an object containing data which will be used for [Standard Expressions](/guides/standard-expressions.md).
* `templates` is the path to your `.crather` [Template](/guides/templates.md) files.
* `scripts` is the path to your [Script](/guides/scripts.md) files.

You can find out more about the options on the [`Crather`](/reference/Crather.md?id=options) reference page. 

### Parse your first file

Use the [`Crather`](/reference/Crather.md) instance you created above to parse the file you created.

```javascript
// index.js

crather.parse('./views/example.crather', function(err, result) {
  
  if(err) console.error(err);
  else console.log(result.getRendered());
  
});
```

Now try running the following command in the root of your project.
```bash
node ./index.js
```

You should get the following output
```html
<p>Hello from crather!</p>

<p>Parsed using <a href="https://github.com/HamiStudios/crather">crather</a>.</p>
```

<hr />

Want to use crather with express? Check out how [here](/getting-started/express.md).