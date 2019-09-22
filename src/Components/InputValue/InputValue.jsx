import React from 'react';
import css from './InputValue.module.css';

const InputValue = props => {
    let errorColor = props.errorColor === true ? `${css.backgroundError}` : ``;
    return (
        <>
            <input type={`number`} value={props.value} className={`${css.inputValue} ${errorColor}`}
                   onChange={event => props.onChangeInput(+event.currentTarget.value)}/>
        </>
    );
};

export default InputValue;