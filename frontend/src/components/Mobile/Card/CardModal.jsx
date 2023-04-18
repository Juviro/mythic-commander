import React, { useEffect, useLayoutEffect } from 'react';
import { Modal } from 'antd';
import { debounce } from 'lodash';

import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';
import Card from '.';
import CardButton from '../../Elements/Shared/CardButton';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow: auto;
  scroll-snap-type: x mandatory;
`;

const StyledSlideSnapper = styled.div`
  scroll-snap-align: start;
  height: 100%;
`;

const StyledSlide = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

// TODO:
// * when reaching the end of an infinite scroll list, load more options

const CardModal = ({ currentCardId, onClose, cards, setDetailCard }) => {
  const currentCardRef = React.createRef();

  useEffect(() => {
    window.onpopstate = onClose;

    return () => {
      window.onpopstate = null;
    };
  }, []);

  useLayoutEffect(() => {
    if (!currentCardId) return;
    // const modalBody = document.querySelector('.fullscreen-modal .ant-modal-body');
    // const { scrollTop } = modalBody;
    currentCardRef.current?.scrollIntoView();
    // retain vertical scroll position
    // modalBody.scrollTop = scrollTop;
  }, [currentCardId]);

  const currentCardIndex = cards.findIndex((card) => card.id === currentCardId);
  const currentCard = cards[currentCardIndex];
  const prevCard = cards[currentCardIndex - 1];
  const nextCard = cards[currentCardIndex + 1];

  const onScroll = (e) => {
    if (!currentCardId) return;
    const { scrollLeft, scrollWidth, clientWidth } = e.target;

    if (scrollLeft === 0 && prevCard) {
      setDetailCard(prevCard);
    } else if (scrollLeft + clientWidth === scrollWidth && nextCard) {
      setDetailCard(nextCard);
    }
  };

  const debouncedOnScroll = debounce(onScroll, 50);

  if (!currentCardId) return null;

  return (
    <Modal
      visible
      footer={null}
      onCancel={onClose}
      bodyStyle={{ padding: '32px 0 0', height: 'calc(100vh - 50px)', overflow: 'auto' }}
      className="fullscreen-modal"
      closeIcon={<CardButton Icon={CloseOutlined} relative size="120%" />}
    >
      <StyledWrapper onScroll={debouncedOnScroll}>
        {prevCard && (
          <StyledSlideSnapper>
            <StyledSlide>
              <Card overwriteOracleId={prevCard.oracle_id} defaultCardId={prevCard.id} />
              {/* <CardImage card={prevCard} loading={loading} />  */}
            </StyledSlide>
          </StyledSlideSnapper>
        )}
        <StyledSlideSnapper ref={currentCardRef}>
          <StyledSlide>
            <Card
              overwriteOracleId={currentCard?.oracle_id}
              defaultCardId={currentCardId}
            />
            {/* <CardImage card={currentCard} loading={loading} />  */}
          </StyledSlide>
        </StyledSlideSnapper>
        {nextCard && (
          <StyledSlideSnapper>
            <StyledSlide>
              <Card overwriteOracleId={nextCard.oracle_id} defaultCardId={nextCard.id} />
              {/* <CardImage card={nextCard} loading={loading} /> */}
            </StyledSlide>
          </StyledSlideSnapper>
        )}
      </StyledWrapper>
    </Modal>
  );
};

export default CardModal;
