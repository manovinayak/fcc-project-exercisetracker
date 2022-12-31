const Dates = {
  convertTimestampToDateString: (timestamp) => {
    return new Date(timestamp).toDateString();
  },
  getTimeStamp: (paramDate) => {
    return Date.parse(paramDate);
  },
  isValidDate: (date) => {
    const timestamp = Dates.getTimeStamp(date);
    return !!timestamp;
  },
};

module.exports = Dates;
