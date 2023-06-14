const mysql = require('mysql');
const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'book_table1',
    port: '3306'
});

const app = express();
app.use(bodyParser.urlencoded({
    extended: false,
}));

app.listen(2000, () => {
    console.log('Server is running at http://127.0.0.1:2000');
    connection.connect();
});

app.get('/', (request, response) => {
    fs.readFile('bookList.html', 'utf-8', (error, data) => {
        connection.query('SELECT * FROM books', (error, results) => {
            if (error) throw error;
            response.send(ejs.render(data, {
                data: results
            }));
        });
    });
});

// Add new book
app.get('/create', (request, response) => {
    fs.readFile('insertNewBook.html', 'utf-8', (error, data) => {
        if (error) throw error;
        response.send(data);
    });
});

app.post('/create', (request, response) => {
    const body = request.body;
    connection.query('INSERT INTO books (genre, name, writer, releasedate) VALUES (?, ?, ?, ?)',
        [body.genre, body.name, body.writer, body.releasedate], (error, results) => {
            if (error) throw error;
            response.redirect('/');
        });
});

// Modify book
app.get('/modify/:id', (request, response) => {
    fs.readFile('modify.html', 'utf-8', (error, data) => {
        if (error) throw error;
        connection.query('SELECT * FROM books WHERE number = ?', [request.params.id], (error, results) => {
            if (error) throw error;
            response.send(ejs.render(data, {
                data: results[0]
            }));
        });
    });
});

app.post('/modify/:id', (request, response) => {
    const body = request.body;
    connection.query('UPDATE books SET genre = ?, name = ?, writer = ?, releasedate = ? WHERE number = ?',
        [body.genre, body.name, body.writer, body.releasedate, request.params.id], (error, results) => {
            if (error) throw error;
            response.redirect('/');
        });
});


// Delete book
app.get('/delete/:id', (request, response) => {
    connection.query('DELETE FROM books WHERE number = ?', [request.params.id], (error, results) => {
        if (error) throw error;
        response.redirect('/');
    });
});
