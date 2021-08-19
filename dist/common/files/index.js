'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.removeFile =
  exports.appendFile =
  exports.writeFile =
  exports.readFileAsText =
  exports.readFile =
  exports.createDirectory =
  exports.getFilesSync =
  exports.getFiles =
  exports.getDirectoriesSync =
  exports.getDirectories =
    void 0;
const tslib_1 = require('tslib');
const fs = tslib_1.__importStar(require('fs'));
const path = tslib_1.__importStar(require('path'));
/**
 * Get list directories into specified directory.
 * @param dir directory original
 */
function getDirectories(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, list) => {
      if (err) reject(err);
      else
        resolve(
          list.filter((item) =>
            fs.statSync(path.join(dir, item)).isDirectory(),
          ),
        );
    });
  });
}
exports.getDirectories = getDirectories;
/**
 * Get list directories synchronize into specified directory.
 * @param dir directory original
 */
function getDirectoriesSync(dir) {
  const list = fs.readdirSync(dir);
  return list.filter((item) => fs.statSync(path.join(dir, item)).isDirectory());
}
exports.getDirectoriesSync = getDirectoriesSync;
/**
 * Get list files into specified directory.
 * @param dir directory original
 */
function getFiles(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, list) => {
      if (err) reject(err);
      else
        resolve(
          list.filter(
            (item) => !fs.statSync(path.join(dir, item)).isDirectory(),
          ),
        );
    });
  });
}
exports.getFiles = getFiles;
/**
 * Get list files synchronize into specified directory.
 * @param dir directory original
 */
function getFilesSync(dir) {
  const list = fs.readdirSync(dir);
  return list.filter(
    (item) => !fs.statSync(path.join(dir, item)).isDirectory(),
  );
}
exports.getFilesSync = getFilesSync;
/**
 * Create directory into specified directory.
 * @param dir directory original
 */
function createDirectory(dir) {
  const splitPath = dir.split('/');
  if (splitPath.length > 20) throw new Error('The path is invalid!');
  splitPath.reduce((path, subPath) => {
    let currentPath;
    if (subPath !== '.') {
      currentPath = path + '/' + subPath;
      if (!fs.existsSync(currentPath)) fs.mkdirSync(currentPath);
    } else currentPath = subPath;
    return currentPath;
  }, '');
}
exports.createDirectory = createDirectory;
/**
 * Read a file to buffer data.
 * @param filePath File's path
 */
function readFile(filePath) {
  return new Promise((resolve, reject) => {
    if (!filePath || !filePath.trim())
      return reject(new Error('The path is required!'));
    fs.readFile(filePath, undefined, (error, content) => {
      if (error) return reject(error);
      resolve(content);
    });
  });
}
exports.readFile = readFile;
/**
 * Read a file to text content.
 * @param filePath File's path
 */
function readFileAsText(filePath, encoding = 'utf8') {
  return new Promise((resolve, reject) => {
    if (!filePath || !filePath.trim())
      return reject(new Error('The path is required!'));
    fs.readFile(filePath, { encoding }, (error, content) => {
      if (error) return reject(error);
      resolve(content);
    });
  });
}
exports.readFileAsText = readFileAsText;
/**
 * Write a file with a path and content.
 * @param filePath File's path
 * @param content buffer data or text content
 * @param encoding data encoding
 */
function writeFile(filePath, content, encoding) {
  return new Promise((resolve, reject) => {
    if (!filePath || !filePath.trim())
      return reject(new Error('The path is required!'));
    if (!content) return reject(new Error('The content is required!'));
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) this.createDirectory(dir);
    if (dir === filePath.trim())
      return reject(new Error('The path is invalid!'));
    fs.writeFile(filePath, content, { encoding }, (error) => {
      if (error) return reject(error);
      resolve();
    });
  });
}
exports.writeFile = writeFile;
/**
 * Append a file with a path and content.
 * @param filePath File's path
 * @param content buffer data or text content
 * @param encoding data encoding
 */
function appendFile(filePath, content, encoding) {
  return new Promise((resolve, reject) => {
    if (!filePath || !filePath.trim())
      return reject(new Error('The path is required!'));
    if (!content) return reject(new Error('The content is required!'));
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) this.createDirectory(dir);
    if (dir === filePath.trim())
      return reject(new Error('The path is invalid!'));
    fs.appendFile(filePath, content, { encoding }, (error) => {
      if (error) return reject(error);
      resolve();
    });
  });
}
exports.appendFile = appendFile;
/**
 * Remove a file with a path.
 * @param filePath File's path
 */
function removeFile(filePath) {
  return new Promise((resolve, reject) => {
    if (!filePath || !filePath.trim())
      return reject(new Error('The path is required!'));
    if (!fs.existsSync(filePath)) resolve();
    else {
      fs.unlink(filePath, (error) => {
        if (error) return reject(error);
        resolve();
      });
    }
  });
}
exports.removeFile = removeFile;
