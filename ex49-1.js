const mysql =require('mysql');
const express =require('express');
const fs=require('fs');
const ejs=require('ejs');
const bodyParser =require('body-parser');

const connrection=mysql.createConnection({
host:'localhost',
user:'root',
password:'1234',
database:'book_table1',

});