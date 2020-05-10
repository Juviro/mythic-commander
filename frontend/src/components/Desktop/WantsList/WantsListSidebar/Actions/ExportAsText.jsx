import React from 'react';
import { Button } from 'antd';
import { useToggle } from '../../../../Hooks';
import { ExportAsText } from '../../../../Elements/Shared';

export default ({ wantsList }) => {
  const [exportViewOpen, toggleExportViewOpen] = useToggle();

  return (
    <>
      <Button type="link" onClick={toggleExportViewOpen}>
        Export as Text
      </Button>
      <ExportAsText
        title={wantsList.name}
        cards={wantsList.cards}
        visible={exportViewOpen}
        onClose={toggleExportViewOpen}
      />
    </>
  );
};
