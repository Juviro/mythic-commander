import React, { useEffect } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router';
// import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper, Slide } from 'react-dynamic-swiper';

import Card from '.';

const StyledSwiper = styled(Swiper)`
  .swiper-wrapper {
    display: -webkit-box;
  }
`;

const CardModal = ({
  oracle_id,
  id,
  onClose,
  history,
  cards,
  setDetailCard,
  onLoadMore,
}) => {
  const currentIndex = cards.findIndex((card) => card.id === id);

  useEffect(() => {
    // Load more cards when only two cards are left
    if (currentIndex + 3 === cards.length) {
      onLoadMore();
    }
  }, [currentIndex, onLoadMore]);

  if (!oracle_id) return null;

  window.onpopstate = onClose;

  return (
    <Modal
      visible
      footer={null}
      onCancel={history.goBack}
      bodyStyle={{ padding: '32px 0 0', overflow: 'hidden' }}
      className="fullscreen-modal"
    >
      <StyledSwiper
        swiperOptions={{
          slidesPerView: 1,
          initialSlide: currentIndex,
        }}
      >
        {cards
          .filter((_, index) => true || Math.abs(index - currentIndex) <= 1)
          .map((card, index) => {
            const isRendered = Math.abs(index - currentIndex) <= 1;
            return (
              <Slide
                key={card.oracle_id}
                style={{ width: '100%' }}
                onActive={() => setDetailCard(card)}
              >
                <span>
                  {isRendered && (
                    <Card overwriteOracleId={card.oracle_id} defaultCardId={card.id} />
                  )}
                </span>
              </Slide>
            );
          })}
      </StyledSwiper>
    </Modal>
  );
};

export default withRouter(CardModal);
