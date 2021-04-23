import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import styled, { css } from 'styled-components';
import { LoadingOutlined, UpOutlined } from '@ant-design/icons';

import { UnifiedDeck } from 'types/unifiedTypes';
import { primary, primarySemiLight } from 'constants/colors';
import { ADVANCED_SEARCH } from './ActionButtons';

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
  const label = deck ? `Wants Lists (${deck?.wantsLists.length})` : 'Wants Lists';

  const menu = (
    <Menu>
      {deck?.wantsLists.map(({ id, name }) => (
        <StyledMenuItem
          key={id}
          onClick={() => setCurrentTabId(id)}
          selected={id === currentTabId}
        >
          {name}
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
    <Dropdown overlay={menu} placement="topCenter">
      <StyledButton
        ghost={!deck?.wantsLists.some(({ id }) => id === currentTabId)}
        type="primary"
        onClick={onClickButton}
      >
        <span>{label}</span>
        {deck ? <UpOutlined /> : <LoadingOutlined />}
      </StyledButton>
    </Dropdown>
  );
};
