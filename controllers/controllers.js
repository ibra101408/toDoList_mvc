

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

// DELETE a to-do item
router.delete('/:id', async function (req, res) {
    try{
        const todos = await model.delete(req.body);
        res.render('index', {todos: [todos] });
    } catch (err) {
        console.error(err.message);
    }
    /*const id = req.params.id;
    model.delete(id, () => {
        res.sendStatus(200);
    });*/
});

module.exports = router;