/**
 * Replace params into the template.
 */
export function mapTemplate(template: string, ...params): string {
  return template.replace(/{(\d+)}/g, (match, number) => {
    return params[number] || match;
  });
}

/**
 * Replace data object into the template.
 */
export function mapTemplateWithDataObject(template: string, data): string {
  if (data) {
    Object.keys(data).forEach((key) => {
      template = template.replace(new RegExp(`{{${key}}}`, 'g'), data[key]);
    });
  }
  return template;
}

/**
 * Convert string to boolean.
 */
export function convertStringToBoolean(
  val: string | undefined | null,
  defaultValue = false,
): boolean {
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

/**
 * Convert object to string.
 */
export function convertObjectToString(val): string {
  if (val == null) return '';
  if (typeof val === 'string') return val;

  return JSON.stringify(val, undefined, '');
}
