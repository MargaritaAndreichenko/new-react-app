import React from 'react';
import TodoListItem from './TodoListItem';
import style from '../css/AllComponents.module.css';
import PropTypes from 'prop-types';


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

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func, 
  onToggleCompletion: PropTypes.func, 
  onUpdateNewTitle: PropTypes.func
}
export default TodoList;