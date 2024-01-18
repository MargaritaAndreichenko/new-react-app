
import React, { useState } from 'react';
//import styles from './TodoListItem.module.css';
import style from './App.module.css';
import pic from './trash.png';
import size from './AddTodoFrom.module.css';


const TodoListItem = ({item, onRemoveTodo }) => {

    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);

    };

    return (
        <div >
        <ol className={style.Link}>
        
            <Checkbox
                label={item.title}
                value={checked}
                onChange={handleChange}
            />
            &nbsp;
            <button onClick={() => onRemoveTodo(item.id) }  ><img src={pic} alt="remove..." className={size.img} /></button>
        
        </ol>
        </div>
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