import React, { useContext } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';

import CardContext from '../../../Provider/CardProvider';
import Amount from './Amount';
import { getImageUrl } from '../../../../utils/cardImage';

const StyledSetIcon = styled.img`
  height: auto;
  width: 20px;
  margin: 0 8px;
`;

const StyledCardPreview = styled.img`
  height: 36px;
  width: auto;
`;

const StyledSetName = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default ({ card, selectedCardId, isEditing, onChangeSet, onChangeAmount }) => {
  const { sets } = useContext(CardContext);
  const { id, set, set_name, imgKey, amountOwned, amountOwnedFoil } = card;
  return (
    <Row
      gutter={[12, 2]}
      onClick={() => onChangeSet(id)}
      style={{
        marginBottom: 6,
        display: 'flex',
        padding: '2px 0',
        alignItems: 'center',
        backgroundColor: selectedCardId === id ? '#e4f0ff' : '',
      }}
    >
      <Col span={isEditing ? 11 : 16} style={{ display: 'flex', alignItems: 'center' }}>
        <StyledCardPreview src={getImageUrl(id, imgKey)} />
        <StyledSetIcon src={sets[set].icon_svg_uri} />
        <StyledSetName>{set_name}</StyledSetName>
      </Col>
      <Amount
        cardId={id}
        amount={amountOwned}
        isEditing={isEditing}
        onChangeAmount={onChangeAmount}
      />
      <Amount
        isFoil
        cardId={id}
        amount={amountOwnedFoil}
        onChangeAmount={onChangeAmount}
        isEditing={isEditing}
      />
    </Row>
  );
};
