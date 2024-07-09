const todoService = require("../services/todoService");

const createTodo = async (req, res) => {
    try {
        console.log(req.body)
        const requestBody = req.body;
        // const parsedPayload = createTodo.safeParse(requestBody);
        // if(!parsedPayload.success) {
        //     res.status(403).json({
        //         msg : "Please provide valid inputs"
        //     })
        // }
        //console.log(requestBody)
        const response = await todoService.createTodo(requestBody);
        if (response) {
            res.status(200).json({
                data: response
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
}

const fetchTodos = async (req, res) => {
    try {
        const response = await todoService.getTodos();
        if (response) {
            res.status(200).json({
                data: response
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
}

const fetchTodo = async(req,res) => {
    try {
        const id = req.params.id;
        const response = await todoService.getTodo(id);
        if(response) {
            res.status(200).json({
                data:response
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
}

const updateTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await todoService.updateTodo(id);
        if (response) {
            res.status(200).json({
                msg: response
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error ")
    }
}

module.exports = {
    createTodo: createTodo,
    fetchTodos: fetchTodos,
    updateTodo: updateTodo,
    fetchTodo : fetchTodo
}