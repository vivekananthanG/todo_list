import './App.css';
import data from './data.json';
import { useState } from "react";
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.complete,
  Completed: task => task.complete
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {


  const [toDoList, setToDoList] = useState(data);
  const [filter, setFilter] = useState('All');



  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));


  const handleToggle = (id) => {
    let mapped = toDoList.map(task => {
      return task.id === Number(id) ? { ...task, complete: !task.complete } : { ...task };
    });
    setToDoList(mapped);
  }



  const addTask = (userInput) => {
    let copy = [...toDoList];
    copy = [...copy, { id: toDoList.length + 1, task: userInput, complete: false }];
    setToDoList(copy);
  }

  return (
    <div className="App">
      <h1>To Do List</h1>
<div className='App1'>
      <Card className="card" sx={{ minWidth: 275 }}>
      <ToDoForm addTask={addTask} />
      <div className="filtr">{filterList}</div>
      <ToDoList toDoList={toDoList} handleToggle={handleToggle} filter={filter} setToDoList={setToDoList}/>
      </Card>
      </div>

    </div>
  );
}

export default App;

function FilterButton(props) {
  return (
    <Button variant="text"
      type="button"
      className="btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span>{props.name}</span>
    </Button>
  );
}


function ToDoList({ toDoList, handleToggle,filter,setToDoList }) {
  const deletetodo = (index) => {
    const deleteIndex = index;
    const remainingtodo = toDoList.filter((mv, idx) => deleteIndex !== idx);
    setToDoList(remainingtodo);
  }
  return (
    <div >
      {toDoList.filter(FILTER_MAP[filter]).map((todo,i) => {
        return (
          <ToDo todo={todo} key={i} handleToggle={handleToggle} deleteButton={<IconButton onClick={() => deletetodo(i)}><DeleteIcon color="error"/></IconButton>}
          />
        )
      })}
    </div>
  );
};



function ToDo({ todo, handleToggle,deleteButton}) {

  

  const handleClick = (e) => {
    e.preventDefault()
    handleToggle(todo.id)
  }
  

  return (
    <Card className='todolist1'>
      <div>
      <Checkbox checked={todo.complete}  key={todo.id + todo.task} name="todo" value={todo.id} onClick={handleClick} />
      <label htmlFor={todo.id} className={todo.complete ? "strike" : "todo"}> {todo.task}</label>
      </div>
      <div>
      {deleteButton}
      </div>
    </Card>
  );
};


function ToDoForm({ addTask }) {

  const [userInput, setUserInput] = useState('');

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value)
  }

  const handleSubmit = (e) => {
    
    if(userInput){
    e.preventDefault();
    addTask(userInput);
    setUserInput("");
    }
    else{
      alert("Please enter new task")
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextField  fullWidth  id="fullWidth" label="Enter task..." variant="outlined"  value={userInput} type="text" onChange={handleChange}/>
    </form>
  );
};