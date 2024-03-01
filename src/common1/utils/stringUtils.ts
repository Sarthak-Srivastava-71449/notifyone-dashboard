//Used for capitalize first letter
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

//Used for capitalize first letter in an array
const convertArrToName = (items: string[]) => {
  const arr: string[] = [];
  items.map((item: string) => {
    if (item.includes('_')) {
      const foo = item
        .split('_')
        .map((item) => capitalizeFirstLetter(item))
        .join(' ');
      arr.push(foo);
    } else {
      arr.push(capitalizeFirstLetter(item));
    }
  });
  return arr.join(', ');
};

//Used to convert readable status to values like appending '_' in multi word status
const convertFieldName = (el: string) => {
  if (el.includes('_')) {
    return el
      .split('_')
      .map((item) => capitalizeFirstLetter(item))
      .join(' ');
  }
  return capitalizeFirstLetter(el);
};

//used for comapring string for sorting
const compareStrings = (a: string, b: string) => {
  // case-insensitive comparison
  a = a.toLowerCase();
  b = b.toLowerCase();
  return a < b ? -1 : a > b ? 1 : 0;
};

export default {
  capitalizeFirstLetter,
  convertArrToName,
  convertFieldName,
  compareStrings,
};
