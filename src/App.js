import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import style from './css/AllComponents.module.css'
import TodoContainer from './components/TodoContainer.js';

const TableChooser = () => {
  const [tableName, setTableName] = useState(process.env.REACT_APP_TABLE_NAME);
  const handleSetTableName = (newTableName) => {setTableName(newTableName);};

  return (
      <div style={{ textAlign: "center" }}>
        
          {/* Buttons for selecting the table */}
          <button
            className={style.Link}
            onClick={() => handleSetTableName(process.env.REACT_APP_TABLE_NAME)}
          >
            To-Do List
          </button>
         <>  </>
          <button
            className={style.Link}
            onClick={() => handleSetTableName("List2")}
          >
            Shopping List
          </button>
       
        <br />
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
              <ol></ol>
              <ol><Link to="/" className={style.Link} >Home</Link></ol>
            </ul>
          </h1>
        </nav>
        <Routes >
          <Route path="/" element={<><h1 className={style.Link} style= { {fontSize:"40px"}}>
          Welcome to the Todo List Manager! 
          <h2>           </h2>   <br></br>
          <Link to="/new" className={style.Link} style= { {fontSize:"30px"}}>Go to My lists</Link></h1><br></br> 
          </>} />;
          <Route path="/new" element={<TableChooser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;