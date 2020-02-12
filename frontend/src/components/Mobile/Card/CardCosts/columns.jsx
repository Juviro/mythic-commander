import React from 'react';

import styled from 'styled-components';
import { Icon, Tooltip } from 'antd';

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
    <Tooltip title={name}>
      <StyledSet>
        <StyledSetIcon src={icon_svg_uri} alt={name} />
        <StyledName>{name}</StyledName>
      </StyledSet>
    </Tooltip>
  );
};

const renderUsd = ({ usd, usd_foil }) => {
  return (
    <>
      {!usd && usd_foil && (
        <Icon
          style={{ marginLeft: '-20px', marginRight: '1px' }}
          type="star"
          theme="twoTone"
          twoToneColor="#d4af37"
        />
      )}
      {usd || usd_foil ? `${usd || usd_foil}$` : '-'}
    </>
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
    render: renderUsd,
  },
];
