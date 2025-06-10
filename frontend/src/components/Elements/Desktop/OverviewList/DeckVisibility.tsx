import React from 'react';
import { Tooltip } from 'antd';
import {
  Visibility,
  VISIBILITY_OPTIONS,
} from 'components/Elements/Shared/Visibility/ChangeVisibilityModal';

interface DeckVisibilityProps {
  visibility?: Visibility;
}

const DeckVisibility = ({ visibility }: DeckVisibilityProps) => {
  if (!visibility) return null;
  if (visibility === 'private') return null;

  const { icon } = VISIBILITY_OPTIONS.find((option) => option.value === visibility);

  const getTooltipTitle = () => {
    if (visibility === 'public') return 'Visible to everyone';
    if (visibility === 'hidden') return 'Visible to users with the link';
    return '';
  };

  return <Tooltip title={getTooltipTitle()}>{icon}</Tooltip>;
};

export default DeckVisibility;
