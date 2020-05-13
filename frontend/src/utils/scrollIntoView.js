export default element => {
  if (!element) return;
  if (element.scrollIntoViewIfNeeded) {
    element.scrollIntoViewIfNeeded(false);
  } else if (element.scrollIntoView) {
    element.scrollIntoView(false);
  } else {
    console.warn('scrollIntoView not supported');
  }
};
