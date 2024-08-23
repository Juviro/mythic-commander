import React from 'react';

import GuideDataTable from './GuideDataTable';

const COMMANDS = [
  {
    label: 'Roll a dice',
    value: '/roll [number of dice] [number of sides]',
  },
  {
    label: 'Flip a coin',
    value: '/flip [number of coins]',
  },
];

const GuideCommands = () => {
  return (
    <GuideDataTable
      items={COMMANDS}
      title="Chat Commands"
      // eslint-disable-next-line max-len
      description='You can execute a command in the chat by typing "/" followed by the command.'
    />
  );
};

export default GuideCommands;
