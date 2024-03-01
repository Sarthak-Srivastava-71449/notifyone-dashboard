const convertDateTime = (timestamp: any, yearMonthDateFlag: any) => {
  function formatDateLL(date: Date) {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }
  function formatDateYear(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const today = new Date(timestamp * 1000);
  const formattedDate = formatDateLL(today);
  const yearMonthDateFormat = formatDateYear(today);
  return yearMonthDateFlag ? yearMonthDateFormat : `${formattedDate}`;
};

const convertEpochToDateTime = (timeStamp: any) => {
  if (!timeStamp) {
    return '';
  }
  const seconds = timeStamp;
  const createDate = new Date(seconds * 1000);
  const month = createDate.toLocaleString('default', { month: 'long' });
  const year = createDate.getFullYear();
  const day = createDate.getDate();
  const getDateWithSuffix = (day: any) => {
    const lastDigit = parseInt(day) % 10;
    let suffix = 'th';
    if (lastDigit === 1 && (day < 10 || day > 20)) {
      suffix = 'st';
    } else if (lastDigit === 2 && (day < 10 || day > 20)) {
      suffix = 'nd';
    } else if (lastDigit === 3 && (day < 10 || day > 20)) {
      suffix = 'rd';
    }
    return `${day}${suffix}`;
  };
  let hours = createDate.getHours(); // gives the value in 24 hours format
  const AmOrPm = hours >= 12 ? 'PM' : 'AM';
  // eslint-disable-next-line prettier/prettier
  hours = hours % 12 || 12;
  const minutes = createDate.getMinutes();
  const finalTime = `${hours >= 10 ? hours : `0${hours}`}:${
    minutes < 10 ? `0${minutes}` : minutes
  } ${AmOrPm}`;
  return `${getDateWithSuffix(day)} ${month} ${year}, ${finalTime}`;
};

const convertToEpochDate = (timeStamp: any) => {
  const seconds = timeStamp;
  const createDate = new Date(seconds * 1000);
  const month = createDate.toLocaleString('default', { month: 'long' });
  const year = createDate.getFullYear();
  const day = createDate.getDate();
  return `${day}th ${month} ${year}`;
};

const getLocalDate = (date: Date) => {
  return date.toLocaleDateString('en-US'); // mm/dd/yyyy format
};

export default {
  convertDateTime,
  convertEpochToDateTime,
  convertToEpochDate,
  getLocalDate,
};
