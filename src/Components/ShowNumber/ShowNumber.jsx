import React from 'react'
import css from './ShowNumber.module.css';

const ShowNumber = props => {
    let styleNumber = props.limit.errorEnd === true ? `${css.colorNumberEnd}` : `${css.colorNumberOk}`;
    return (
        <div className={`${styleNumber}`}>
            {props.message}
        </div>
    );
};

export default ShowNumber;