const sqlite3 = require('sqlite3').verbose();

// Init database to file
/*let db = new sqlite3.Database('ToDoList', (err) => {
    if (err) {
        console.error(err.message)
    }
    console.log('Connected to the database.')
})*/
const db = new sqlite3.Database('ToDoList');

db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT)', (err) => {
    if (err) {
        console.log('Error creating todos table:', err.message);
    } else {
        console.log('Todos table  created successfully');
    }
});
/*
const getAllTodos = (callback) => {
    db.all('SELECT * FROM todos', (err, rows) => {
        if (err) {
            throw err;
        }
        callback(rows);
    });
};
*/
const Todo = {
    all: () => {
        db.all('SELECT * FROM todos', [], (err, rows) => {
            if (err) {
                throw err;
            }
            return rows;
        });
    },

    create: (data, callback) => {
        const query = 'INSERT INTO todos (title, description) VALUES (?, ?)';
        db.run(query, [data.title, data.description], (err) => {
            if (err) {
                throw err;
            }
            callback();
        });
    },

    findById: (id, callback) => {
        db.get('SELECT * FROM todos WHERE id = ?', [id], (err, row) => {
            if (err) {
                throw err;
            }
            callback(row);
        });
    },

    update: (data, callback) => {
        const query = 'UPDATE todos SET title = ?, description = ? WHERE id = ?';
        db.run(query, [data.title, data.description, data.id], (err) => {
            if (err) {
                throw err;
            }
            callback();
        });
    },

    delete: (id, callback) => {
        db.run('DELETE FROM todos WHERE id = ?', [id], (err) => {
            if (err) {
                throw err;
            }
            callback();
        });
    },
};

// Export the Todo model
module.exports = Todo;