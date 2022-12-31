const Dates = {
  convertTimestampToDateString: (timestamp) => {
    return new Date(timestamp).toDateString();
  },
  getTimeStamp: (dateString) => {
    return Date.parse(dateString);
  },
  isValidDate: (dateString) => {
    const timestamp = Dates.getTimeStamp(dateString);
    return !!timestamp;
  },
};

module.exports = Dates;
