export const formattedDate = (date) => {
  const today = new Date(date);
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = String(today.getFullYear()).substring(2);

  return `${month}/${day}/${year}`;
};

export const todayOrYesterday = (date) => {
  const today = new Date();
  const otherDt = new Date(date);
  if (
    otherDt.getMonth() === today.getMonth() &&
    otherDt.getFullYear() === today.getFullYear()
  ) {
    if (otherDt.getDate() === today.getDate()) {
      return 'Today';
    } else if (otherDt.getDate() + 1 === today.getDate()) {
      return 'Yesterday';
    }
  } else {
    return false;
  }
};

export const ampmDt = (date) => {
  return new Date(date)
    .toLocaleTimeString()
    .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3');
};
