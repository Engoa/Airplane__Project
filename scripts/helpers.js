const getLS = (key) => JSON.parse(localStorage.getItem(key));
const setLS = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const unix = (timestamp, format) => dayjs.unix(timestamp).format(format);
