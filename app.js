const express = require('express');
const app = express();

// use to get post data in json format
app.use(express.json());

let arr = [
    {id:1,name:"Task 1"},
    {id:2,name:"Task 2"},
    {id:3,name:"Task 3"},
    {id:4,name:"Task 4"},
    {id:5,name:"Task 5"},
    {id:6,name:"Task 6"}
]

// Home Route;
app.get('/',(req,res)=>{
    return res.status(200).send("Hello World");
});

//Read task
app.get('/tasks',(req,res)=>{
    return res.status(200).send(arr);
});

//Read single task
app.get('/tasks/:id',(req,res)=>{
    const id = req.params.id;
    const task = arr.find(item=> item.id == id);
    if(task){
        return res.status(200).send(task);
    }else{
        return res.status(200).send("Invalid task");
    }
});

//Create task
app.post('/tasks',(req,res)=>{
    const name = req.body.name;
    const task = arr[arr.length-1];
    const new_task = {name, id:task.id + 1};
    arr.push(new_task);
    return res.status(201).send(new_task);
});


//Update task
app.put('/tasks/:id',(req,res)=>{
    const updated_name = req.body.name;
    const id = req.params.id;
    let task = arr.find(item => item.id == id);
    if(!task){
        return res.status(404).send("Task not found!!!!");   
    }
    task.name = updated_name;
    const index = arr.findIndex(item=> item.id == id);
    arr[index] = task;
    return res.status(202).send({task,message:"Task updated successfully!!!"});
});

//Delete task
app.delete('/tasks/:id',(req,res)=>{
    const id = req.params.id;
    console.log("Error is :",id);
    const update_tasks = arr.filter(item=> item.id != id);
    arr = [...update_tasks];
    return res.status(200).send("Task has been deleted!!!");
});

const port = 3001;
app.listen(port,(err)=>{
    if(!err){
        console.log("App is listening on port: ",port);
    }
})

/*
    C:  Create
    R:  Read
    U:  Update
    D:  Delete
*/