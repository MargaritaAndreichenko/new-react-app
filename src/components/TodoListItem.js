import React, { useState, useEffect, useRef } from 'react';
import style from '../css/AllComponents.module.css';
import size from '../css/AddTodoFrom.module.css';
import { ReactComponent as RemoveButton } from "../images/remove-circle-svgrepo-com.svg";
import { ReactComponent as EditButton } from "../images/edit-button-svgrepo-com.svg";
import PropTypes from 'prop-types';

const TodoListItem = ({ item, onRemoveTodo, onUpdateNewTitle, }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(item.title);

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
    const inputRef = useRef();
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    });

    return (
        <div className={style.Link}>
            {isEditing ? (
                <>
                    <input type="text" ref={inputRef} value={newTitle} onChange={handleTitleChange} />
                    <button onClick={handleSaveClick}>Save</button>
                </>
            ) : (
                <>
        
                    &nbsp;
                    <button onClick={() => onRemoveTodo(item.id)}>
                        <RemoveButton alt="remove..." className={size.img} />
                    </button>
                    <button onClick={handleEditClick}>
                        <EditButton alt="edit..." />
                    </button>

                </>
            )}
            
        </div>
    );
};

TodoListItem.propTypes = {
    item: PropTypes.object,
    onRemoveTodo: PropTypes.func,
    onUpdateNewTitle: PropTypes.func
}

export default TodoListItem;