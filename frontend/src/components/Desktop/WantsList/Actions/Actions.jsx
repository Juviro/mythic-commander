import { Space } from 'antd';
import React from 'react';
import WantsActions from 'components/Elements/Desktop/WantsActions';
import WantsListVisibility from 'components/Elements/Shared/Visibility/WantsListVisibility';

export default ({ wantsList, onAddCards, canEdit }) => {
  if (!wantsList) return null;

  return (
    <Space>
      {wantsList.canEdit && <WantsListVisibility visibility={wantsList.visibility} />}
      <WantsActions canEdit={canEdit} onAddCards={onAddCards} wantsList={wantsList} />
    </Space>
  );
};
