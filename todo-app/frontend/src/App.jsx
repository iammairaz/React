import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'
import axios from "axios";
import { useEffect } from 'react'


function App() {
  const [todos, setTodos] = useState([]);
  const [detailedTodo,setDetailedTodo] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/api/todos")
      .then(async (res) => {
        setTodos(res.data.data)
      })
      .catch(err => {
        console.error("error fetching todos",err);
      })
  },[])

  const fetchTodoDetails = async(id) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/todo/${id}`);
      //console.log(res)
      setDetailedTodo(res.data.data)

    } catch (error) {
      console.log("Error fetching todo details",error)
    }
  }

  const clearDetailedTodo = () => {
    setDetailedTodo(null);
  };

  return (
    <div>
      <CreateTodo></CreateTodo>
            {detailedTodo ? (
        <div>
          <h1>{detailedTodo[0].title}</h1>
          <h2>{detailedTodo[0].description}</h2>
          <p>Status: {detailedTodo[0].completed ? 'Completed' : 'Incomplete'}</p>
          <button onClick={clearDetailedTodo}>Back to List</button>
        </div>
      ) : (
        <Todos todos={todos} fetchTodoDetails={fetchTodoDetails} />
      )}
    </div>
  )
}

export default App
