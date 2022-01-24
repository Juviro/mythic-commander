import React, { useContext } from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CardContext from '../../../Provider/CardProvider';
import getDynamicUrl from '../../../../utils/getDynamicUrl';
import DesktopTooltip from '../../Desktop/DesktopTooltip';

const StyledSetIcon = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 4px;
`;

const StyledSetName = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: 24px;
  line-height: 24px;

  @media (max-width: 764px) {
    font-size: 12px;
  }
`;

export default ({ setKey, name: overwriteName }) => {
  const { sets } = useContext(CardContext);
  const { name, icon_svg_uri } = sets[setKey];
  const setName = overwriteName || name;
  const to = getDynamicUrl(`/search?sets=${setKey}`);

  return (
    <DesktopTooltip title={setName}>
      <StyledSetName>
        <StyledSetIcon src={icon_svg_uri} alt="icon" />
        <Link to={to} onClick={(e) => e.stopPropagation()} tabIndex="-1">
          {setName}
        </Link>
      </StyledSetName>
    </DesktopTooltip>
  );
};
