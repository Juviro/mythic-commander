import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Popover } from 'antd';

import AddTagsMenu from './AddTagsMenu';

const StyledMenu = styled.div`
  padding: 12px 16px;
`;

interface Props {
  allTags: string[];
  children: any;
  initialTags?: string[];
  onSave: (tags: string[]) => void;
  onSaveAsDefault?: (tags: string[]) => void;
}

const AddTagsPopover = ({
  onSave,
  allTags,
  children,
  onSaveAsDefault,
  initialTags,
}: Props) => {
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
      document.removeEventListener('mousedown', onClick);
    };
  }, [visible]);

  const menu = (
    <StyledMenu ref={popoverRef}>
      <AddTagsMenu
        onSave={onSave}
        initialTags={initialTags}
        allTags={allTags}
        onClose={onClose}
        onSaveAsDefault={onSaveAsDefault}
      />
    </StyledMenu>
  );

  return (
    <Popover
      content={menu}
      visible={visible}
      placement="bottomRight"
      destroyTooltipOnHide
      overlayClassName="add-tag-popover"
    >
      {React.cloneElement(children, { onClick: () => setVisible(!visible) })}
    </Popover>
  );
};

export default AddTagsPopover;
