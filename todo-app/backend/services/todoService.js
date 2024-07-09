const Todo = require("../models/todoSchema");

const createTodo = async(reqObj) => {
    const {title,description,completed} = reqObj;
    const todo = new Todo({
        title,
        description,
        completed
    })
    const result = await todo.save();
    return result;
};

const getTodos = async() => {
    const todos = await Todo.find();
    return todos
}

const getTodo = async(id) => {
    const todo = await Todo.find({_id:id});
    return todo;
}

const updateTodo = async(id) => {
    const todo = await Todo.updateMany({_id:id},{$set :{completed:true}});
    return todo;
}

module.exports = {
    createTodo:createTodo,
    getTodos : getTodos,
    updateTodo : updateTodo,
    getTodo : getTodo
}