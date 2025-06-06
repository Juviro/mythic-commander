import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import sumCardAmount from 'utils/sumCardAmount';
import DeckProvider from 'components/Desktop/Deck/DeckProvider';
import { CardList } from '../CardGrid';
import GridListSelectionIndicator from './GridListSelectionIndicator';
import GridListSelectionItem from './GridListSelectionItem';

const NAVBAR_HEIGHT = 46;
const OFFSET = NAVBAR_HEIGHT * 2 + 32;

const StyledListSelection = styled.ol<{ visible: boolean; isSidebarOpen?: boolean }>`
  position: fixed;
  display: flex;
  z-index: 99;
  justify-content: center;
  padding: 4px;
  top: 32px;
  left: 0;
  right: 0;
  background-color: #fff;
  list-style: none;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);

  opacity: ${({ visible }) => (visible ? 1 : 0)};
  ${({ visible }) => !visible && 'pointer-events: none'};
  transition: opacity ${({ visible }) => (visible ? 0.5 : 0.2)}s ease-out;
  ${({ isSidebarOpen }) => isSidebarOpen && 'padding-right: 550px'};
`;

const StyledInner = styled.div`
  width: 100%;
  padding: 0 20px;
  max-width: 1800px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

interface Props {
  cardLists?: CardList[];
}

const GridListSelection = ({ cardLists }: Props) => {
  const { isSidebarOpen } = useContext(DeckProvider);
  const [visible, setVisible] = useState(false);
  const [blockedUntil, setBlockedUntil] = useState(0);
  const [firstVisibleTitle, setFirstVisibleTitle] = useState(cardLists?.[0]?.type ?? '');

  useEffect(() => {
    const onScroll = () => {
      if (blockedUntil && blockedUntil !== window.scrollY) {
        return;
      }
      setBlockedUntil(0);
      setVisible(document.documentElement.scrollTop > 100);

      // if we are fully scrolled down, we should show the last title
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        setFirstVisibleTitle(cardLists?.[cardLists.length - 1]?.type ?? '');
        return;
      }

      const newFirstVisibleTitle = cardLists?.find(({ key }) => {
        const bottom = document.getElementById(key)?.getBoundingClientRect().bottom;
        return bottom - NAVBAR_HEIGHT - 32 > 0;
      });

      setFirstVisibleTitle(newFirstVisibleTitle?.type ?? '');
    };

    const onScrollEnd = () => {
      setBlockedUntil(0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scrollend', onScrollEnd, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scrollend', onScrollEnd);
    };
  }, [setVisible, setFirstVisibleTitle, cardLists, blockedUntil]);

  if (!(cardLists?.length > 1)) return null;

  const onScrollToList = (key: string, isReset?: boolean) => {
    const top = document.getElementById(key)?.offsetTop;
    const offset = isReset ? top : OFFSET;

    setBlockedUntil(top - offset);
    window.scrollTo({
      top: top - offset,
      behavior: 'smooth',
    });
    setFirstVisibleTitle(key);
  };

  return (
    <StyledListSelection visible={visible} isSidebarOpen={isSidebarOpen}>
      <GridListSelectionIndicator type={firstVisibleTitle} />
      <StyledInner>
        {cardLists.map(({ key, type, color, cards }, index) => (
          <GridListSelectionItem
            onClick={() => onScrollToList(key, !index)}
            color={color}
            key={key}
            count={sumCardAmount(cards)}
            type={type}
          />
        ))}
      </StyledInner>
    </StyledListSelection>
  );
};

export default GridListSelection;
