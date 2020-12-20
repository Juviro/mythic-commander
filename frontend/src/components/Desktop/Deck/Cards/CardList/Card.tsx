import { List } from 'antd';
import { PreviewCardImage } from 'components/Elements/Shared';
import React from 'react';
import { UnifiedDeckCard } from 'types/unifiedTypes';

interface Props {
  card: UnifiedDeckCard;
}

export default ({ card }: Props) => {
  return (
    <List.Item style={{ padding: '2px 0' }}>
      <List.Item.Meta
        style={{ overflow: 'hidden' }}
        title={card.name}
        avatar={<PreviewCardImage card={card} highlightOnHover />}
      />
    </List.Item>
  );
};
