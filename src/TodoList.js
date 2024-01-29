import React from 'react';
import TodoListItem from './TodoListItem';
import style from './App.module.css';



const TodoList = React.memo(({ todoList, onRemoveTodo, onToggleCompletion, onUpdateNewTitle,}) => {
  return (
  
    <ul  className={style.Link} >
      {todoList.map(item =>
        <TodoListItem  key={item.id} item={item} onRemoveTodo={onRemoveTodo} onToggleCompletion={onToggleCompletion}
        onUpdateNewTitle={onUpdateNewTitle}/>
      )
      }
    </ul>
 
   
   
 );
});
export default TodoList;