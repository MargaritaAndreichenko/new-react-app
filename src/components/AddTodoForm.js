import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel.js';
import style from '../css/App.module.css'
import icon from '../images/plus.gif';
import size from '../css/AddTodoFrom.module.css'
import PropTypes from 'prop-types';



const AddTodoForm = ({ onAddTodo }) => {
       

    const [todoTitle, setTodoTitle] = useState('');

    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };


    const handleAddTodo = (event) => {
        event.preventDefault();
        onAddTodo(todoTitle);
        setTodoTitle('');
    };
    return (
        <div>
            <form onSubmit={handleAddTodo} className={style.Link} >
                <InputWithLabel 
                   
                    id="todoTitle"
                    value={todoTitle}
                    onChange={handleTitleChange}
                    isFocused
                >
                    <strong>Title</strong>
                </InputWithLabel>
                <button type="submit"> <img src={icon} alt="plus..." className={size.img} /></button>
            </form>
        </div>
    );
};


AddTodoForm.propTypes = {
    
        onAddTodo: PropTypes.func
}

export default AddTodoForm;
