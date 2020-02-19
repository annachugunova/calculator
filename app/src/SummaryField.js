import React from 'react';

export const SummaryField = (props) => {
	return (
		<div class="summary-block">
      <p class="summary-block-label">{props.label}</p>
      {props.value && <p class="summary-block-value">{props.value} ₽</p>}
      
    </div>
	)
}