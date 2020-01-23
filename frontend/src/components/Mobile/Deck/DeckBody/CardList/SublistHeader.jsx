import React from 'react';
import styled from 'styled-components';

const typeToPlural = type => (type === 'Sorcery' ? 'Sorceries' : `${type}s`);

const StyledHeader = styled.div`
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-weight: 600;
  margin-left: 16px;
`;

export default ({ type, numberOfCards }) => {
  return <StyledHeader type={type}>{`${typeToPlural(type)} (${numberOfCards})`}</StyledHeader>;
};
