import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';
//import styles from './TodoListItem.module.css';
import style from './App.module.css'
import icon from './plus.gif';
import size from './AddTodoFrom.module.css'
//import styles from './TodoListItem.module.css';


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
            <form onSubmit={handleAddTodo} className={style.Link}>
                <InputWithLabel
                   
                    id="todoTitle"
                    value={todoTitle}
                    onChange={handleTitleChange}
                    isFocused
                >
                    <strong>Title</strong>
                </InputWithLabel>
                <button type="submit"  ><img src={icon} alt="plus..."  className={size.img}/></button>
            </form>
        </div>
    );
};

export default AddTodoForm;
