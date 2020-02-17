import React, { useState } from 'react';
import styled from 'styled-components';
import { Skeleton, List } from 'antd';
import CollectionListItem from './CollectionListItem';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledEditWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export default ({ card, selectedCardId, loading }) => {
  // TODO: on edit, don't show all version
  // show plus button that adds new row with set picker
  // show delete button for each row

  // TODO: on click of row, switch card to clicked one
  // do the same for card costs list items

  const [isEditing, setIsEditing] = useState(false);
  if (!card || loading) return <Skeleton />;
  const { all_sets } = card;
  const displayedSets = isEditing
    ? all_sets
    : all_sets.filter(({ amount, amountFoil }) => amount + amountFoil);

  return (
    <StyledWrapper onBlur={() => setIsEditing(false)}>
      <StyledEditWrapper>
        {/* <Icon
          type="edit"
          style={{ color: '#1890ff', marginBottom: 8, marginRight: 4 }}
          onClick={() => setIsEditing(true)}
        /> */}
      </StyledEditWrapper>
      {Boolean(displayedSets.length) && (
        <List
          bordered
          size="small"
          dataSource={displayedSets}
          renderItem={({ id, ...rest }) => (
            <List.Item
              key={id}
              className={id === selectedCardId ? 'table-active ' : ''}
            >
              <CollectionListItem {...rest} isEditing={isEditing} />
            </List.Item>
          )}
        />
      )}
    </StyledWrapper>
  );
};
