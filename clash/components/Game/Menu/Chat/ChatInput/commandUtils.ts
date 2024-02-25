export interface Argument {
  label: string;
  key: string;
  type: string;
  default?: string;
}

export interface Command {
  label: string;
  args?: Argument[];
  description?: (args: { [key: string]: string }) => string;
}

// This will only work if there is max 1 optional argument.
// Because there are no plans to add more than 1 optional argument, this is fine for now
export const getArguments = (
  typedArgs: string[],
  allArguments: Argument[]
): { [key: string]: string } => {
  return allArguments.reduce((acc, arg, index) => {
    const value = arg.type === 'number' ? Number(typedArgs[index]) : typedArgs[index];
    return { ...acc, [arg.key]: value ?? arg.default };
  }, {});
};
