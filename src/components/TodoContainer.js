import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
//import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
//import style from './css/AllComponents.module.css'


//const sortByLastModifiedTime ="?sort[0][field]=completed&sort[0][direction]=asc&sort[1][field]=lastModifiedTime&sort[1][direction]=asc";

const TodoContainer = ({tableName}) => {
  console.log(tableName);
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


const fetchAPI = async (url, options) => {
  try {
    const response = await fetch((url, options));
    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }
  return await response.json();
} catch (error) {
  setIsLoading(false);
  console.log(error);
}
}


  const getTodo = async () => {
      const options = {};
        options.method = 'GET';
        options.headers = { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}` };
      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}/?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=asc`;
    
      try {
      const data = await fetchAPI(url, options)
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
     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodo(); 
  }, [tableName]
  );

  const addTodo = async (newTodo) => {
      const airtableData = {
        fields: { Title: newTodo, }
      };
      const options = {};
      options.method = 'POST';
      options.headers = { "Content-Type": "application/json", Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}` };
      options.body = JSON.stringify(airtableData)
      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}`;
      
      try{
      const response = await fetchAPI(url, options)
      getTodo();
      return response;
    }
    catch (error) {
      console.log(error.message);
      return null;
    };
  };


  const removeTodo = async (id) => {
      const options = {};
      options.method = 'DELETE';
      options.headers = { "Content-Type": "application/json", Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}` };
      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}/${id}`;
      try{
        const response = await fetchAPI(url, options)
        getTodo();
        return response;
      }
      catch (error) {
        console.log(error.message);
        return null;
      };
    };
    return(
        <section>
        <AddTodoForm onAddTodo={addTodo} />
              {isLoading ? (<p>Loading...</p>) :
                (<TodoList todoList={todoList} onRemoveTodo={removeTodo}  />
                
                )}
        </section>
    );
};
export default TodoContainer;
