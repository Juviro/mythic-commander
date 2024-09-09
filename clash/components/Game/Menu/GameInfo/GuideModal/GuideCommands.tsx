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
      smallLabels
      title="Chat Commands"
      description={
        <div>
          <div>
            You can execute a command in the chat by typing &quot;/&quot; followed by the
            command.
          </div>
          <div>Values in square brackets are optional parameters.</div>
        </div>
      }
    />
  );
};

export default GuideCommands;
