import React from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';

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
  if (!oracle_id) return null;

  const currentIndex = cards.findIndex((card) => card.id === id);

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
        spaceBetween={48}
        initialSlide={currentIndex}
        slidesPerView={1}
        onSlideChange={(swiper) => {
          setDetailCard(cards[swiper.activeIndex]);
          if (swiper.activeIndex + 2 === cards.length) {
            onLoadMore();
          }
        }}
      >
        {cards.map((card, index) => {
          const isRendered = Math.abs(index - currentIndex) <= 1;
          return (
            <SwiperSlide key={card.oracle_id} style={{ width: '100%' }}>
              <span>
                {isRendered && (
                  <Card overwriteOracleId={card.oracle_id} defaultCardId={card.id} />
                )}
              </span>
            </SwiperSlide>
          );
        })}
      </StyledSwiper>
    </Modal>
  );
};

export default withRouter(CardModal);
