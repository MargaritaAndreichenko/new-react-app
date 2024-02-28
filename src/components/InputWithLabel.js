import React, { useEffect, useRef } from 'react';
import style from '../css/AllComponents.module.css';
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
            <label htmlFor="todoTitle" 
          >{children} </label>
            <input ref={inputRef} 
                   id="todoTitle" type="text" 
                   value={todoTitle} 
                   onChange={onChange} 
                   className={style.Link} 
                   placeholder = "add new task here" />
        </>
    );
};

InputWithLabel.propTypes = {
    todoTitle: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    children: PropTypes.element.isRequired,
}
export default InputWithLabel;