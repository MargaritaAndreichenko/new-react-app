import React, { useEffect, useRef } from 'react';
import style from './App.module.css';

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

export default InputWithLabel;