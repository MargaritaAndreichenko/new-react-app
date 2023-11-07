import React from 'react';


const TodoListItem = ({item}) => 

    <li>

        <label>
        <input type="checkbox" label="todo_checkBox" name= "item.id"/>
                
        </label>
       
        <span> </span>
        <span>{item.title}</span>               
    </li>
    


export default TodoListItem;