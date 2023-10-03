import React from 'react';

const todoList = [
  {id: 1, title: 'Wake up'},
  {id: 2, title: 'Cofee first'},
  {id: 3, title: 'Code'},

];

function App() {
  return (
    <header>
      <h1>TODO List</h1>
      <ul>
        {todoList.map(function(item) {
          return (
          
    
            <li key = {item.objectId}>
              <label>
              <input type="checkbox" />
             
            </label>
              <span>{item.id}</span>
              <span> {item.title}</span>
              
            </li>
            );}) 
        }
      </ul>
    </header>
    
  );
};

export default App;


