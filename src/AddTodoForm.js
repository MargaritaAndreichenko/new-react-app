import React from 'react';



function AddTodoForm(props){
    const handleAddTodo = (event) => {
        event.preventDefault();
        const todoTitle = event.target.title.value;
        event.target.reset();

        props.onAddTodo(todoTitle);
        
    }; 
        
    return(
        <div>
            <form onSubmit={handleAddTodo}>
                <label htmlFor="todoTitle">Title </label>
                <input type = "text" id = "todoTitle" name = "title"/>
                <input type="submit" value="Add"></input>
            </form>
            
        </div>
    );
 };
    
    
export default AddTodoForm;