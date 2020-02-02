import React, { useContext } from 'react';
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

export default ({ card }) => {
  const { id: deckId } = useParams();
  const { sets } = useContext(CardContext);
  const [editMutation] = useMutation(editDeckCard);
  if (!sets) return null;

  const onChangeSet = set => {
    editMutation({
      variables: { cardOracleId: card.oracle_id, deckId, newProps: { set } },
    });
  };

  const allCardSets = card.all_sets
    .map(setKey => ({ setKey, ...sets[setKey] }))
    .sort((a, b) => (a.name > b.name ? 1 : -1));
  const cardSet = { ...sets[card.set], setKey: card.set };

  return (
    <div onClick={e => e.stopPropagation()}>
      <Select
        size="small"
        defaultValue={cardSet.setKey}
        style={{ width: '100%' }}
        onSelect={onChangeSet}
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
