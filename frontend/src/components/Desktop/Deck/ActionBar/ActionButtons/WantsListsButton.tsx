import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import styled, { css } from 'styled-components';
import { LoadingOutlined, UpOutlined } from '@ant-design/icons';

import { UnifiedDeck } from 'types/unifiedTypes';
import { primary, primarySemiLight } from 'constants/colors';
import { Dropzone } from 'components/Elements/Desktop';
import { useToggle } from 'components/Hooks';
import { ADVANCED_SEARCH } from './ActionButtons';
import useDeckWantsQueries from './useDeckWantsQueries';

const StyledButton = styled(Button)`
  width: 220px;
  height: 40px;
`;

const StyledMenuItem = styled(Menu.Item)<{ selected: boolean }>`
  height: 60px;
  display: flex;
  align-items: center;

  ${({ selected }) =>
    selected &&
    css`
      color: white;
      background-color: ${primarySemiLight};

      &:hover {
        background-color: ${primary};
      }
    `}
`;

interface Props {
  deck?: UnifiedDeck;
  currentTabId: string | null;
  setCurrentTabId: (id: string) => void;
}

export const WantsListsButton = ({ deck, currentTabId, setCurrentTabId }: Props) => {
  const [isHoveringButton, setIsHoveringButton] = useToggle();
  const [isHoveringMenu, setIsHoveringMenu] = useToggle();
  const label = deck ? `Wants Lists (${deck?.wantsLists.length})` : 'Wants Lists';

  const { onAddCard } = useDeckWantsQueries();

  const onHideMenu = () => {
    setTimeout(() => setIsHoveringButton(false), 100);
  };

  const menu = (
    <Menu>
      {deck?.wantsLists.map(({ id, name, numberOfCards }) => (
        <StyledMenuItem
          key={id}
          onClick={() => setCurrentTabId(id)}
          selected={id === currentTabId}
          style={{ padding: '1px 0 0' }}
          onMouseEnter={() => setIsHoveringMenu(true)}
          onMouseLeave={() => setIsHoveringMenu(false)}
        >
          <Dropzone
            onDrop={onAddCard(id, name)}
            listId={id}
            style={{ display: 'flex', alignItems: 'center', padding: '4px 6px' }}
          >
            {`${name} (${numberOfCards})`}
          </Dropzone>
        </StyledMenuItem>
      ))}
    </Menu>
  );

  const onClickButton = () => {
    const firstWantsId = deck?.wantsLists?.[0]?.id;
    if (currentTabId && currentTabId !== ADVANCED_SEARCH) {
      setCurrentTabId(null);
    } else if (firstWantsId) {
      setCurrentTabId(firstWantsId);
    }
  };

  return (
    <Dropzone disabled>
      {({ canDrop }) => (
        <Dropdown
          overlay={menu}
          placement="topCenter"
          visible={isHoveringButton || isHoveringMenu || (canDrop && !currentTabId)}
          // @ts-ignore
          onMouseEnter={() => setIsHoveringButton(true)}
          onMouseLeave={onHideMenu}
        >
          <StyledButton
            ghost={!deck?.wantsLists.some(({ id }) => id === currentTabId)}
            type="primary"
            onClick={onClickButton}
          >
            <span>{label}</span>
            {deck ? <UpOutlined /> : <LoadingOutlined />}
          </StyledButton>
        </Dropdown>
      )}
    </Dropzone>
  );
};
