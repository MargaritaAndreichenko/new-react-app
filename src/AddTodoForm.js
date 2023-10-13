import React from 'react';


function AddTodoForm(){
    return(
        <div>
            <form>
                <label htmlFor="todoTitle">Title</label>
                <input type = "text" id = "todoTitle"/>
                <input type="submit" value="Add"></input>
            </form>
            
        </div>
    );
 };
    
    
export default AddTodoForm;
