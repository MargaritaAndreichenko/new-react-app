import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';

const AddTodoForm = ({ onAddTodo }) => {

    const [todoTitle, setTodoTitle] = useState('');

    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        onAddTodo({
            title: todoTitle,
            id:Date.now()
        });
        setTodoTitle('');
    };
    return (
        <div>
            <form onSubmit={handleAddTodo}>
                <InputWithLabel
                    id="todoTitle"
                    value={todoTitle}
                    onChange={handleTitleChange}
                    isFocused
                >
                    <strong>Title</strong>
                </InputWithLabel>
                <button type="submit" >Add new todo</button>
            </form>
        </div>
    );
};

export default AddTodoForm;