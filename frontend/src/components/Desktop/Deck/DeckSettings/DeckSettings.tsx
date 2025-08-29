import { Tabs } from 'antd';
import Flex from 'components/Elements/Shared/Flex';
import React from 'react';
import { View } from '../Deck';

interface Props {
  view: View;
  setView: (view: View) => void;
}

export const DeckSettings = ({ view, setView }: Props) => {
  return (
    <Flex>
      <Tabs
        activeKey={view}
        onChange={setView}
        items={[
          {
            key: 'type',
            label: 'Group by Type',
          },
          {
            key: 'tags',
            label: 'Group by Tag',
          },
          {
            key: 'color',
            label: 'Group by Color',
          },
        ]}
      />
    </Flex>
  );
};
