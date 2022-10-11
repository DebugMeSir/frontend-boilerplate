const ejs = require("ejs");
const fs = require('fs');
const data = require('./data.json');

ejs.delimiter = '?';

ejs.renderFile('moevl/ejs/index.ejs', data, null, function (err, str) {
    if (err) throw err;
    fs.writeFileSync("index.html", str);
});

