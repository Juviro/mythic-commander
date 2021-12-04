const getDropdownAlign = (alignTop?: boolean) => {
  if (!alignTop) return undefined;

  return {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 0,
    },
  };
};

export default getDropdownAlign;
