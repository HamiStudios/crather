# Crather with Express

Crather is designed to work seamlessly with [express](https://github.com/expressjs/express), after setting a few values on your express app
you can start rendering pages in minutes.

### Create an express `app`

Create a new express app which we will use to set some options.
```javascript
// index.js

const Crather = require('@hamistudios/crather');
const express = require('express');
const app     = express();
```

### Setting the crather options

Now you have an express app you need to set a few options so crather knows where to find your views, templates and scripts.
```javascript
// index.js

app.set('views', './views/');
app.set('templates', './views/templates/');
app.set('scripts', './views/scripts/');
```

* `views` is the directory which your main express view `.crather` files are stored.
* `templates` is where your `.crather` templates are stored.
* `scripts` is where your crather scripts are stored.

Now you need to declare that `.crather` files should use Crather to render them.
```javascript
// index.js

app.engine('crather', Crather.express());
app.set('view engine', 'crather');
```

The `Crather.express()` function is a special function which returns an express friendly method to be used to render your views.

### Rendering your first view

Now crather and express are all paired up you can now start rendering.

Create a new `.crather` file inside your views directory.
```crather

<!-- /views/index.crather -->

<p>{{ message }}</p>
```

Now create a route and render it with a `message` in your view data.
```javascript
// index.js

app.get('/', (req, res) => {
  
  // since you set views as './views/' and to use crather
  // `index` should resolve to './views/index.crather'
  res.render('index', {
    message: 'Hello from crather using express!'
  });
  
});
```

Now all that's left is to boot up express and witness your code in action!
```javascript
// index.js

app.listen(3000, () => {
  
  console.log('Express (and crather) server started! https://localhost:3000');
  
});
```

```bash
node ./index.js
```

Now when you visit [localhost:3000](http://localhost:3000) you should see the following output
```text
Hello from crather using express!
```

<hr/>

<img style="display: block; margin: 0 auto;" src="https://media.giphy.com/media/glEsn20jvC7iE/giphy.gif" />

<h5>Congrats, you successfully setup crather with express. Now go explore and learn how to use [Templates](/guides/templates.md) and [Scripts](/guides/scripts.md) with crather!</h4>