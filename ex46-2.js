const request = require('request');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const iconv = require('iconv-lite-umd');




const url = 'http://';

const date = new Date();
let title;

const arrayTitle = [];

function sendMail(arHeadline) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'gold01.silver0@gmail.com',
      pass: 'gold-silver'
    }
  });

  const mailOptions = {
    from: 'gold01.silver0@gmail.com',
    to: 'gold01.silver0@gmail.com',
    subject: `${date.toLocaleDateString()} Today News`,
    html: `<h1>IT/과학 실시간 헤드라인</h1><h2>${arHeadline}</h2><br>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Message sent: ${info.response}`);
    }
    transporter.close();
  });
}

const parse = (decodeResult) => {
  const $ = cheerio.load(decodeResult);
  const titles = $('.list_text_inner').find('a');
  titles.each((i, element) => {
    const title = $(element).text().trim();
    arrayTitle.push(title);
  });
  return arrayTitle;
};

request({
  url: url,
  method: 'GET',
  encoding: null
}, (err, res, body) => {
  const decodeResult = iconv.decode(body, 'euc-kr');
  const arTitle = parse(decodeResult);
  sendMail(arTitle);
});
