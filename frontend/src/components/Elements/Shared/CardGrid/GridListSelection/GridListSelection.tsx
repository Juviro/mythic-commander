import React, { useEffect } from 'react';
import styled from 'styled-components';
import sumCardAmount from 'utils/sumCardAmount';
import { CardList } from '../CardGrid';
import GridListSelectionIndicator from './GridListSelectionIndicator';
import GridListSelectionItem from './GridListSelectionItem';

const NAVBAR_HEIGHT = 46;
const OFFSET = NAVBAR_HEIGHT * 2 + 32;

const StyledListSelection = styled.ol<{ visible: boolean }>`
  position: fixed;
  display: flex;
  z-index: 300;
  justify-content: center;
  padding: 4px;
  top: ${NAVBAR_HEIGHT}px;
  left: 0;
  right: 0;
  background-color: #fff;
  list-style: none;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);

  opacity: ${({ visible }) => (visible ? 1 : 0)};
  ${({ visible }) => !visible && 'pointer-events: none'};
  transition: opacity ${({ visible }) => (visible ? 0.5 : 0.2)}s ease-out;
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
  const [visible, setVisible] = React.useState(false);
  const [blockedUntil, setBlockedUntil] = React.useState(0);
  const [firstVisibleTitle, setFirstVisibleTitle] = React.useState(
    cardLists?.[0]?.type ?? ''
  );

  useEffect(() => {
    const onScroll = () => {
      if (blockedUntil && blockedUntil !== window.pageYOffset) {
        return;
      }
      setBlockedUntil(0);
      setVisible(document.documentElement.scrollTop > 100);

      const newFirstVisibleTitle = cardLists?.find(({ key }) => {
        const bottom = document.getElementById(key)?.getBoundingClientRect().bottom;
        return bottom - NAVBAR_HEIGHT - 32 > 0;
      });
      setFirstVisibleTitle(newFirstVisibleTitle?.type ?? '');
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
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
    <StyledListSelection visible={visible}>
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
