import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import style from './App.module.css';
//import styles from './TodoListItem.module.css';

//const sortByLastModifiedTime ="?sort[0][field]=completed&sort[0][direction]=asc&sort[1][field]=lastModifiedTime&sort[1][direction]=asc";

const App = () => {


  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchData = async () => {
    try {
      const options = {};
      options.method = 'GET';
      options.headers = { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}` };
      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
      const response = await fetch(url, options);
      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      const todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.Title
      }));
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []
  );

  const addTodo = async (newTodo) => {
    try {
      const airtableData = {
        fields: { Title: newTodo, }
      };
      const options = {};
      options.method = 'POST';
      options.headers = { "Content-Type": "application/json", Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}` };
      options.body = JSON.stringify(airtableData)
      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
      const response = await fetch(url, options)
      if (!response.ok) {
        const message = `Error has ocurred:
        ${response.status}`;
        throw new Error(message);
      }
      const dataResponse = await response.json();
      fetchData();
      return dataResponse;
    }
    catch (error) {
      console.log(error.message);
      return null;
    };
  };


  const removeTodo = async (id) => {
    try {
      const options = {};
      options.method = 'DELETE';
      options.headers = { "Content-Type": "application/json", Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}` };
      const response = await fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`, options);
      if (!response.ok) {
        const message = `Error has ocurred:
        ${response.status}`;
        throw new Error(message);
      }
      const dataResponse = await response.json();
      fetchData();
      return dataResponse;
    }
    catch (error) {
      console.log(error.message);
      return null;
    };
  };


  const updateTodo = async (id, updatedFields) => {
    try {
        const options = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`
            },
            body: JSON.stringify({ fields: updatedFields })
        };
        const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`;
        const response = await fetch(url, options);
        if (!response.ok) {
            const message = `Error has occurred: ${response.status}`;
            throw new Error(message);
        }
        const dataResponse = await response.json();
        fetchData(); // Refresh the list after update
        return dataResponse;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};


   const toggleTodoCompletion = (id) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    const sortedTodoList = updatedTodoList.sort((a, b) =>
      a.completed === b.completed ? 0 : a.completed ? 1 : -1
    );
    setTodoList(sortedTodoList);
    updateTodo(id, { Completed: sortedTodoList.find((itemTodo) => itemTodo.id === id).completed });
  }; 

  const updateNewTitle = (id, newTitle) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );

    setTodoList(updatedTodoList);
    updateTodo(id, { Title: newTitle });
  };

  return (
    <div>
      <BrowserRouter >
        <nav >
          <h1>
          <ul >
            <ol><Link to="/"className={style.Link} >Home</Link></ol>
            <ol><Link to="/new" className={style.Link}>New Todo</Link></ol>
          </ul>
          </h1>
        </nav>
        <Routes >
          <Route path="/" element={
            <>
              <h1 className={style.Link}>TODO List</h1>
              
              <AddTodoForm onAddTodo={addTodo} />
              {isLoading ? (<p>Loading...</p>) :
                (<TodoList todoList={todoList} onRemoveTodo={removeTodo}  onUpdateNewTitle={updateNewTitle} onToggleCompletion={toggleTodoCompletion}/>
                
                )}
            </>
          } />;
          <Route path="/new" element={
            <h1 className={style.Link}>New Todo List</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;