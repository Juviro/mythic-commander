// controls wether the dropdown should be displayed above or below the input field
const getDropdownAlign = (displayAboveInput?: boolean) => {
    if (!displayAboveInput) return undefined;
  
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
  