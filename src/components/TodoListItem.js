import React, { useState, useEffect, useRef } from 'react';
import style from '../css/AllComponents.module.css';
import size from '../css/AddTodoFrom.module.css';
import { ReactComponent as RemoveButton } from "../images/remove-circle-svgrepo-com.svg";
import { ReactComponent as EditButton } from "../images/edit-button-svgrepo-com.svg";
import PropTypes from 'prop-types';
import  './rows.css'

const TodoListItem = ({item, onRemoveTodo, onUpdateNewTitle, }) => {
    
    //const [checked, setChecked] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(item.title);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
 
    
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
    const inputRef = useRef();
    useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 600; 

    return (
        
        <div class="container" style ={{width: isMobile ? '100%' : '80%'}}>
            <div className={style.Link}>
            <ul class="responsive-table">
            <li class="table-row">
                {isEditing ? (
                  <>
                        <input type="text" ref={inputRef} value={newTitle} onChange={handleTitleChange} />
                        <button onClick={handleSaveClick}>Save</button>
                        </>
                ) : (
                    <>
                    <label>
                    <div class="col col-1">
                          <input
                              type="checkbox"
                              checked={item.checked} // Ensure you have access to item and its properties
                              onChange={handleChange} // Make sure handleChange is defined in your component
                          />
                          {item.title} 
                          </div>
                      </label>
                        &nbsp;
                        <div class="col col-2">
                        <button onClick={() => onRemoveTodo(item.id)}>
                            <RemoveButton alt="remove..." className={size.img} />
                        </button>
                        <>  </>
                      
                        <button onClick={handleEditClick}>
                            <EditButton alt="edit..." />
                        </button>
                        </div>
                        
                    </>
                )}
                </li>
                </ul>
            </div>
            </div>
    );
};



TodoListItem.propTypes = {
    item: PropTypes.object,
    onRemoveTodo: PropTypes.func, 
    onUpdateNewTitle: PropTypes.func
  }

export default TodoListItem;