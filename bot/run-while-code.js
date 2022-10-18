import path from 'path';

import fileFn from './atomic-func/file.js';
import getAppRoot from '../get-app-root.js';
import sass from 'sass';
import ejs from "ejs";
import fs from 'fs';
import data from '../project/render/assets/data.js';

ejs.delimiter = '?';
const files = fileFn.listFilesInManyFolders([`${getAppRoot()}/project/source/ejs`]);
if (files) {
    for (let file of files) {
        const extension = path.extname(file);
        const baseName = path.basename(file, extension);
        ejs.renderFile(file, data, null, function (err, str) {
            fs.writeFileSync(`${getAppRoot()}/project/render/${baseName}.html`, str);
        });



    }

}


fileFn.concatAllInFolders({
    foldersArr: [`${getAppRoot()}/project/source/css`],
    inputFileExt: `scss`,
    outputFile: `${getAppRoot()}/bot/temp-files/user.scss`
})
const userCss = (sass.compile(`${getAppRoot()}/bot/temp-files/user.scss`)).css;
fs.writeFileSync(`${getAppRoot()}/bot/temp-files/user.css`, userCss)

const lib_and_user_css = fileFn.concatAllInFolders({
    foldersArr: [`${getAppRoot()}/bot/temp-files`],
    inputFileExt: `css`,
    outputFile: `${getAppRoot()}/project/render/style.css`
})

const allJs = fileFn.concatAllInFolders({
    foldersArr: [`${getAppRoot()}/project/source/js`],
    inputFileExt: `js`,
    outputFile: `${getAppRoot()}/project/render/script.js`
})
