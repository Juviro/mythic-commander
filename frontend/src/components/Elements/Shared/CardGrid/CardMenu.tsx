import React from 'react';
import { Button, Space } from 'antd';
import styled from 'styled-components';
import { CloseOutlined, EyeOutlined } from '@ant-design/icons';

import { fadeIn } from 'components/Animations';
import { UnifiedCard } from 'types/unifiedTypes';
import {
  lightBackground,
  darkBackground,
  darkBackgroundTransparent,
} from 'constants/colors';
import { MenuItem } from 'components/Elements/Shared/ContextMenu/ContextMenu';
import isMobile from 'utils/isMobile';

const StyledWrapper = styled.div`
  position: absolute;
  z-index: 10;
  display: flex;
  cursor: pointer;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  bottom: 0;
  padding: 12px 24px;
  box-sizing: border-box;
  background: linear-gradient(to bottom, ${darkBackgroundTransparent}, ${darkBackground});
  animation: ${fadeIn} 0.2s ease-out;
`;

const StyledCloseIcon = styled(CloseOutlined)`
  position: absolute;
  right: 12px;
  top: 32px;
  color: ${lightBackground};
  font-size: 32px;

  @media (hover: hover) {
    ${!isMobile() && 'display: none;'}
  }
`;

export interface MenuAction {
  Icon: React.ReactNode;
  title: string;
  key?: string;
  primary?: boolean;
  onClick: () => void;
}

interface Props {
  card: UnifiedCard;
  actions: MenuItem[];
  onClose: () => void;
  onOpenDetails: (card: UnifiedCard) => void;
}

export const CardMenu = ({ card, onClose, actions, onOpenDetails }: Props) => {
  const baseActions: MenuItem[] = [
    {
      Icon: EyeOutlined,
      title: 'Details',
      onClick: onOpenDetails,
      primary: true,
    },
  ];

  const allActions: MenuItem[] = [...baseActions, ...actions];

  return (
    <StyledWrapper>
      <StyledCloseIcon
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />
      <Space direction="vertical" style={{ width: '100%' }} size={10}>
        {allActions.map(({ Icon, title, onClick, primary }) => (
          <Button
            title={title}
            icon={<Icon />}
            onClick={(e) => {
              onClick(card);
              e.stopPropagation();
            }}
            key={title}
            ghost={Boolean(!primary)}
            type={primary ? 'primary' : 'default'}
            style={{ width: '100%', padding: '4px 6px' }}
          >
            {title}
          </Button>
        ))}
      </Space>
    </StyledWrapper>
  );
};
