import postcss from 'postcss';
import getAppRoot from '../get-app-root.js';
import fs from 'fs';
import autoprefixer from 'autoprefixer';
import purgecss from '@fullhuman/postcss-purgecss';

const lib_and_user_css = fs.readFileSync(`${getAppRoot()}/project/render/style.css`, { encoding: 'utf-8' });
const after_purge = (await postcss([
    purgecss({
        content: [`**/project/render/**/*.html`]
    })
]).process(lib_and_user_css, { from: undefined })).css;


const after_prefix = await postcss([autoprefixer()]).process(after_purge, { from: undefined });
fs.writeFileSync(`${getAppRoot()}/project/render/style.css`, after_prefix.css)

