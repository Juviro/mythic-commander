export default (element: HTMLElement) => {
  if (!element) return;
  // @ts-ignore
  if (element.scrollIntoViewIfNeeded) {
    // @ts-ignore
    element.scrollIntoViewIfNeeded(false);
  } else if (element.scrollIntoView) {
    element.scrollIntoView(false);
  } else {
    console.warn('scrollIntoView not supported');
  }
};
