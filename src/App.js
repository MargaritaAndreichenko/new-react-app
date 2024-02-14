import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import style from './css/App.module.css'
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
      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=asc`;
      const response = await fetch(url, options);
      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      data.records.sort((objectA, objectB) => {
        const titleA = objectA.fields.Title.toLowerCase();
        const titleB = objectB.fields.Title.toLowerCase();
        return titleA < titleB ? 1 : titleA > titleB ? -1 : 0;
      });
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
                (<TodoList todoList={todoList} onRemoveTodo={removeTodo}  />
                
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