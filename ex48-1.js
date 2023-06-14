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
  extended: false
}));

app.listen(5000, () => {
  console.log('Server is running');
  connection.connect();
});

// 데이터 조회
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

// 데이터 추가
app.get('/create', (request, response) => {
  fs.readFile('insertNewBook.html', 'utf-8', (error, data) => {
    if (error) throw error;
    response.send(data);
  });
});


app.post('/create', (request, response) => {
  const body = request.body;
  connection.query('INSERT INTO books (genre, name, writer, releasedate) VALUES (?, ?, ?, ?)', [body.genre, body.name, body.writer, body.releasedate], (error, results) => {
    if (error) throw error;
    response.redirect('/');
  });
});
