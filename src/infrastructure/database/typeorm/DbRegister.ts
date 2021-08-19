import './DbContext';
import * as path from 'path';
import { getFilesSync, getDirectoriesSync } from '../../../common/files';

const folder = path.join(__dirname, './repositories');
getFilesSync(folder).forEach((file) => require(`${folder}/${file}`));

getDirectoriesSync(folder).forEach((childFolder) => {
  getFilesSync(`${folder}/${childFolder}`).forEach((file) =>
    require(`${folder}/${childFolder}/${file}`),
  );
});
