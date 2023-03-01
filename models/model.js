const sqlite3 = require('sqlite3').verbose();


// Connect to the SQLite database
const db = new sqlite3.Database('identifier.sqlite')



// Export functions to interact with the database
module.exports = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM todos', [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },

    create: (id, title, description) => {
        return new Promise((resolve, reject) => {
            const stmt = 'INSERT INTO todos (id, title, description) VALUES (?, ?, ?)';
            db.run(stmt, [id, title, description], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    },

    update: (id, description) => {
        return new Promise((resolve, reject) => {
            db.run('UPDATE todos SET description = ? WHERE id = ?', [description, id], function (err) {
                if (err) {
                    reject(err);
                } else if (this.changes === 0) {
                    reject(new Error(`No todo with id ${id} found`));
                } else {
                    resolve(this.changes);
                }
            });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM todos WHERE id = ?', [id], function (err) {
                if (err) {
                    reject(err);
                } else if (this.changes === 0) {
                    reject(new Error(`No todo with id ${id} found`));
                } else {
                    resolve(this.changes);
                }
            });
        });
    }
};