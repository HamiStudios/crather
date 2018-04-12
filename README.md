![crather logo](https://www.hamistudios.com/assets/img/crather_icon_transparent.png)

# crather
crather is a simple render engine

### Features:

- Can be used to render [`express`](https://github.com/expressjs/express) views
- Supports templates and scripts to create content which has access to the view data
- Can be used as a standalone processor to create rendered contnet, great for HTML emails
- Coming in at 5KB it's pretty lightweight

---

## Installation
```
$ npm install --save crather
```

---

## Setup
```javascript
const express = require("express");
const crather = require("crather");

let app = express();

app.engine("crather", crather);

app.set("views", "./views");
app.set("scripts", "./scripts");
app.set("view engine", "crather");
```

---

## Usage
index.js
```javascript
app.get("/", function(req, res) {
    res.render("home", {
        title: "Home Page",
        message: "Thank you for downloading crather"
    });
});
```

views/home.crather
```html
<title>{{ title }}</title>

{{>messages.welcome}}

{{;change_message}}
```

views/messages/welcome.crather
```html
<p>{{ message }}</p>
```

scripts/change_message.js
```javascript
module.exports = function(data, callback) {
    data.message += "!";
	
    callback("<p>Added '!' to the end of the message.</p>");
};
```

Output:
```html
<title>Home Page</title>

<p>Thank you for downloading crather!</p>

<p>Added '!' to the end of the message.</p>
```

---

## Using as a function
You can use crather as a function to process crather files

index.js
```javascript
const crather = require("crather");

const file = "home.crather";
const options = {
    title: "Home Page",
    message: "Crather is awesome!"
};
const defaultOptions = {
    settings: {
        views: __dirname + "/views/",
        scripts: __dirname + "/scripts/"
    }
};

crather(file, options, defaultOptions, function(err, rendered) {
    if(err) {
        console.error(err);
    } else {
        console.log("Processed HTML:\n\n", rendered);
    }
});
```

views/home.crather
```html
<title>{{title}}</title>

<p>{{message}}</p>
```

Output:

```bash
$ node index.js
$ Processed HTML:

<title>Home Page</title>

<p>Crather is awesome!</p>
```

You can also set default values by using `global`

```javascript
global.crather.defaults = {
    settings: {
        views: __dirname + "/views/",
        scripts: __dirname + "/scripts/"
    }
};
```
