const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'book_table1',
  port: '3306'
});

connection.connect();

connection.query('INSERT INTO books (genre, name, writer, releasedate) VALUES (?, ?, ?, ?), (?, ?, ?, ?)', ['fantasy', 'The Lord of the Ring', 'JSON.R.R', '2023-01-01', 'romance', 'First Love', 'B.unkown', '2023-01-01'], (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});

connection.end();
