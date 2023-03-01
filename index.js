const express = require('express');
const app = express();
const port = 3000;
const controller = require('./controllers/controllers');
//const controller1 = require('./controllers/controllers1');
const bodyParser = require("body-parser");
const model = require("./models/model")

app.set('view engine', 'pug');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
/*
app.post('/todos', async (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;

    // Check the data types
    console.log(typeof id); // number
    console.log(typeof title); // string
    console.log(typeof description); // string

});
*/
// Use the controller for all requests to the /todos route
app.get('/', (req, res) => {
    res.redirect('/todos'); // redirect the root route to the /todos route
 });
app.use('/todos', controller);



// Start the server
app.listen(port, () => {
    console.log(`To-do list app listening at http://localhost:${port}`);
});
