import { useState, useEffect } from 'react';
export function Todos({ todos, fetchTodoDetails  }) {
  return (
    <div>
      {todos.map((todo) => {
        return (
          <div>
            <h1>{todo.title}</h1>
            <h2>{todo.description}</h2>
            <button>{todo.completed==true ? "Completed" : "Mark as Complete" }</button>
            <button onClick={() => fetchTodoDetails(todo._id)}>View Details</button>
          </div>
        );
      })}
    </div>
  );
}
