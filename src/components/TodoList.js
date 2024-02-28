import React,{useState} from 'react';
import TodoListItem from './TodoListItem';
import style from '../css/AllComponents.module.css';
import PropTypes from 'prop-types';


const TodoList = React.memo(({ todoList, onRemoveTodo, onToggleCompletion, onUpdateNewTitle,onReorderTodo,}) => {

    const [draggedTodoId, setDraggedTodoId] = useState(null);
  
    const handleDragStart = (event, id) => {
      setDraggedTodoId(id);
    };
  
    const handleDragOver = (event) => {
      event.preventDefault();
    };
  
    const handleDrop = (event, targetId) => {
      event.preventDefault();
  
      if (draggedTodoId === targetId) {
        return;
      }
  
      const updatedTodoList = [...todoList];
      const draggedIndex = updatedTodoList.findIndex(
        (todo) => todo.id === draggedTodoId
      );
      const targetIndex = updatedTodoList.findIndex(
        (todo) => todo.id === targetId
      );
  
      const draggedItem = updatedTodoList[draggedIndex];
      updatedTodoList.splice(draggedIndex, 1);
      updatedTodoList.splice(targetIndex, 0, draggedItem);
  
      onReorderTodo(updatedTodoList);
      setDraggedTodoId(null);
    };


  return (
  
    <ul  className={style.Link} >
      {todoList.map(item =>
      <ul
      key={item.id}
      draggable
      onDragStart={(event) => {
        handleDragStart(event, item.id);
        event.currentTarget.classList.add(style.dragging);
      }}
      onDragEnd={(event) => {
        event.currentTarget.classList.remove(style.dragging);
      }}
      onDragOver={(event) => handleDragOver(event)}
      onDrop={(event) => handleDrop(event, item.id)}
    >
        <TodoListItem  key={item.id} item={item} onRemoveTodo={onRemoveTodo} onToggleCompletion={onToggleCompletion}
        onUpdateNewTitle={onUpdateNewTitle}/>
        </ul>
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