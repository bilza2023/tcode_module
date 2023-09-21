const date = new Date('2023-06-20T22:54:20.378Z');
const options = {
  timeZone: 'Asia/Karachi',
  hour12: false,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
};
const formattedDate = date.toLocaleString('en-PK', options);
console.log(formattedDate);
