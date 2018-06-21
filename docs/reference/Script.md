# Script

The object used throughout crather to define Scripts.

## Syntax

```javascript
new Script(entity: String, value: String)
```

## Methods

<dl>
	<dt>*Script.getEntity()*</dt>
	<dd>
		Returns the expression entity.
    </dd>
    
    <br/>
    
    <dt>*Script.getValue()*</dt>
    <dd>
        Returns the expression value.
    </dd>
    
    <br/>
    
    <dt>*Script.getResolved()*</dt>
    <dd>
        Returns the expression resolved value.
    </dd>
    
    <br/>
    
    <dt>*Script.setResolved()*</dt>
    <dd>
        Set the expression resolved value.
    </dd>
    
    <br/>
    
    <dt>*Script.equals(expression: Script)*</dt>
    <dd>
        Check if the specified Script matches this Script.
    </dd>
</dl>

## Example

```javascript
let script = new Script('{{; testScript }}', 'testScript');

script.setResolved('The script return value');

console.log(script.getResolved()) // => "The script return value"
```
