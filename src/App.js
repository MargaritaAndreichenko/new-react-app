import React, { useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';



const App = () =>  { 

  const addTodo = (newTodo) =>
    setTodoList(todoList => [...todoList, newTodo]);
  

  const [todoList, setTodoList] = useState([]);


  return(
     
    <header>
      <h1>TODO List</h1>
      
      <TodoList todoList = {todoList}/>
      <AddTodoForm onAddTodo = {addTodo}/>
      

    </header>
    
  );
  };

export default App;


