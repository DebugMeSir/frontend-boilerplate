import concat from "concat";
import glob from "glob-promise";
import path from "path";
import gulp from "gulp";
import fs from "fs";
import sass from "sass";
import ejs from "ejs";

import getAppRoot from "../get-app-root.js";
import data from "../project/rendered/assets/data.js";

ejs.delimiter = "?";

const renderedPath = `${getAppRoot()}/project/rendered`;
fs.mkdirSync(renderedPath, { recursive: true });

// 1. Render EJS files to HTML
const allEJS = await glob(`**/project/source/main/ejs/*.ejs`);
if (allEJS.length > 0) {
    for (let file of allEJS) {
        const extension = path.extname(file);
        const baseName = path.basename(file, extension);
        ejs.renderFile(file, data, {}, function (err, str) {
            if (err) {
                console.error(`Error rendering ${file}:`, err);
                return;
            }
            fs.writeFileSync(`${renderedPath}/${baseName}.html`, str);
        });
    }
}

// 2. Compile SCSS + CSS into one style.css
const list_all_scss = await glob(`**/project/source/**/*.scss`);
const list_all_css = await glob(`**/project/source/**/*.css`);
const list_all_css_and_scss = list_all_scss.concat(list_all_css);

let combinedStyles = "";
for (const file of list_all_css_and_scss) {
    try {
        combinedStyles += fs.readFileSync(file, "utf8") + "\n";
    } catch (err) {
        console.error(`Error reading ${file}:`, err);
    }
}

try {
    const compiled = sass.compileString(combinedStyles);
    fs.writeFileSync(`${renderedPath}/style.css`, compiled.css);
} catch (err) {
    console.error("Error compiling SCSS:", err);
}

// 3. Concatenate all JS files
const allJs = await glob(`**/project/source/**/*.js`);
await concat(allJs, `${renderedPath}/script.js`);
