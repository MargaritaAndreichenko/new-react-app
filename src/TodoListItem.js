import React from 'react';


const TodoListItem = ({item, onRemoveTodo }) => {

    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked(!checked);

    };

    return (
        <div>
            <Checkbox
                label={item.title}
                value={checked}
                onChange={handleChange}
            />
            &nbsp;
            <button onClick={() => onRemoveTodo(item.id)}>Remove</button>
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