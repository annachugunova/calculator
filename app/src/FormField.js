import React from 'react';

export const FormField = (props) => {
	return (
		<div class="form-block">
      <p>{props.title}</p>

      <div class="form-block-input">
        <input 
          type="text" 
          name={props.name} 
          value={props.value} 
          onChange={props.onChange}
        />
        <button class="btn-minus" name={props.name} value="less" 
          onClick={props.onClick}>–</button>
        <button class="btn-plus" name={props.name} value="more"
          onClick={props.onClick}>+</button>
      </div>
    </div>
	)
}