const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const config = require('config')
const mongoUri = config.get('mongoUri')
const mongoose = require('mongoose')
const PORT = config.get('port') || 4000
const todoRoutes = express.Router()
const app = express()

let Todo = require('./todo.model')

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(mongoUri,{useNewUrlParser:true});

const connection = mongoose.connection;

connection.once('open',function(){
    console.log("Database started")
})

todoRoutes.route('/').get(function(req,res){
    return Todo.find(function(err,todos){
        if(err){
            console.log(err);
            res.status(400).send({message: err.message})
        }
        else{
            res.status(200).send(todos)
        }
    })
})


todoRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Todo.findById(id,function(err,todo){
        res.json(todo);
    });
});

todoRoutes.route('/:id').delete(function(req,res){
    let id = req.params.id;
    Todo.deleteOne(id, function(err,todo){
       if(err){
           res.status(400).send({message: err.message})
       }
       res.status(200).send({message:`Todo with id ${id} is successfully deleted.`})
    });
});

todoRoutes.route('/add').post(function(req,res){
    console.log(req.body)
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(201).json({message:'todo added successfully'})
        })
        .catch(err => {
            res.status(400).send({message: err.message})
        });
});

todoRoutes.route('/update/:id').put(function(req,res){
    Todo.findById(req.params.id, function(err,todo){
        if(!Todo){
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed= req.body.todo_completed;

            todo.save().then(todo => {
                res.status(200).json({message: 'Todo updated'})
            })
            .catch(err => {
                res.status(400).send({message: err.message || "Failed to update"});
            })
        }
    })
})

app.use('/todos',todoRoutes)

app.listen(PORT,() => {
    console.log(`Server is running at ${PORT}`)
})