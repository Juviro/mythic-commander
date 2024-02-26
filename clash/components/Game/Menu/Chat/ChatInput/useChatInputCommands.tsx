import { useState } from 'react';
import useGameActions from 'components/Game/useGameActions';
import { ChatCommandPayload } from 'backend/constants/wsEvents';
import HighlightedCommand from './HighlightedCommand';
import { Command, getArguments } from './commandUtils';

const COMMANDS: Command[] = [
  {
    label: '/roll',
    args: [
      {
        label: 'number of dice',
        key: 'numberOfDice',
        type: 'number',
        default: '1',
      },
      {
        label: 'sides',
        key: 'sides',
        type: 'number',
        default: '6',
      },
    ],
    description: ({ numberOfDice, sides }) => {
      if (!sides) return 'Roll one or more dice';
      return `Roll ${numberOfDice || 1} d${sides}`;
    },
  },
  {
    label: '/flip',
    args: [
      {
        label: 'number of coins',
        key: 'numberOfCoins',
        type: 'number',
        default: '1',
      },
    ],
    description: ({ numberOfCoins }) => {
      if (!numberOfCoins) return 'Flip a coin';
      return `Flip ${numberOfCoins || 1} coins`;
    },
  },
];

const useChatInputCommands = () => {
  const { onSendChatMessage } = useGameActions();
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const { onExecuteCommand } = useGameActions();

  const onSubmitCommand = () => {
    const [command, ...typedArgs] = inputValue.trim().toLowerCase().split(' ');
    const commandObject = COMMANDS.find(({ label }) => label === command);
    if (!commandObject) {
      setError('Command not found');
      return;
    }
    const passedArgs = getArguments(typedArgs, commandObject.args || []);

    const newError = commandObject.args?.reduce((acc, arg) => {
      if (!arg.type || !passedArgs[arg.key]) return acc;
      if (arg.type === 'number' && Number.isNaN(Number(passedArgs[arg.key]))) {
        return `"${arg.label}" must be a number`;
      }
      return acc;
    }, '');

    if (newError) {
      setError(newError);
      return;
    }

    onExecuteCommand({
      command: command.replace('/', ''),
      args: passedArgs,
    } as unknown as ChatCommandPayload);

    setInputValue('');
  };

  const onSubmit = () => {
    if (!inputValue) return;

    if (inputValue.startsWith('/')) {
      onSubmitCommand();
      return;
    }

    setInputValue('');
    onSendChatMessage({ message: inputValue });
  };

  const displayCommands = COMMANDS.filter(({ label }) => {
    if (!inputValue) return false;
    return label.startsWith(inputValue) || inputValue.startsWith(label);
  });

  const options = displayCommands.map((command) => ({
    label: <HighlightedCommand inputValue={inputValue} command={command} />,
    value: command.label,
  }));

  const onSelect = (value: string) => {
    if (inputValue.startsWith(value)) {
      onSubmit();
      return;
    }
    setInputValue(`${value} `);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      return;
    }
    if (options.length) {
      return;
    }
    if (e.key === 'ArrowUp' && !inputValue) {
      setInputValue('/');
      return;
    }

    if (e.key !== 'Enter') return;
    e.preventDefault();
    onSubmit();
  };

  const onChange = (value: string) => {
    setInputValue(value);
    setError('');
  };

  return { error, options, onKeyDown, inputValue, onChange, onSelect };
};

export default useChatInputCommands;
