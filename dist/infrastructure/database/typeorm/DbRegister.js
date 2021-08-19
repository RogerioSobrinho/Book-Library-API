'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
require('./DbContext');
const path = tslib_1.__importStar(require('path'));
const files_1 = require('../../../common/files');
const folder = path.join(__dirname, './repositories');
files_1.getFilesSync(folder).forEach((file) => require(`${folder}/${file}`));
files_1.getDirectoriesSync(folder).forEach((childFolder) => {
  files_1
    .getFilesSync(`${folder}/${childFolder}`)
    .forEach((file) => require(`${folder}/${childFolder}/${file}`));
});
