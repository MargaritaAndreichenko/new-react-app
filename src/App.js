import React, { useState } from 'react';
//import TodoList from './components/TodoList';
//import AddTodoForm from './components/AddTodoForm';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import style from './css/AllComponents.module.css'
//import PropTypes from "prop-types";
import TodoContainer from './components/TodoContainer.js';

//const sortByLastModifiedTime ="?sort[0][field]=completed&sort[0][direction]=asc&sort[1][field]=lastModifiedTime&sort[1][direction]=asc";

const TableChooser = () => {
  const [tableName, setTableName] = useState(process.env.REACT_APP_TABLE_NAME);
  return (
    // 
      <div>
        <h1  style={{textAlign: "center",}}>
      <select className={style.Link}
        id="selectField"
        value={tableName}
        onChange={(event) => setTableName(event.target.value)}
      >
        <option value={process.env.REACT_APP_TABLE_NAME}>Default</option>
        <option value="List2">List2</option>
      </select>
      </h1>
      <br></br>

      <TodoContainer tableName={tableName} />
      </div>
    
  );
};

const App = () => {
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
          <Route path="/new" element={<><h1 className={style.Link}>TODO List</h1></>}/>;
          <Route path="/" element={<TableChooser />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;