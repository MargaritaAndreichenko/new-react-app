import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';


function App() {
  return (
    <header>
      <h1>TODO List</h1>

      <TodoList/>
      <AddTodoForm/>

    </header>
    
  );
};

export default App;


