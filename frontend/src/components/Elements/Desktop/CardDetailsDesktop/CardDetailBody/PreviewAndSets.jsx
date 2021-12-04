import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import Card from 'components/Elements/Shared/Card';
import CardSets from './CardSets';

const StyledCardImage = styled.div`
  display: flex;
  height: 490px;
  width: 350px;
  max-width: 30vw;
  max-height: 41.8vw;
`;

export default ({
  card,
  loading,
  selectedCardId,
  setSelectedCardId,
  showTitle,
  toggleIsFlipped,
  parentLoading,
}) => {
  return (
    <Row style={{ width: '100%', maxHeight: 490 }}>
      <Col span={8}>
        <StyledCardImage>
          <Card
            card={card}
            loading={parentLoading || (loading && !card?.imgKey)}
            onFlipCard={toggleIsFlipped}
          />
        </StyledCardImage>
      </Col>
      <Col span={16} style={{ padding: '0 24px', flexDirection: 'row' }}>
        <CardSets
          showTitle={showTitle}
          card={card}
          loading={loading}
          parentLoading={parentLoading}
          selectedCardId={selectedCardId}
          onChangeSet={setSelectedCardId}
        />
      </Col>
    </Row>
  );
};
