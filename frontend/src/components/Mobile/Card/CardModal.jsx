import React, { useEffect, useLayoutEffect } from 'react';
import { Modal } from 'antd';
import { debounce } from 'lodash';

import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

import CardButton from '../../Elements/Shared/CardButton';
import CardSlide from './CardSlide';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow: auto;
  scroll-snap-type: x mandatory;
`;

const CardModal = ({
  detailedCardId,
  setDetailCard,
  onClose,
  cards,
  zoomedCardId,
  setZoomedCard,
}) => {
  const currentCardRef = React.createRef();

  useEffect(() => {
    window.onpopstate = onClose;

    return () => {
      window.onpopstate = null;
    };
  }, []);

  const displayedCardId = detailedCardId || zoomedCardId;

  const isDetailedCard = Boolean(detailedCardId);

  useLayoutEffect(() => {
    if (!displayedCardId) return;
    // const modalBody = document.querySelector('.fullscreen-modal .ant-modal-body');
    // const { scrollTop } = modalBody;
    currentCardRef.current?.scrollIntoView();
    // retain vertical scroll position
    // modalBody.scrollTop = scrollTop;
  }, [displayedCardId]);

  const currentCardIndex = cards.findIndex((card) => card.id === displayedCardId);
  const currentCard = cards[currentCardIndex];
  const prevCard = cards[currentCardIndex - 1];
  const nextCard = cards[currentCardIndex + 1];

  const onScroll = (e) => {
    if (!displayedCardId) return;
    const { scrollLeft, scrollWidth, clientWidth } = e.target;

    if (scrollLeft === 0 && prevCard) {
      if (isDetailedCard) {
        setDetailCard(prevCard);
      } else {
        setZoomedCard(prevCard);
      }
    } else if (scrollLeft + clientWidth === scrollWidth && nextCard) {
      if (isDetailedCard) {
        setDetailCard(nextCard);
      } else {
        setZoomedCard(nextCard);
      }
    }
  };

  const debouncedOnScroll = debounce(onScroll, 50);

  if (!displayedCardId) return null;

  const modalProps = isDetailedCard
    ? {
        bodyStyle: {
          padding: '32px 0 0',
          height: 'calc(100vh - 50px)',
          overflow: 'auto',
        },
        closeIcon: <CardButton Icon={CloseOutlined} relative size="120%" />,
      }
    : {
        bodyStyle: {
          padding: 0,
          borderRadius: '4%',
          overflow: 'hidden',
        },
        wrapClassName: 'transparent-modal',
        closeIcon: <div />,
      };

  return (
    <Modal
      visible
      footer={null}
      onCancel={onClose}
      {...modalProps}
      className="fullscreen-modal"
    >
      <StyledWrapper
        onScroll={debouncedOnScroll}
        onClick={isDetailedCard ? undefined : onClose}
      >
        {prevCard && <CardSlide card={prevCard} displayDetails={isDetailedCard} />}
        <CardSlide
          card={currentCard}
          displayDetails={isDetailedCard}
          cardRef={currentCardRef}
        />
        {nextCard && <CardSlide card={nextCard} displayDetails={isDetailedCard} />}
      </StyledWrapper>
    </Modal>
  );
};

export default CardModal;
