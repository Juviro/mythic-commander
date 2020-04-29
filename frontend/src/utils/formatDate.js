const options = { year: 'numeric', month: 'long', day: '2-digit' };
const shortOptions = { year: '2-digit', month: '2-digit', day: '2-digit' };

export default (dateString, isShort) => {
  const date = typeof dateString === 'string' ? Number(dateString) : dateString;
  return new Date(date).toLocaleDateString(
    'de-DE',
    isShort ? shortOptions : options
  );
};
