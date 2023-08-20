const options = { year: 'numeric', month: 'long', day: '2-digit' };
const shortOptions = { year: '2-digit', month: '2-digit', day: '2-digit' };

const formatDate = (dateString, isShort) => {
  let date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    date = new Date(Number(dateString));
  }
  return new Date(date).toLocaleDateString('de-DE', isShort ? shortOptions : options);
};

export default formatDate;
