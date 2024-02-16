import React,{useState, useEffect} from 'react';
import TodoListItem from './TodoListItem';
import style from '../css/AllComponents.module.css';
import PropTypes from 'prop-types';
//import styles from '../css/TodoListItem.module.css';


const TodoList = React.memo(({ todoList, onRemoveTodo, onToggleCompletion, onUpdateNewTitle,}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 600;
  return (
  
    <div className={style.Link}>
    <div   style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', width: '100%' }}>
    <table style={{
        width: isMobile ? '100%' : '50%', // Adjust table width for mobile
        tableLayout: 'fixed'
      }}>
    <thead>
      <tr>
        <th style={{ width: '30%' }}> </th>
        <th style={{ width: '30%' }}> </th>
      </tr>
    </thead>
    <tbody>
      {todoList.map(item => (
        <tr key={item.id}>
          <td>{item.title}</td>
          <td>
            <TodoListItem item={item} onRemoveTodo={onRemoveTodo} onToggleCompletion={onToggleCompletion} onUpdateNewTitle={onUpdateNewTitle} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  </div>
   
 );
});

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func, 
  onToggleCompletion: PropTypes.func, 
  onUpdateNewTitle: PropTypes.func
}
export default TodoList;