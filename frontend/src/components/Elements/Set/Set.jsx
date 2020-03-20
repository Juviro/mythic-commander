import React, { useContext } from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CardContext from '../../CardProvider/CardProvider';

const StyledSetIcon = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 4px;
`;

const StyledSet = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const StyledName = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default ({ setKey, style = {}, name: overwriteName }) => {
  const { sets } = useContext(CardContext);
  const { name, icon_svg_uri } = sets[setKey];
  const setName = overwriteName || name;
  return (
    <StyledSet style={style}>
      <StyledSetIcon src={icon_svg_uri} alt={setName} />
      <Link
        to={`/m/search?orderBy=name-asc&set=${setKey}&autoSearch=true`}
        onClick={e => e.stopPropagation()}
      >
        <StyledName>{setName}</StyledName>
      </Link>
    </StyledSet>
  );
};
