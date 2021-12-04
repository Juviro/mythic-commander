import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { EditOutlined } from '@ant-design/icons';
import { Popover, Tag as AntdTag } from 'antd';

import { greyBorder } from 'constants/colors';
import { UnifiedDeckCard } from 'types/unifiedTypes';
import { AddTag } from './AddTag';

const StyledAddTag = styled(AntdTag)`
  cursor: pointer;
  background-color: white;
  border: 1px solid ${greyBorder};
  margin-top: 4px;
  border-radius: 12px;
`;

interface Props {
  onSetTags: (cardId: string, tags: string[]) => void;
  card: UnifiedDeckCard;
  allTags: string[];
}

export const AddTagButton = ({ onSetTags, card, allTags }: Props) => {
  const [visible, setVisible] = useState(false);
  const popoverRef = useRef(null);

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const onClick = (event) => {
      if (!popoverRef.current?.contains(event.target)) {
        setVisible(false);
      }
    };

    if (visible) {
      document.addEventListener('mousedown', onClick);
    } else {
      document.removeEventListener('mousedown', onClick);
    }

    return () => {
      document.removeEventListener('mousedown', onClose);
    };
  }, [visible]);

  const menu = (
    <div ref={popoverRef}>
      <AddTag onSetTags={onSetTags} card={card} allTags={allTags} onClose={onClose} />
    </div>
  );

  return (
    <Popover
      content={menu}
      visible={visible}
      placement="bottomLeft"
      destroyTooltipOnHide
      trigger={['click']}
    >
      <StyledAddTag onClick={() => setVisible(true)}>
        <EditOutlined />
        <span>Edit Tags</span>
      </StyledAddTag>
    </Popover>
  );
};
