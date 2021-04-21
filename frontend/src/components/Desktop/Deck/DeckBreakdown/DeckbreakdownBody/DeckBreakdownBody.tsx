import { Space, Typography } from 'antd';
import { Flex, ValueLabel } from 'components/Elements/Shared';
import React from 'react';
import { UnifiedDeck } from 'types/unifiedTypes';

interface Props {
  deck: UnifiedDeck;
}

export const DeckBreakdownBody = ({ deck }: Props) => {
  return (
    <Flex>
      <Space>
        <Typography.Text strong style={{ fontSize: 16 }}>
          Estimated Value:
        </Typography.Text>
        <ValueLabel list={deck} />
      </Space>
    </Flex>
  );
};
