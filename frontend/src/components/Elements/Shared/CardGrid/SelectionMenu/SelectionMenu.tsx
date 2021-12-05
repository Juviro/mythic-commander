import React, { useContext } from 'react';
import styled from 'styled-components';
import { Button, Space, Typography } from 'antd';
import {
  CheckSquareOutlined,
  CloseOutlined,
  DeleteOutlined,
  DiffOutlined,
  PrinterOutlined,
  VerticalLeftOutlined,
} from '@ant-design/icons';
import { fadeIn } from 'components/Animations';
import isMobile from 'utils/isMobile';
import { buttonHoverBackground } from 'constants/colors';
import UserContext from 'components/Provider/UserProvider';
import AddTagsButton from 'components/Elements/Shared/CardGrid/SelectionMenu/AddTagsButton';
import { UnifiedCard } from 'types/unifiedTypes';
import DesktopTooltip from '../../../Desktop/DesktopTooltip';
import Menu from '../../Menu';

const StyledWrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  top: 0;
  background-color: white;
  left: 0;
  z-index: 1001;
  padding: 8px 24px;
  font-size: 22px;
  box-shadow: 0px 0px 12px 0px #6f6f6f;
  animation: ${fadeIn} 0.5s;
`;

const StyledActionIconWrapper = styled.div`
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${buttonHoverBackground};
  }
`;

interface Props {
  selectedCardIds: string[];
  onClearSelection: () => void;
  onMoveCards?: () => void;
  onCopyCardsTo?: () => void;
  onDeleteCards?: () => void;
  onSelectAll?: () => void;
  canSelectAll: boolean;
  smallSelectionMenu?: boolean;
  allTags?: string[];
  allCards: UnifiedCard[];
}

export const SelectionMenu = ({
  onClearSelection,
  selectedCardIds,
  onMoveCards,
  onCopyCardsTo,
  onDeleteCards,
  onSelectAll,
  canSelectAll,
  smallSelectionMenu,
  allTags,
  allCards,
}: Props) => {
  const { user } = useContext(UserContext);
  if (!selectedCardIds.length) return null;

  const isSmall = smallSelectionMenu || isMobile();

  const actions = [];

  if (isMobile() && canSelectAll) {
    actions.push({
      icon: <CheckSquareOutlined />,
      title: 'Select All',
      onClick: onSelectAll,
    });
  }
  if (!isMobile() && allTags) {
    actions.push({
      icon: (
        <AddTagsButton allTags={allTags} cardIds={selectedCardIds} allCards={allCards} />
      ),
      title: 'Tag Cards',
    });
  }
  if (!isMobile()) {
    const getProxyUrl = () => `/proxy/cards/${selectedCardIds.join(',')}`;
    actions.push({
      icon: <PrinterOutlined />,
      title: 'Proxy Cards',
      onClick: () => window.open(getProxyUrl(), '_newtab'),
    });
  }
  if (onCopyCardsTo && user) {
    actions.push({
      icon: <DiffOutlined />,
      title: 'Copy cards to...',
      onClick: onCopyCardsTo,
    });
  }
  if (onMoveCards && user) {
    actions.push({
      icon: <VerticalLeftOutlined />,
      title: 'Move cards to...',
      onClick: onMoveCards,
    });
  }
  if (onDeleteCards && user) {
    actions.push({
      icon: <DeleteOutlined />,
      title: 'Delete',
      onClick: onDeleteCards,
    });
  }

  return (
    <StyledWrapper>
      <Space size={24}>
        <StyledActionIconWrapper onClick={onClearSelection}>
          <DesktopTooltip title="Clear Selection" placement="bottomLeft">
            <CloseOutlined />
          </DesktopTooltip>
        </StyledActionIconWrapper>
        <Typography.Text>{`${selectedCardIds.length} cards selected`}</Typography.Text>
        {!isMobile() && canSelectAll && (
          <Button onClick={onSelectAll} type="link">
            Select All
          </Button>
        )}
      </Space>
      {isSmall ? (
        <Menu actions={actions} placement="bottomRight" fontSize={24} />
      ) : (
        <Space size={24}>
          {actions.map(({ icon, title, onClick }) => (
            <DesktopTooltip key={title} title={title} placement="bottomRight">
              <StyledActionIconWrapper onClick={onClick}>{icon}</StyledActionIconWrapper>
            </DesktopTooltip>
          ))}
        </Space>
      )}
    </StyledWrapper>
  );
};
