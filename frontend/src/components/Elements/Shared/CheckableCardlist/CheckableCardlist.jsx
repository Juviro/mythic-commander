import React from 'react';
import { Table } from 'antd';

import styled from 'styled-components';
import ListItem from './ListItem';
import sumCardAmount from '../../../../utils/sumCardAmount';

const StyledWrapper = styled.div`
  width: 280px;

  th {
    background-color: white !important;
  }
`;

export default ({ cards, selectedCardIds = [], setSelectedCardIds }) => {
  const selectedCards = cards.filter(({ id }) => selectedCardIds.includes(id));
  const numberOfCards = sumCardAmount(selectedCards);
  const columns = [
    {
      title: `${numberOfCards} cards selected`,
      width: 70,
      key: 'name',
      render: card => <ListItem card={card} />,
    },
  ];

  const onClickRow = ({ id }) => {
    const isSelected = selectedCardIds.includes(id);
    const newCardIds = isSelected
      ? selectedCardIds.filter(cardId => cardId !== id)
      : [...selectedCardIds, id];
    setSelectedCardIds(newCardIds);
  };

  return (
    <StyledWrapper>
      <Table
        rowSelection={{
          columnWidth: 10,
          onChange: setSelectedCardIds,
          selectedRowKeys: selectedCardIds,
        }}
        scroll={{ y: 550 }}
        size="small"
        columns={columns}
        pagination={false}
        dataSource={cards}
        rowKey={({ id }) => id}
        onRow={row => ({
          onClick: () => onClickRow(row),
        })}
      />
    </StyledWrapper>
  );
};
