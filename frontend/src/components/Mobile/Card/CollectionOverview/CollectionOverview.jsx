import React, { useState } from 'react';
import styled from 'styled-components';
import { Skeleton, List } from 'antd';
import CollectionListItem from './CollectionListItem';
import EditIcon from '../../../Elements/EditIcon';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default ({ card, selectedCardId, loading, onChangeSet }) => {
  // TODO: on click of row, switch card to clicked one

  const [isEditing, setIsEditing] = useState(true);
  if (!card || loading) return <Skeleton />;
  const { all_sets } = card;
  const displayedSets = all_sets.filter(
    ({ amount, amountFoil }) => amount + amountFoil
  );

  return (
    <StyledWrapper>
      <EditIcon
        onClick={() => setIsEditing(!isEditing)}
        isEditing={isEditing}
      />
      {Boolean(displayedSets.length) && (
        <List
          bordered
          size="small"
          style={{ fontSize: 12 }}
          dataSource={displayedSets}
          renderItem={({ id, ...rest }) => (
            <List.Item
              key={id}
              className={id === selectedCardId ? 'table-active ' : ''}
              onClick={isEditing ? undefined : () => onChangeSet(id)}
            >
              <CollectionListItem {...rest} isEditing={isEditing} />
            </List.Item>
          )}
        />
      )}
    </StyledWrapper>
  );
};
