import React, {useEffect, useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(JSON.parse(localStorage.getItem(key) || initialState));

   useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    }, [key,value]);

    return[value, setValue];
};


const App = () =>  { 

  const [todoList, setTodoList] = useSemiPersistentState('savedTodoList','React');

  const addTodo = (newTodo) =>
    setTodoList(todoList => [...todoList, newTodo]);

  return(
     
    <header>
      <h1>TODO List</h1>
      
      <TodoList todoList = {todoList}/>
      <AddTodoForm onAddTodo = {addTodo}/>
      

    </header>
    
  );
  };

export default App;