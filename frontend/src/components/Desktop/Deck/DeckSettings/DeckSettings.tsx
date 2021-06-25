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
      <Tabs activeKey={view} onChange={setView}>
        <Tabs.TabPane tab="Group by Type" key="type" />
        <Tabs.TabPane tab="Group by Tag" key="tags" />
      </Tabs>
    </Flex>
  );
};
