export const addGenetiveSuffix = (name: string) => {
  if (name.endsWith('s')) {
    return `${name}'`;
  }
  return `${name}'s`;
};
