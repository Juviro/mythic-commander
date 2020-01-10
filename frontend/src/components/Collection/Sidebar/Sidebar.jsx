import React from 'react';
import styled from 'styled-components';
import { Affix } from 'antd';
import CardPreview from '../../Elements/CardView/Table/RowElements/CardPreview';

const StyledCardPreview = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
`;

export default ({ highlightedCard, onHideCard = () => {} }) => {
  if (!highlightedCard) return <StyledCardPreview />;

  return (
    <Affix offsetTop={10}>
      <StyledCardPreview onClick={onHideCard}>
        <CardPreview highlightedCard={highlightedCard} />
      </StyledCardPreview>
    </Affix>
  );
};
