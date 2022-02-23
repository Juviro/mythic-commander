import React from 'react';
import { Button, Dropdown, Menu, Space } from 'antd';
import styled, { css } from 'styled-components';
import { LoadingOutlined, PlusOutlined, UpOutlined } from '@ant-design/icons';

import { UnifiedDeck } from 'types/unifiedTypes';
import { primary, primarySemiLight } from 'constants/colors';
import Dropzone from 'components/Elements/Desktop/Dropzone';
import { useToggle } from 'components/Hooks';
import useCreateWantsList from 'components/Desktop/Deck/Sidebar/Tabs/useCreateWantsList';
import { ADVANCED_SEARCH } from './ActionButtons';
import useDeckWantsQueries from './useDeckWantsQueries';

const StyledButton = styled(Button)`
  width: 220px;
  height: 40px;
`;

export const StyledMenuItem = styled(Menu.Item)<{ selected: boolean }>`
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

const StyledMenuItemInner = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 6px;
  height: 100%;
`;

interface Props {
  deck?: UnifiedDeck;
  currentTabId: string | null;
  setCurrentTabId: (id: string) => void;
}

export const WantsListsButton = ({ deck, currentTabId, setCurrentTabId }: Props) => {
  const [isHoveringButton, setIsHoveringButton] = useToggle();
  const [isHoveringMenu, setIsHoveringMenu] = useToggle();
  const { onCreateWantsList } = useCreateWantsList(deck, setCurrentTabId);
  const label = deck ? `Wants Lists (${deck?.wantsLists.length})` : 'Wants Lists';

  const { onAddCard } = useDeckWantsQueries();

  const onHideMenu = () => {
    setTimeout(() => setIsHoveringButton(false), 100);
  };

  const wantsListsItems = deck?.wantsLists.map(({ id, name, numberOfCards }) => ({
    id,
    title: `${name} (${numberOfCards})`,
    onClick: () => setCurrentTabId(id),
    onDrop: onAddCard(id, name),
  }));

  const addWantsListItem = {
    id: 'ADD_WANTS',
    title: (
      <Space>
        <PlusOutlined />
        <span>Add Wants List</span>
      </Space>
    ),
    onClick: onCreateWantsList,
    onDrop: null,
  };

  const menu = (
    <Menu>
      {[...wantsListsItems, addWantsListItem].map(({ id, title, onDrop, onClick }) => (
        <StyledMenuItem
          key={id}
          onClick={onClick}
          selected={id === currentTabId}
          style={{ padding: '1px 0 0' }}
          onMouseEnter={() => setIsHoveringMenu(true)}
          onMouseLeave={() => setIsHoveringMenu(false)}
        >
          <Dropzone
            onDrop={onDrop}
            disabled={!onDrop}
            listId={id}
            style={{ height: '100%' }}
          >
            <StyledMenuItemInner>{title}</StyledMenuItemInner>
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
