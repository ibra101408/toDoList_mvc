

const express = require('express');
const router = express.Router();
const model = require('../models/model');


// GET all to-do items
router.get('/', async (req, res) => {
    try {
        const todos = await model.getAll();
        res.render('index', { todos });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// POST a new to-do item
router.post('/', async function (req, res, next) {
    try {
        const todos = await model.create(req.body);
        res.render('index', { todos: [todos] });
    } catch (err) {
        next(err);
    }
});
/*exports.create = async (req, res, next) => {
    try {
        const todo = await model.create(req.body.id, req.body.title, req.body.description);
        res.status(201).json(todo);
    } catch (error) {
        next(error);
    }
};

router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;
        const todo = await model.create(title, description);
        res.redirect('/todos');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});*/


// DELETE a to-do item
router.delete('/:id', async function (req, res) {
    try{
        const todos = await model.delete(req.body);
        res.render('index', {todos: [todos] });
    } catch (err) {
        console.error(err.message);
    }

});

module.exports = router;