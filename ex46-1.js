const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

const url = "https://n.news.naver.com/article/020/0003502876?cds=news_media_pc&type=editn";

const parse = (decodeResult) => {
  const $ = cheerio.load(decodeResult);
  const titles = $('.list_text_inner').find('a');

  const arrayTitle = [];
  titles.each((i, element) => {
    const title = $(element).text().trim();
    arrayTitle.push(title);
  });

  console.log(arrayTitle);
};

request({
  url: url,
  method: 'GET',
  encoding: null
}, (err, res, body) => {
  const decodeResult = iconv.decode(body, 'euc-kr');
  parse(decodeResult);
});
