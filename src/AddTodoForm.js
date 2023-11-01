import React, { useState } from 'react';


const AddTodoForm = ({onAddTodo}) => {

    const [todoTitle, setTodoTitle] = useState('');
    
    const handleTitleChange = (event) =>{
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();       
        onAddTodo({
            title: todoTitle,
            id: Date.now()
        });
        setTodoTitle('');
        
    };   
    return(
        <div>
            <form onSubmit={handleAddTodo}>
                <label htmlFor="todoTitle">Title </label>
                <input type = "text" id = "todoTitle" name = "title" value={todoTitle} onChange={handleTitleChange}/>
                <input type="submit" ></input>
            </form>
            
        </div>
    );
 };
    
    
export default AddTodoForm;