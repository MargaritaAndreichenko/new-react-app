import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import PropTypes from 'prop-types';

import style from '../css/AllComponents.module.css';

const sortByLastModifiedTime =
  "?sort[0][field]=completed&sort[0][direction]=asc&sort[1][field]=lastModifiedTime&sort[1][direction]=asc";

const TodoContainer = ({ tableName }) => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSortField, setCurrentSortField] = useState("title");

  const fetchAPI = async (url, options) => {
    try {
      const response = await fetch(url, options);
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

  const getTodo = async (table) => {
    const options = {};
    options.method = 'GET';
    options.headers = { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`, Accept: "application/json" };
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}/?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=asc`;

    try {
      const data = await fetchAPI(url, options)
      console.log(data);
     
      const todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.Title,
        completeDateTime: todo.fields.completeDateTime,
        createDateTime: todo.fields.createDateTime,
      }));
      setTodoList(todos);
      updateSorts(todos, currentSortField);
      
      setIsLoading(false);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodo(tableName);
  }, [ tableName]
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

    try {
      const response = await fetchAPI(url, options)
      getTodo(tableName);
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
    try {
      const response = await fetchAPI(url, options)
      getTodo();
      return response;
    }
    catch (error) {
      console.log(error.message);
      return null;
    };
  };

  const updateTodo = async (id, updatedFields, newTodo) => {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`
        },
        body: JSON.stringify({ fields: {completeDateTime: newTodo.completeDateTime, updatedFields }})
      };
      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`;
      const response = await fetch(url, options);
      if (!response.ok) {
        const message = `Error has occurred: ${response.status}`;
        throw new Error(message);
      }
      const dataResponse = await response.json();
      fetchAPI();
      return dataResponse;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  
    const toggleTodoCompletion = (id) => {
      let todo = todoList.find((itemTodo) => itemTodo.id === id);
      todo.completeDateTime = todo.completeDateTime
        ? null
        : new Date().toISOString();
  
      updateTodo(todo);
    };

  const updateNewTitle = (id, newTitle) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );

    setTodoList(updatedTodoList);
    updateTodo(id, { Title: newTitle });
  };
  const reorderTodo = (newTodoList) => {
    setTodoList(newTodoList);
  };

  const updateSorts = (todos, sortBy) => {
    let sortedTodos = [];
    if (sortBy === "title") {
      sortedTodos = [...todos].sort((objectA, objectB) => {
        const titleA = objectA.title.toUpperCase();
        const titleB = objectB.title.toUpperCase();

        return titleA < titleB ? -1 : titleA === titleB ? 0 : 1;
      });
    } else if (sortBy === "completeDateTime") {
      sortedTodos = [...todoList].sort((objectA, objectB) => {
        const dateA = new Date(objectA.completeDateTime);
        const dateB = new Date(objectB.completeDateTime);

        if (isNaN(dateA)) return -1;
        if (isNaN(dateB)) return 1;

        return dateA - dateB;
      });
    }
    console.log(sortedTodos);
    setTodoList(sortedTodos);
  };

  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '10px' }}>
    <select
          className={style.Link} 
          
          onChange={(e) => {
            setCurrentSortField(e.target.value);
            updateSorts(todoList, e.target.value);
          }}
        >
          
          <option value="title">sort by title</option>
          <option value="completeDateTime">sort by date</option>
         
        </select>
        </div>
        <div/>
    <div>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (<p>Loading...</p>) :
        (<TodoList todoList={todoList}
          onRemoveTodo={removeTodo}
          onUpdateNewTitle={updateNewTitle}
          onToggleCompletion={toggleTodoCompletion}
          onReorderTodo={reorderTodo} />

        )}
    </div>
    
    </section>
  );
};

TodoContainer.propTypes = {
  tableName: PropTypes.string.isRequired,
}
export default TodoContainer;
