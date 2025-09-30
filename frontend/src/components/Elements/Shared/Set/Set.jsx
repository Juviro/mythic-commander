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
  height: 24px;
  line-height: 24px;

  @media (max-width: 764px) {
    font-size: 12px;
  }
`;

const StyledLink = styled(Link)`
  width: calc(100% - 12px);
  display: inline-flex;
`;

const StylesSetNameOnly = styled.span`
  margin-right: 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default ({ setKey, name: overwriteName, secretLairId }) => {
  const { sets } = useContext(CardContext);
  const { name, icon_svg_uri } = sets[setKey] || {};
  const setName = overwriteName || name;
  const urlSuffix = secretLairId ? `&secretLairs=${secretLairId}` : '';
  const to = getDynamicUrl(`/search?sets=${setKey}${urlSuffix}`);

  const [, setNameOnly, variant] = setName.match(/([^(]+)(\(.*\))?/);

  return (
    <DesktopTooltip title={setName}>
      <StyledSetName>
        {icon_svg_uri && <StyledSetIcon src={icon_svg_uri} alt="" />}
        <StyledLink to={to} onClick={(e) => e.stopPropagation()} tabIndex="-1">
          <StylesSetNameOnly>{setNameOnly}</StylesSetNameOnly>
          <span>{variant}</span>
        </StyledLink>
      </StyledSetName>
    </DesktopTooltip>
  );
};
