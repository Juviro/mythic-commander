const randomId = () => {
  const getRandomString = () =>
    Math.random()
      .toString(36)
      .substr(2, 9);

  return `${getRandomString()}-${getRandomString()}-${getRandomString()}-${getRandomString()}`;
};
export default randomId;
