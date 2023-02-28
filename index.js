const express = require('express');
const app = express();
const port = 3000;
const controller = require('./controllers/controllers');
const controller1 = require('./controllers/controllers1');

// Middleware to serve static files from the public directory
app.use(express.static('public'));

// Middleware to parse request body as URL encoded data
app.use(express.urlencoded({ extended: true }));

// Use the controller for all requests to the /todos route
app.get('/', (req, res) => {
    res.redirect('/todos'); // redirect the root route to the /todos route
 });
app.use('/todos', controller);
app.set('view engine', 'pug');


// Start the server
app.listen(3000, () => {
    console.log(`To-do list app listening at http://localhost:${port}`);
});
