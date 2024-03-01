/*
 * Regular Expression to get all predefined variables including curly braces
 * Ex: {{OLD_PINCODE}}
 */
export const regExp = /\{{([^}}]+)\}}/g;
