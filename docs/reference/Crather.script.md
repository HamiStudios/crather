# Crather.script

Crather.script is a function used to define script files for [Script](/guides/scripts.md) expressions.

## Syntax

```javascript
Crather.script(callback: Function)
```

## Callback context methods

<dl>
	<dt>*getData()*</dt>
	<dd>
		Returns the data object.
    </dd>
    
    <br/>
    
    <dt>*setData(value: Object)*</dt>
    <dd>
        Set the data to the value provided. The current data will be overridden with this value. This will also change the data in the current file scope.
    </dd>
    
    <br/>
    
    <dt>*setRender(value: String)*</dt>
    <dd>
        Sets what the script will render as in the file. Setting value as `null` will render nothing.
    </dd>
    
    <br/>
    
    <dt>*finished()*</dt>
    <dd>
        Marks the script as finished and continues to parse the file.
    </dd>
</dl>

## Example

```javascript
const Crather = require('@hamistudios/crather');

module.exports = Crather.script(function() {
  
  if(this.getData().page === 'index') {
    
    this.setData({
      background: '#fff'
    });
    
  }
  
  this.setRender(null);
  
  this.finished();
  
});
```
