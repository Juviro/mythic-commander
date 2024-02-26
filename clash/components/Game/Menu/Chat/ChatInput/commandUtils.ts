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

export const getArguments = (
  typedArgs: string[],
  allArguments: Argument[]
): { [key: string]: string } => {
  return allArguments.reduce((acc, arg, index) => {
    const value = arg.type === 'number' ? Number(typedArgs[index]) : typedArgs[index];
    return { ...acc, [arg.key]: value || arg.default };
  }, {});
};
