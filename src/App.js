import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';


const App = () => {

const [todoList, setTodoList] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [isError, setIsError] = useState(false);


useEffect(() => {
  new Promise(resolve => {
      setTimeout(() => {
          resolve({ data: { todoList: JSON.parse(localStorage.getItem("todoList")) || [] } });}, 2000);
  }).then(result => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
  }).catch(() => setIsError(true));
}, []);

useEffect(() => {
  if (!isLoading) {
    localStorage.setItem("todoList", JSON.stringify(todoList));}
  }, [isLoading,todoList]);

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(updatedTodoList);
  }; 

  const addTodo = (newTodo) =>
    setTodoList(todoList => [...todoList, newTodo]);

  return (
    <header>
      <h1>TODO List</h1>
      {isError && <p>Something went wrong ...</p>}

      {isLoading ? <p>Loading...</p> : 
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
      <AddTodoForm onAddTodo={addTodo} />
    </header>
  );
};

export default App;