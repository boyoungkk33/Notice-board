const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'book_table1',
  port: '3306'
});

connection.connect();
connection.query('CREATE TABLE books (number INT NOT NULL AUTO_INCREMENT PRIMARY KEY, genre VARCHAR(20) NOT NULL, name VARCHAR(50) NOT NULL, writer VARCHAR(30) NOT NULL, releasedate DATE NOT NULL)', (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});

connection.query('DESCRIBE books', (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});

connection.end();
