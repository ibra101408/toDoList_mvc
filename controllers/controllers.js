

const express = require('express');
const router = express.Router();
const Todo = require('../models/model');

// Display a list of all To-Do items
router.get('/', (req, res) => {
    Todo.all({}, (err, todos) => {
        if (err) {
            console.error(err);
        } else {
            res.render('index', { todos: todos });
        }
    });
});

// Add a new To-Do item
router.post('/', (req, res) => {
    let newTodo = new Todo({
        text: req.body.text,
        completed: false
    });

    newTodo.save((err, todo) => {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/todos');
        }
    });
});

// Update the completed status of a To-Do item
router.put('/:id', (req, res) => {
    let todoId = req.params.id;
    let completed = req.body.completed === 'true';

    Todo.findByIdAndUpdate(
        todoId,
        { completed: completed },
        (err, todo) => {
            if (err) {
                console.error(err);
            } else {
                res.send('Todo item updated successfully!');
            }
        }
    );
});

// Delete a To-Do item
router.delete('/:id', (req, res) => {
    let todoId = req.params.id;

    Todo.findByIdAndRemove(todoId, (err, todo) => {
        if (err) {
            console.error(err);
        } else {
            res.send('Todo item deleted successfully!');
        }
    });
});

module.exports = router;