import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Row, Col, Icon } from 'antd';
import CardContext from '../../../CardProvider/CardProvider';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 12px;
  flex-direction: column;
`;

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

const StyledAmount = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

export default ({ cards, onChangeSet, selectedCardId }) => {
  const { sets } = useContext(CardContext);
  const [isEditing, setIsEditing] = useState(false);
  const ownedCards = cards.filter(
    ({ amount, amountFoil }) => amount + amountFoil
  );

  return (
    <StyledWrapper>
      {ownedCards.map(
        ({ id, set, set_name, image_uris, amount, amountFoil }) => (
          <Row
            gutter={[12, 2]}
            key={id}
            onClick={isEditing ? undefined : () => onChangeSet(id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 6,
              backgroundColor: selectedCardId === id ? '#e4f0ff' : '',
            }}
          >
            <Col span={17} style={{ display: 'flex', alignItems: 'center' }}>
              <StyledCardPreview src={image_uris[0].small} />
              <StyledSetIcon src={sets[set].icon_svg_uri} />
              <StyledSetName>{set_name}</StyledSetName>
            </Col>
            <Col span={3}>
              {Boolean(amount) && <StyledAmount>{`${amount}x`}</StyledAmount>}
            </Col>
            <Col span={4}>
              {Boolean(amountFoil) && (
                <StyledAmount>
                  {`${amountFoil}x`}
                  <Icon
                    style={{ marginLeft: '4px' }}
                    type="star"
                    theme="twoTone"
                    twoToneColor="#d4af37"
                  />
                </StyledAmount>
              )}
            </Col>
          </Row>
        )
      )}
    </StyledWrapper>
  );
};
