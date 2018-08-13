
<p align="center">
  <img src="logo.png">
</p>

<h1 align="center">crather</h1>
<p align="center">a simple <a href="https://nodejs.org">nodejs</a> render engine</p>

<p align="center">
  <a href="https://travis-ci.org/HamiStudios/crather"><img src="https://travis-ci.org/HamiStudios/crather.svg?branch=master"></a>
  <a href="https://coveralls.io/github/HamiStudios/crather?branch=master"><img src="https://coveralls.io/repos/github/HamiStudios/crather/badge.svg?branch=master"></a>
  <a href="https://www.npmjs.com/package/@hamistudios/crather"><img src="https://img.shields.io/npm/v/@hamistudios/crather.svg"></a>
  <a href="https://github.com/hamistudios/crather/blob/master/LICENSE.md"><img src="https://img.shields.io/github/license/hamistudios/crather.svg"></a>
</p>

### Features:

- Can be used to seamlessly with [`express`](https://github.com/expressjs/express) to render views
- Supports templates and scripts to create dynamic content
- Can be used as a standalone render engine which is great for HTML emails
- Can be used to process any file type HTML, CSS, Text you name it

---

## Installation
```
$ npm install --save @hamistudios/crather
```

## Quick start

```crather
<!-- example.crather -->

<h1>{{ message }}</h1>
```

```javascript
// index.js

const Crather = require('@hamistudios/crather');  
  
let crather = new Crather({  
  data: {
    message: 'Hello World'
  }
});

crather.parse('./example.crather', function(err, result) {  
   if(err) console.error(err);  
   else console.log(result.getRendered());  
});
```

Output:
```html
<h1>Hello World</h1>
```

For more help and information head over to our [website](https://crather.hamistudios.com).

## Documentation
You can view all documentation on the [crather website](https://crather.hamistudios.org).

* Getting started  
  * [Quick start](https://crather.hamistudios.org/#/getting-started/quick-start.md)  
  * [Using express](https://crather.hamistudios.org/#/getting-started/express.md)  
  
* Guides  
  * [Standard Expressions](https://crather.hamistudios.org/#/guides/standard-expressions.md)  
  * [Templates](https://crather.hamistudios.org/#/guides/templates.md)  
  * [Scripts](https://crather.hamistudios.org/#/guides/scripts.md)  
  
* Reference  
  * [Crather](https://crather.hamistudios.org/#/reference/Crather.md)  
  * [Result](https://crather.hamistudios.org/#/reference/Result.md)  
  * [Crather.script](https://crather.hamistudios.org/#/reference/Crather.script.md)  
  * [Expression](https://crather.hamistudios.org/#/reference/Expression.md)
    
* [Changelog](https://crather.hamistudios.org/#/CHANGELOG.md)
