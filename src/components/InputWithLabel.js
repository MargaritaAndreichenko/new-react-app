import React, { useEffect, useRef } from 'react';
import style from  '../css/AllComponents.module.css';
import PropTypes from 'prop-types';

const InputWithLabel = ({
    id,
    value,
    type = "text",
    onChange,
    children,
    isFocused,
    }) => {
    const inputRef = useRef();

    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused]);

    return (
        <>
           <label htmlFor={id} >{children} </label>
            &nbsp;
            <input ref={inputRef} id={id} type={type} value={value} onChange={onChange} className={style.Link} />
        </>
    );
};

InputWithLabel.propTypes = {
    id:PropTypes.string.isRequired,
    value:PropTypes.string.isRequired,
    type: PropTypes.string,
    onChange:PropTypes.func,
    children:PropTypes.element.isRequired,
    isFocused: PropTypes.bool,
}


export default InputWithLabel;