# Crather

Crather is the main module and is used to parse expressions in `.crather` files.

## Syntax

```javascript
new Crather(options: Object)
```

## Options

| Key                    | Description                                                                 | Default       | Required | Type   |
|------------------------|-----------------------------------------------------------------------------|---------------|----------|--------|
| data                   | Data object for [Standard Expressions](/guides/standard-expressions.md)     | {}            | Yes      | Object |
| templates              | Path to template files                                                      | './templates' | Yes      | String |
| scripts                | Path to script files                                                        | './scripts'   | Yes      | String |
| tags.standard.open     | The opening tag for [Standard Expressions](/guides/standard-expressions.md) | '{{\s*'       | No       | String |
| tags.standard.close    | The closing tag for [Standard](guides/standard-expressions.md)              | '\s*}}'       | No       | String |
| tags.templates.open    | The opening tag for [Templates](/guides/Templates.md)                       | '{{>\s*'      | No       | String |
| tags.templates.close   | The closing tag for [Templates](/guides/Templates.md)                       | '{{&gt;\s*'   | No       | String |
| tags.scripts.open      | The opening tag for [Scripts](/guides/Scripts.md)                           | '{{>\s*'      | No       | String |
| tags.scripts.close     | The closing tag for [Scripts](/guides/Scripts.md)                           | '{{&gt;\s*'   | No       | String |

## Properties

<dl>
	<dt>*Crather.globals*</dt>
	<dd>
		Specifies a global data object. The data option will override the global data when a new `Crather` instance is created.
        The global object can be used to set values which may not be passed with the data object, this can be useful when rendering
        pages with [express](https://github.com/expressjs/express) e.g. background color.
    </dd>
</dl>

## Methods

<dl>
	<dt>*Crather.setOptions(options: Object)*</dt>
	<dd>
		Change the options of a `Crather` instance.
    </dd>
    
    <br/>
    
    <dt>*Crather.parse(filepath: String, callback: Function(err: [Error](https://nodejs.org/api/errors.html#errors_class_error), result: [Result](/reference/Result.md)))*</dt>
    <dd>
        Parse the specified file using the options specified. 
    </dd>
</dl>

## Example

```javascript
let crather = new Crather({
  data: {
    message: 'Hello World'
  },
  templates: './views/templates/',
  scripts: './views/scripts'
});
```
