import React from 'react';
import { Argument, Command, getArguments } from './commandUtils';

interface Props {
  command: Command;
  inputValue: string;
}

const HighlightedCommand = ({ inputValue, command }: Props) => {
  const { label, args = [], description } = command;
  const [_, ...typedArgs] = inputValue.trim().toLowerCase().split(' ');

  const getArgsString = (remainingArgs: Argument[]) => {
    const argString = remainingArgs.map((arg) => `<${arg.label}>`).join(' ');

    return ` ${argString}`;
  };

  if (!typedArgs.length) {
    const commandSubstring = label.substring(0, inputValue.length);
    const remainingCommand = label.substring(inputValue.length);
    const argsString = getArgsString(args);

    let rest = `${remainingCommand}${argsString}`;
    const descriptionString = description?.({}) ?? '';
    if (descriptionString) {
      rest += ` - ${descriptionString}`;
    }

    return (
      <div>
        <b>{commandSubstring}</b>
        <i>{rest}</i>
      </div>
    );
  }

  const remainingArgs = args.slice(typedArgs.length);
  let remainingArgsString = getArgsString(remainingArgs);
  const descriptionString = description?.(getArguments(typedArgs, args)) ?? '';
  if (descriptionString) {
    remainingArgsString += ` - ${descriptionString}`;
  }

  return (
    <div>
      <b>{inputValue}</b>
      <i>{remainingArgsString}</i>
    </div>
  );
};

export default HighlightedCommand;
