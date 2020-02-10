import React, { useContext } from 'react';

import { Table, Skeleton } from 'antd';
import styled from 'styled-components';
import CardContext from '../../CardProvider/CardProvider';

const renderPrice = unit => price => (price ? `${price}${unit}` : '-');

const StyledSetIcon = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 4px;
`;

export const StyledTitle = styled.div`
  font-weight: 600;
  margin: 16px 0;
  display: flex;
  align-self: start;
  color: black;
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

export default ({ card, loading }) => {
  const { sets } = useContext(CardContext);

  if (!card) {
    return <Skeleton active paragraph={4} />;
  }

  const columns = [
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
      render: renderPrice('€'),
    },
    {
      key: '3',
      title: 'USD',
      dataIndex: 'prices.usd',
      render: renderPrice('$'),
    },
  ];

  return (
    <>
      <StyledTitle>Costs</StyledTitle>
      {card && !loading ? (
        <Table
          dataSource={card.all_sets.map(set => ({ ...set, key: set.id }))}
          columns={columns}
          pagination={false}
          size="small"
          style={{ width: '100%' }}
        />
      ) : (
        <Skeleton active paragraph={4} />
      )}
    </>
  );
};
