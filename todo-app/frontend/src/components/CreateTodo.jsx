import { useState } from "react";
import axios from "axios";

export function CreateTodo() {
    // less optimal solution
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
  return (
    <div>
      <input style={{padding:10,margin:10}} type="text" placeholder="title" onChange={(e) => {
        const value = e.target.value;
        setTitle(value);
      }} /> <br />
      <input style={{padding:10,margin:10}} type="text" placeholder="description" onChange={(e) => {
        const value = e.target.value;
        setDescription(value);
      }}/> <br />
      <button style={{padding:10,margin:10}} onClick={async() => {
        // const reqBody = {
        //     title : title,
        //     description : description
        // }
        // const response = await axios.post("http://localhost/4000/api/todo",reqBody);
        // if(response) {
        //     alert("Todo Added")
        // }
        await fetch("http://localhost:4000/api/todo",{
            method: "POST",
            body : JSON.stringify({
                title : title,
                description : description
            }),
            headers : {
                "content-type":"application/json"
            }
        })
            .then(async (res) => {
                const json = await res.json();
                alert("Todo added")
            })
      }}>Add a Todo</button>
    </div>
  );
}

