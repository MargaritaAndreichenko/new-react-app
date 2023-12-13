import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';


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
      const todos = data.records.map((todo) => {
        const newTodo = {
          id: todo.id,
          title: todo.fields.Title
        }
        return newTodo
      });
      setTodoList(todos);

    } catch (error) {
      console.log(error.message);

    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []
  );


  const postTodo = async (title) => {
    try {
      const airtableRecord = {
        fields: {
          title: title,
        },
      };

      const response = await fetch(
        `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`
          },
          body: JSON.stringify(airtableRecord)
        }
      );

      if (!response.ok) {
        const message = `Error has ocurred:
                               ${response.status}`;
        throw new Error(message);
      }

      const dataResponse = await response.json();
      return dataResponse;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };


  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [isLoading, todoList]);

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(updatedTodoList);
  };

  const addTodo = (newTodo) =>{
    postTodo(newTodo)
  setTodoList(todoList => [...todoList, newTodo]);
  };
  return (
    <header>
      <h1>TODO List</h1>


      {isLoading ? <p>Loading...</p> :
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
      <AddTodoForm onAddTodo={addTodo} />
    </header>
  );
};

export default App;