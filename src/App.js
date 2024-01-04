import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


const App = () => {

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchData = async () => {
    const options = {};

    options.method = 'GET';
    options.headers = { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}` };

    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      console.log(data);
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
  console.log("Fetch GET1")


  useEffect(() => {
    fetchData();
  }, []
  );



  const addTodo = async (newTodo) => {

    try {
      const airtableData = {
        fields: {
          Title: newTodo,
        }
      };
      const response = await fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`
          },
          body: JSON.stringify(airtableData),
        }
      );

      if (!response.ok) {
        const message = `Error has ocurred:
      ${response.status}`;
        throw new Error(message);
      }

      const dataResponse = await response.json();
      console.log(dataResponse);
      fetchData();
      return dataResponse;
    }
    catch (error) {
      console.log(error.message);
      return null;
    };
  };


  console.log("Fetch POST")


  const removeTodo = async (id) => {
    console.log(id)
    try {

      const response = await fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`
          },
        }
      );

      if (!response.ok) {
        const message = `Error has ocurred:
      ${response.status}`;
        throw new Error(message);
      }
      const dataResponse = await response.json();
      console.log(dataResponse);
      fetchData();
      return dataResponse;
    }
    catch (error) {
      console.log(error.message);
      return null;
    };

  };
  console.log(" Remove")


  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={
          <>

            <h1>TODO List</h1>
            <AddTodoForm onAddTodo={addTodo} />
            {isLoading ? (<p>Loading...</p>) :
              (<TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              )}


          </>
        } />;
        <Route path="/new" element={
          <h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;