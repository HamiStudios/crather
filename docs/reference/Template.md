# Template

The object used throughout crather to define Templates.

## Syntax

```javascript
new Template(entity: String, value: String)
```

## Methods

<dl>
	<dt>*Template.getEntity()*</dt>
	<dd>
		Returns the expression entity.
    </dd>
    
    <br/>
    
    <dt>*Template.getValue()*</dt>
    <dd>
        Returns the expression value.
    </dd>
    
    <br/>
    
    <dt>*Template.getResolved()*</dt>
    <dd>
        Returns the expression resolved value.
    </dd>
    
    <br/>
    
    <dt>*Template.setResolved()*</dt>
    <dd>
        Set the expression resolved value.
    </dd>
    
    <br/>
    
    <dt>*Template.equals(expression: Template)*</dt>
    <dd>
        Check if the specified Template matches this Template.
    </dd>
</dl>

## Example

```javascript
let template = new Template('{{> message }}', 'message');

template.setResolved('I am the content from a template file');

console.log(template.getResolved()) // => "I am the content from a template file"
```
