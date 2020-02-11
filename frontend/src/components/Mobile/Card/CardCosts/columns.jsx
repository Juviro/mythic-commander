import React from 'react';

import styled from 'styled-components';

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
  max-width: 35vw;
`;

const renderSet = allSets => set => {
  const { name, icon_svg_uri } = allSets[set];
  return (
    <StyledSet>
      <StyledSetIcon src={icon_svg_uri} alt={name} />
      <StyledName>{name}</StyledName>
    </StyledSet>
  );
};

export default sets => [
  {
    key: '1',
    title: 'Set',
    dataIndex: 'set',
    render: renderSet(sets),
  },
  {
    key: '2',
    title: 'EUR',
    dataIndex: 'prices.eur',
    render: price => (price ? `${price}€` : '-'),
  },
  {
    key: '3',
    title: 'USD',
    dataIndex: 'prices',
    render: ({ usd, usd_foil }) =>
      usd || usd_foil ? `${usd || usd_foil}$` : '-',
  },
];
