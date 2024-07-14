import { useState, useEffect } from "react";
import { CreateTodo } from "./CreateTodo";
import { Todos } from "./Todos";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loginState } from "../atoms";
import { AppBar } from "./AppBar";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [detailedTodo, setDetailedTodo] = useState(null);
  const loginValue = useRecoilValue(loginState);

  console.log(loginValue);

  useEffect(() => {
    const fetchTodos = async () => {
        try {
          const response = await axios.get("http://localhost:4000/api/todos", {
            headers: {
              Authorization: `Bearer ${loginValue.token}`,
            },
          });
  
          setTodos(response.data.data);
        } catch (error) {
          console.error("Error fetching todos:", error);
        }
      };
      fetchTodos();
  }, []);

  const fetchTodoDetails = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${loginValue.token}`,
        },
      });
      //console.log(res)
      setDetailedTodo(res.data.data);
    } catch (error) {
      console.log("Error fetching todo details", error);
    }
  };

  const clearDetailedTodo = () => {
    setDetailedTodo(null);
  };

  return (
    <div>
      <AppBar/>
      <CreateTodo></CreateTodo>
      {detailedTodo ? (
        <div>
          <h1>{detailedTodo[0].title}</h1>
          <h2>{detailedTodo[0].description}</h2>
          <p>
            Status: {detailedTodo[0].completed ? "Completed" : "Incomplete"}
          </p>
          <button onClick={clearDetailedTodo}>Back to List</button>
        </div>
      ) : (
        <Todos todos={todos} fetchTodoDetails={fetchTodoDetails} />
      )}
    </div>
  );
}
