import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';


function App() {
  return (
    <header>
      <h1>TODO List</h1>

      <TodoList/>

      <div>
            <form>
                <label htmlFor="todoTitle">Title</label>
                <input type = "text" id = "todoTitle"/>
                <input type="submit" value="Add"></input>
            </form>
            
        </div>
     

    </header>
    
  );
};

export default App;


