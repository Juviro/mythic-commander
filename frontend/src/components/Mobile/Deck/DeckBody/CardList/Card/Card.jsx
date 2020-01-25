import React, { useState } from 'react';
import { List, Typography, Modal } from 'antd';
import styled from 'styled-components';

import { isCardLegal } from '../../../../../../utils/cardStats';

const StyledListItem = styled(List.Item)`
  padding: 2px 4px;
  margin: 2px 4px;
  border-radius: 4px;
`;

const StyledItemWrapper = styled.div`
  width: 100%;
  ${({ isLegal }) => (!isLegal ? 'background-color: #ffcfcf;' : '')}
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
`;

const StyledCardWrapper = styled.div`
  display: flex;
  width: 100%;
  line-height: 36px;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledCardNameWrapper = styled.div`
  left: 46px;
  font-size: 14;
  position: absolute;
  transition: all 0.2s;
  width: calc(100% - 90px);
  ${({ isOpen }) => (isOpen ? 'left: 12px' : '')}
`;

const StyledCard = styled.img`
  height: 36px;
  width: 26px;
  transition: all 0.2s;

  ${({ isLarge }) => {
    if (!isLarge) return '';
    return `
      height: 252px;
      width: 182px;
      margin-top: 32px;
    `;
  }}
`;

const StyledFullscreenCard = styled.img`
  width: 100%;
  border-radius: 16px;
`;

const CardImage = ({ card, isOpen }) => {
  const [cardPreviewOpen, setCardPreviewOpen] = useState(false);
  const images = card.image_uris ? [card.image_uris] : card.card_faces.map(({ image_uris }) => image_uris);

  const onChangeIsOpen = previewVisible => event => {
    event.stopPropagation();
    setCardPreviewOpen(previewVisible);
  };

  return (
    <>
      <StyledCard src={images[0].normal} isLarge={isOpen} onClick={onChangeIsOpen(true)} />
      <Modal
        footer={null}
        closeIcon={<div />}
        visible={cardPreviewOpen}
        bodyStyle={{ padding: 1, backgroundColor: '#17140f' }}
        onCancel={onChangeIsOpen(false)}
      >
        <StyledFullscreenCard src={images[0].normal} onClick={onChangeIsOpen(false)} />
      </Modal>
    </>
  );
};

export default ({ card, commander, setOpenCardId, isOpen }) => {
  const toggleIsOpen = () => setOpenCardId(isOpen ? null : card.id);

  return (
    <StyledListItem>
      <StyledItemWrapper isLegal={isCardLegal(card, commander)} onClick={toggleIsOpen}>
        <StyledCardWrapper>
          <Left>
            <CardImage card={card} isOpen={isOpen} />
            <StyledCardNameWrapper isOpen={isOpen}>
              <Typography.Text ellipsis>{card.name}</Typography.Text>
            </StyledCardNameWrapper>
          </Left>
          {card.amount > 1 && <span>{`${card.amount}x`}</span>}
        </StyledCardWrapper>
      </StyledItemWrapper>
    </StyledListItem>
  );
};
