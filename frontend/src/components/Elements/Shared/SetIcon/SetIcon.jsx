import React, { useContext } from 'react';
import styled from 'styled-components';
import CardContext from '../../../Provider/CardProvider';

const StyledSetIcon = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 6px;
`;

export default ({ setKey, style = null }) => {
  const { sets } = useContext(CardContext);
  const { icon_svg_uri, name } = sets[setKey];

  if (!icon_svg_uri) return null;

  return <StyledSetIcon src={icon_svg_uri} alt={name} style={style} />;
};
