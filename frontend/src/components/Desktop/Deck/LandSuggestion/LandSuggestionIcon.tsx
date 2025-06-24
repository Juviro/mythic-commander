import React from 'react';
import styled from 'styled-components';

import Tooltip from 'antd/lib/tooltip';
import { primary } from 'constants/colors';
import { ReactComponent as Icon } from '../../../../assets/icons/ai.svg';

export const StyledLandWizardIcon = styled(Icon)`
  width: 24px;
  height: 24px;
  margin-left: 16px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  :hover {
    transform: scale(1.1);
    color: ${primary};
  }
`;

interface Props {
  onClick?: () => void;
}

const LandSuggestionIcon = ({ onClick }: Props) => {
  return (
    <Tooltip title="Land Suggestion">
      <StyledLandWizardIcon onClick={onClick} />
    </Tooltip>
  );
};

export default LandSuggestionIcon;
