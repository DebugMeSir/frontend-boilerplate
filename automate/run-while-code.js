import concat from "concat";
import glob from "glob-promise";
import path from "path";
import gulp from "gulp";
import fs from "fs";
import * as sass from "sass";
import ejs from "ejs";
import getAppRoot from "../get-app-root.js";
import data from "../project/rendered/assets/data.js";
import { writeFile } from "fs/promises";
 
import postcss from "postcss";
import tailwindcss from "tailwindcss";

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
// build tailwind

// 1. Read the input CSS file
const inputTailwind = fs.readFileSync(
    `${getAppRoot()}/tailwind.input.css`,
    "utf8"
);

// 2. Process it with Tailwind via PostCSS
postcss([tailwindcss()])
    .process(inputTailwind, {
        from: `${getAppRoot()}/tailwind.input.css`,
        to: `${getAppRoot()}/project/source/lib/tailwind.output.css`,
    })
    .then((result) => {
        // 3. Write output CSS
        fs.writeFileSync(
            `${getAppRoot()}/project/source/lib/tailwind.output.css`,
            result.css
        );
        console.log("✅ Tailwind CSS built successfully");
    })
    .catch((err) => {
        console.error("❌ Failed to compile Tailwind CSS:", err);
    });

// combine all pre-existed css (libs)

const allCssPath = await glob(`**/project/source/**/*.css`);
let allCss = "";
for (const file of allCssPath) {
    try {
        allCss += fs.readFileSync(file, "utf8") + "\n";
    } catch (err) {
        console.error(`Error reading ${file}:`, err);
    }
}

// Convert main.scss to css
const mainCss = sass.compile(
    `${getAppRoot()}/project/source/main/scss/main.scss`
);

// add those two

writeFile(`${renderedPath}/style.css`, allCss + mainCss.css);

// 3. Concatenate all JS files
const allJs = await glob(`**/project/source/**/*.js`);
await concat(allJs, `${renderedPath}/script.js`);
