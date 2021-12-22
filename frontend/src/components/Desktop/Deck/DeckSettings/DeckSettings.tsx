import { Tabs } from 'antd';
import FeatureFlag from 'components/Elements/Shared/FeatureFlag';
import Flex from 'components/Elements/Shared/Flex';
import { FEATURE_FLAG_TAG } from 'constants/featureFlags';
import React from 'react';
import { View } from '../Deck';

interface Props {
  view: View;
  setView: (view: View) => void;
}

export const DeckSettings = ({ view, setView }: Props) => {
  return (
    <FeatureFlag flag={FEATURE_FLAG_TAG}>
      <Flex>
        <Tabs activeKey={view} onChange={setView}>
          <Tabs.TabPane tab="Group by Type" key="type" />
          <Tabs.TabPane tab="Group by Tag" key="tags" />
        </Tabs>
      </Flex>
    </FeatureFlag>
  );
};
