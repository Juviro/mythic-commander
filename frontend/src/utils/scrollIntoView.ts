export default (element: HTMLElement, options?: ScrollIntoViewOptions) => {
  if (!element) return;
  // @ts-ignore
  if (element.scrollIntoViewIfNeeded) {
    // @ts-ignore
    element.scrollIntoViewIfNeeded({ block: 'start', inline: 'nearest', ...options });
  } else if (element.scrollIntoView) {
    element.scrollIntoView({ block: 'start', inline: 'nearest', ...options });
  } else {
    console.warn('scrollIntoView not supported');
  }
};
