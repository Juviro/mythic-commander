import React from 'react';
import styled from 'styled-components';

const typeMap = {
  Sorcery: 'Sorceries',
  Commander: 'Commander',
};

const typeToPlural = type => typeMap[type] || `${type}s`;

const StyledHeader = styled.div`
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-weight: 600;
  margin-left: 16px;
`;

export default ({ type, numberOfCards }) => {
  const nameSuffix = type !== 'Commander' ? ` (${numberOfCards})` : '';

  return <StyledHeader type={type}>{typeToPlural(type) + nameSuffix}</StyledHeader>;
};
