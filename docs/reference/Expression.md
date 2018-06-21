# Expression

The object used throughout crather to define Expressions.

## Syntax

```javascript
new Expression(entity: String, value: String, type: String)
```

## Methods

<dl>
	<dt>*Expression.getEntity()*</dt>
	<dd>
		Returns the expression entity.
    </dd>
    
    <br/>
    
    <dt>*Expression.getValue()*</dt>
    <dd>
        Returns the expression value.
    </dd>
    
    <br/>
    
    <dt>*Expression.getType()*</dt>
    <dd>
        Returns the expression type. (can be 'STANDARD', 'TEMPLATE', 'SCRIPT' and 'UNKNOWN')
    </dd>
    
    <br/>
    
    <dt>*Expression.getResolved()*</dt>
    <dd>
        Returns the expression resolved value.
    </dd>
    
    <br/>
    
    <dt>*Expression.setResolved()*</dt>
    <dd>
        Set the expression resolved value.
    </dd>
    
    <br/>
    
    <dt>*Expression.equals(expression: Expression)*</dt>
    <dd>
        Check if the specified Expression matches this Expression.
    </dd>
</dl>

## Example

```javascript
let expression = new Expression('{{ text }}', 'text', 'STANDARD');

expression.setResolved('Hello World');

console.log(expression.getResolved()) // => "Hello World"
```
