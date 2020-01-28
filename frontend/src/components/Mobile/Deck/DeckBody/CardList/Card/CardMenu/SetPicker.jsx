import React, { useContext, useState } from 'react';
import { Select } from 'antd';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useMutation } from 'react-apollo';
import CardContext from '../../../../../../CardProvider/CardProvider';
import { editDeckCard } from '../../../../../../../queries';

const StyledSetIcon = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 4px;
`;

const StyledSetWrapper = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex-direction: row;
  align-items: center;

  justify-content: space-between;
`;

const StyledNameWrapper = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 4px;
  max-width: calc(50vw - 36px);
`;

export default ({ card }) => {
  const { id: deckId } = useParams();
  const { sets } = useContext(CardContext);
  const [editMutation] = useMutation(editDeckCard);
  const [isEditing, setIsEditing] = useState(false);
  if (!sets) return null;

  const onChangeSet = set => {
    setIsEditing(false);
    editMutation({ variables: { cardOracleId: card.oracle_id, deckId, newProps: { set } } });
  };

  const allCardSets = card.all_sets
    .map(setKey => ({ setKey, ...sets[setKey] }))
    .sort((a, b) => (a.name > b.name ? 1 : -1));
  const cardSet = { ...sets[card.set], setKey: card.set };

  const onClickIcon = e => {
    e.stopPropagation();
    setIsEditing(true);
  };

  if (!isEditing) {
    return (
      <StyledSetWrapper onClick={onClickIcon}>
        <StyledSetIcon src={cardSet.icon_svg_uri} alt={cardSet.name} />
        <StyledNameWrapper>{cardSet.name}</StyledNameWrapper>
      </StyledSetWrapper>
    );
  }

  return (
    <div onClick={e => e.stopPropagation()}>
      <Select
        defaultOpen
        size="small"
        defaultValue={cardSet.setKey}
        style={{ width: '40vw' }}
        onSelect={onChangeSet}
        onBlur={() => setIsEditing(false)}
      >
        {allCardSets.map(({ name, setKey, icon_svg_uri }) => (
          <Select.Option value={setKey} key={setKey}>
            <StyledSetIcon src={icon_svg_uri} alt={name} />
            {name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};
