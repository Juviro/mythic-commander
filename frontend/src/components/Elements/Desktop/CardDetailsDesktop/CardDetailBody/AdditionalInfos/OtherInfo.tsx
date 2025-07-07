import React from 'react';
import { Divider, Typography } from 'antd';

import { UnifiedCard } from 'types/unifiedTypes';
import CardRules from 'components/Elements/Shared/CardRules';
import CardLegal from 'components/Elements/Shared/CardLegal';
import Flex from 'components/Elements/Shared/Flex';
import { InfoCircleOutlined } from '@ant-design/icons';

interface OtherInfoProps {
  card: UnifiedCard;
  loading: boolean;
}

const OtherInfo = ({ card, loading }: OtherInfoProps) => {
  return (
    <>
      <Divider>Card Info</Divider>
      <Flex direction="column" gap={16} style={{ width: '100%' }}>
        <CardLegal card={card} loading={loading} />
        {card?.reserved && (
          <div style={{ color: 'orange' }}>
            <InfoCircleOutlined />
            <Typography.Text style={{ marginLeft: 8 }}>
              This card is part of the <b>Reserved List</b>
            </Typography.Text>
          </div>
        )}
        {card?.game_changer && (
          <div style={{ color: 'orange' }}>
            <InfoCircleOutlined />
            <Typography.Text style={{ marginLeft: 8 }}>
              This card is a <b>Game Changer</b>
            </Typography.Text>
          </div>
        )}
        <CardRules card={card} loading={loading} />
      </Flex>
    </>
  );
};

export default OtherInfo;
