import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';

import { Col, Row, Divider } from 'antd';
import {
  FlippableCard,
  IncludedDecks,
  IncludedWants,
  CardLegal,
  CardRules,
  CardLinks,
} from '../../Shared';
import { cardDetailsDesktop } from './queries';
import CardSets from './CardSets';

const StyledBottomWrapper = styled.div`
  display: flex;
  height: 200px;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
  overflow: auto;
  margin-bottom: 16px;
`;

const StyledCardImage = styled.div`
  display: flex;
  height: 490px;
  width: 350px;
  max-width: 30vw;
  max-height: 41.8vw;
`;

const CenteredCol = styled(Col)`
  height: 100%;
  display: flex;
  justify-content: center;
`;

export default ({ card }) => {
  const cardId = card.id;
  const [selectedCardId, setSelectedCardId] = useState(cardId);
  const { data, loading } = useQuery(cardDetailsDesktop, {
    variables: { oracle_id: card.oracle_id },
  });

  const usedCard = loading
    ? card
    : {
        ...data.cardByOracleId,
        ...data.cardByOracleId.oracleCard,
        ...data.cardByOracleId.oracleCard.allSets.find(
          ({ id }) => id === selectedCardId
        ),
      };

  useEffect(() => {
    setSelectedCardId(cardId);
  }, [cardId]);

  const { name, totalAmount } = card || {};
  let title = name;
  if (totalAmount) title += ` (${totalAmount} collected)`;

  return (
    <>
      <Row style={{ width: '100%', maxHeight: 490 }}>
        <CenteredCol span={8}>
          <StyledCardImage>
            <FlippableCard card={usedCard} />
          </StyledCardImage>
        </CenteredCol>
        <CenteredCol
          span={16}
          style={{ padding: '0 24px', flexDirection: 'row' }}
        >
          <CardSets
            card={usedCard}
            loading={loading}
            title={title}
            selectedCardId={selectedCardId}
            onChangeSet={setSelectedCardId}
          />
        </CenteredCol>
      </Row>
      <Row style={{ width: '100%' }}>
        <Col span={12}>
          <Divider>Decks</Divider>
          <StyledBottomWrapper>
            <IncludedDecks card={usedCard} large />
          </StyledBottomWrapper>
        </Col>
        <Col span={12}>
          <Divider>Wants Lists</Divider>
          <StyledBottomWrapper>
            <IncludedWants
              card={usedCard}
              large
              cardId={data && data.cardByOracleId.id}
            />
          </StyledBottomWrapper>
        </Col>
      </Row>
      <Row style={{ width: '100%', height: 50 }}>
        <CenteredCol span={8} style={{ padding: '0 8px' }}>
          <CardLegal card={usedCard} loading={loading} />
        </CenteredCol>
        <CenteredCol span={8} style={{ padding: '0 8px' }}>
          <CardLinks card={usedCard} loading={loading} />
        </CenteredCol>
        <CenteredCol span={8} style={{ padding: '0 8px' }}>
          <CardRules card={usedCard} loading={loading} />
        </CenteredCol>
      </Row>
    </>
  );
};
