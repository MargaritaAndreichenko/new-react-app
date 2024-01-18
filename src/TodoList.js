import React from 'react';
import TodoListItem from './TodoListItem';
import style from './App.module.css';



const TodoList = ({ todoList, onRemoveTodo }) => {
  return (
    <ul  className={style.Link}>
      {todoList.map(item =>
        <TodoListItem key={item.id} item={item} onRemoveTodo={onRemoveTodo} />
      )
      }
    </ul>);
}
export default TodoList;