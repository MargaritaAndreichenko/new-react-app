import React, { useEffect, useRef } from 'react';
import style from  '../css/AllComponents.module.css';
import PropTypes from 'prop-types';

const InputWithLabel = ({
  
    todoTitle,
    onChange,
    children,

    }) => {
    const inputRef = useRef();

    useEffect(() => {
       
            inputRef.current.focus();
       
    }, []);

    return (
        <>
           <label htmlFor="todoTitle" >{children} </label>
            &nbsp;
            <input ref={inputRef} id="todoTitle" type="text" value={todoTitle} onChange={onChange} className={style.Link} />
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