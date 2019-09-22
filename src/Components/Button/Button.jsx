import React from 'react';
import css from './Button.module.css';

const Button = props => {
    // let state = {
    //     mouseDown: false,
    // };
    // let onMouseDown=(event)=>{
    //     if (event.onmousedown){
    //         state.mouseDown = true;
    //     }
    //     else{
    //         state.mouseDown = false;
    //     }
    // };

    let disabledButtonCSS = props.access === false ? `${css.disabledButton}` : ``;
    let disabledButton = props.access === false ? `disabled` : ``;
    // let mouseDown = state.mouseDown === false ? `` : `${css.mousDown}`;

    return (
        <>
            <button className={`${css.buttons} ${disabledButtonCSS}`}
                    onClick={() => props.onClickButton()} disabled={disabledButton}>
                {props.buttonsTitle}
            </button>
        </>
    );
};

export default Button;