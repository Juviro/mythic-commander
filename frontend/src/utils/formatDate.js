const options = { year: 'numeric', month: 'long', day: 'numeric' };
const shortOptions = { year: '2-digit', month: 'numeric', day: 'numeric' };

export default (dateString, isShort) => {
  const date = typeof dateString === 'string' ? Number(dateString) : dateString;
  return new Date(date).toLocaleDateString(
    'de-DE',
    isShort ? shortOptions : options
  );
};
