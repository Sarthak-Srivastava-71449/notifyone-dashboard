export const debounce = (callback: any, duration = 500) => {
  let timer: NodeJS.Timeout;
  return (value: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => callback(value), duration);
  };
};
