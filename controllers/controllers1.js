const express = require('express');
const router = express.Router();

// Define the /todos route
router.get('/', (req, res) => {
    console.log("iiii");
    res.render('index'); // render the index.pug view
});

module.exports = router;