import React, { useState } from 'react';


const TodoListItem = (props) => 

    <li>

        <label>
        <input type="checkbox" />
                
        </label>
        <span>{props.item.id}</span>
        <span> </span>
        <span>{props.item.title}</span>               
    </li>
    


export default TodoListItem;