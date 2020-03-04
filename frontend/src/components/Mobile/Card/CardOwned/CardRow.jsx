import React, { useContext } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import CardContext from '../../../CardProvider/CardProvider';
import Amount from './Amount';

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

export default ({
  card,
  selectedCardId,
  isEditing,
  onChangeSet,
  onChangeAmount,
}) => {
  const { sets } = useContext(CardContext);
  const { id, set, set_name, image_uris, amount, amountFoil } = card;
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
      <Col
        span={isEditing ? 11 : 16}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <StyledCardPreview src={image_uris[0].small} />
        <StyledSetIcon src={sets[set].icon_svg_uri} />
        <StyledSetName>{set_name}</StyledSetName>
      </Col>
      <Amount
        cardId={id}
        amount={amount}
        isEditing={isEditing}
        onChangeAmount={onChangeAmount}
      />
      <Amount
        isFoil
        cardId={id}
        amount={amountFoil}
        onChangeAmount={onChangeAmount}
        isEditing={isEditing}
      />
    </Row>
  );
};
