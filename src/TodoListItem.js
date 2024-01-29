
import React, { useState } from 'react';
//import styles from './TodoListItem.module.css';
import style from './App.module.css';
//import pic from './trash.png';
import size from './AddTodoFrom.module.css';

import { ReactComponent as RemoveButton } from "./remove-circle-svgrepo-com.svg";
import { ReactComponent as EditButton } from "./edit-button-svgrepo-com.svg";

 const TodoListItem = ({item, onRemoveTodo, onUpdateNewTitle, }) => {
    //onToggleCompletion
    //const [checked, setChecked] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(item.title);

    const handleChange = () => {
        console.log(item.checked)
        item.checked = !item.checked;
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value);
    };

    const handleSaveClick = () => {
        onUpdateNewTitle(item.id, newTitle);
        setIsEditing(false);
    };

    return (
        <div>
            <ol className={style.Link}>
                
                {isEditing ? (
                    <>
                        <input type="text" value={newTitle} onChange={handleTitleChange} />
                        <button onClick={handleSaveClick}>Save</button>
                    </>
                ) : (
                    <>
                        <Checkbox 
                            label={item.title}
                            value={item.checked}
                            onChange={handleChange}
                        />
                        &nbsp;
                        
                        <button onClick={() => onRemoveTodo(item.id)}>
                            <RemoveButton alt="remove..." className={size.img} />
                        </button>
                        <button onClick={handleEditClick}>
                            <EditButton alt="edit..." />
                        </button>
                    </>
                )}
            </ol>
        </div>
    );
};

const Checkbox = ({ label, value, onChange }) => {
    return (
        <label >
            <input type="checkbox" checked={value} onChange={onChange} />
            {label}
        </label>
    );
};

export default TodoListItem;




