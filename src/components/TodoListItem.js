
import React, { useState } from 'react';
import style from '../css/App.module.css';
import size from '../css/AddTodoFrom.module.css';
import { ReactComponent as RemoveButton } from "../images/remove-circle-svgrepo-com.svg";
import { ReactComponent as EditButton } from "../images/edit-button-svgrepo-com.svg";
import PropTypes from 'prop-types';

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

TodoListItem.propTypes = {
    item: PropTypes.object,
    onRemoveTodo: PropTypes.func, 
    onUpdateNewTitle: PropTypes.func
  }

export default TodoListItem;




