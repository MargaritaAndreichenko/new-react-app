import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';



const App = () =>  {
  
  const todoList = [
    {id: 1, title: 'Wake up'},
    {id: 2, title: 'Cofee first'},
    {id: 3, title: 'Code'},
  
  ];

  const [newTodo, setNewTodo] = React.useState('')


  return(
     
    <header>
      <h1>TODO List</h1>
      
      <TodoList todoList = {todoList}/>
      <AddTodoForm onAddTodo = {setNewTodo}/>
      
    <p> You Entered <strong>{newTodo}</strong></p>

    </header>
    
  );
  };

export default App;


