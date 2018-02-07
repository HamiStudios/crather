# crather
crather is a simple express render engine

### Requirements
- Express

### Installation
```
$ npm install --save crather
```

### Setup
```javascript
const express = require("express");
const crather = require("crather");

let app = express();

app.engine("crather", crather);

app.set("views", "./views");
app.set("view engine", "crather");
```

### Usage
index.js
```javascript
app.get("/", function(req, res) {
	res.render("home", {
		title: "Home Page",
		message: "Thank you for downloading crather!"
	});
});
```

views/home.crather
```html
<title>{{ title }}</title>

{{>messages.welcome}}
```

views/messages/welcome.crather
```html
<p>{{ message }}</p>
```

<br/>

Output:
```html
<title>Home Page</title>

<p>Thank you for downloading crather!</p>
```