# Result

The object which is returned after parsing a file.

## Syntax

```javascript
new Result(rendered: String, expressions: Expression[])
```

## Methods

<dl>
	<dt>*Result.getRendered()*</dt>
	<dd>
		Returns parsed file result.
  </dd>
    
  <br/>
  
  <dt>*Result.getExpressions()*</dt>
  <dd>
      Returns an array of [Expressions](/reference/Expression.md) which where parsed in the file. 
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
