import concat from 'concat';
import glob from 'glob-promise';
import path from 'path';
import gulp from 'gulp'
import fileFn from './atomic-func/file.js';
import getAppRoot from '../get-app-root.js';
import sass from 'sass';
import ejs from "ejs";
import fs from 'fs';
import data from '../project/render/assets/data.js';

ejs.delimiter = '?';
const allEJS = await glob(`**/project/source/main/ejs/*.ejs`)
if (allEJS) {
    for (let file of allEJS) {
        const extension = path.extname(file);
        const baseName = path.basename(file, extension);
        ejs.renderFile(file, data, null, function (err, str) {
            fs.writeFileSync(`${getAppRoot()}/project/render/${baseName}.html`, str);
        });
    }
}


const list_all_scss = await glob(`**/project/source/**/*.scss`)
const list_all_css = await glob(`**/project/source/**/*.css`)
const list_all_css_and_scss = list_all_scss.concat(list_all_css)
const all_css_and_scss = await concat(list_all_css_and_scss);
const converted_css = (sass.compileString(all_css_and_scss)).css;
fs.writeFileSync(`${getAppRoot()}/project/render/style.css`, converted_css)

const allJs = await glob(`**/project/source/**/*.js`)
concat(allJs, `${getAppRoot()}/project/render/script.js`);


