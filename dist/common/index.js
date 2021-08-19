'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.convertObjectToString =
  exports.convertStringToBoolean =
  exports.mapTemplateWithDataObject =
  exports.mapTemplate =
    void 0;
/**
 * Replace params into the template.
 */
function mapTemplate(template, ...params) {
  return template.replace(/{(\d+)}/g, (match, number) => {
    return params[number] || match;
  });
}
exports.mapTemplate = mapTemplate;
/**
 * Replace data object into the template.
 */
function mapTemplateWithDataObject(template, data) {
  if (data) {
    Object.keys(data).forEach((key) => {
      template = template.replace(new RegExp(`{{${key}}}`, 'g'), data[key]);
    });
  }
  return template;
}
exports.mapTemplateWithDataObject = mapTemplateWithDataObject;
/**
 * Convert string to boolean.
 */
function convertStringToBoolean(val, defaultValue = false) {
  if (!val) return defaultValue;
  switch (val.toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'no':
    case '0':
      return false;
    default:
      return defaultValue;
  }
}
exports.convertStringToBoolean = convertStringToBoolean;
/**
 * Convert object to string.
 */
function convertObjectToString(val) {
  if (val == null) return '';
  if (typeof val === 'string') return val;
  return JSON.stringify(val, undefined, '');
}
exports.convertObjectToString = convertObjectToString;
