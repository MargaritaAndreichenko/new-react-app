
import React, { useState } from 'react';
import style from './TodoListItem.module.css';



const TodoListItem = ({item, onRemoveTodo }) => {

    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);

    };

    return (
        <li className={style.ListItem}>
        
            <Checkbox
                label={item.title}
                value={checked}
                onChange={handleChange}
            />
            &nbsp;
            <button onClick={() => onRemoveTodo(item.id) }>Remove</button>
        
        </li>
    );
};

const Checkbox = ({ label, value, onChange }) => {
    return (
        <label>
            <input type="checkbox" checked={value} onChange={onChange} />
            {label}
        </label>
    );
};

export default TodoListItem;