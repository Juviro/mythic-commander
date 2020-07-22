import React from 'react';
import { Skeleton, List, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { PreviewCardImage, Flex } from '../../../Shared';

export default ({ card, loading }) => {
  if (loading) return <Skeleton />;
  if (!card.relatedCards)
    return <Typography.Text type="secondary">No related cards found</Typography.Text>;

  const relatedCards = card.relatedCards.filter(
    ({ oracle_id }) => oracle_id !== card.oracle_id
  );

  return (
    <List size="small" style={{ width: '100%' }}>
      {relatedCards.map(relatedCard => (
        <List.Item key={relatedCard.id}>
          <Link to={`/cards/${relatedCard.oracle_id}`}>
            <Flex direction="row" align="flex-start">
              <Space>
                <PreviewCardImage card={relatedCard} highlightOnHover />
                {relatedCard.name}
              </Space>
            </Flex>
          </Link>
        </List.Item>
      ))}
    </List>
  );
};
