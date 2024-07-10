import React from 'react';
import { Select, Typography } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';

import message from '../../../../utils/message';
import { getCardByOracleId } from '../../../Mobile/Card/queries';
import { addCardsToDeckDesktop } from '../../../Desktop/Deck/queries';
import { getDecksDesktop } from '../../../Desktop/Decks/queries';
import isMobile from '../../../../utils/isMobile';

const NEW_LIST_DUMMY_ID = 'new-deck';
const DEFAULT_NEW_LIST_NAME = 'New Deck';

export const StyledDeckThumbnail = styled.img`
  width: 38px;
  height: auto;
  margin-right: 8px;
  border-radius: 2px;
`;

const AddToDeck = ({
  cardIds,
  oracle_id,
  newListName = DEFAULT_NEW_LIST_NAME,
  title = 'Add to deck...',
  loading: parentLoading,
}) => {
  const { data, loading } = useQuery(getDecksDesktop);
  const [mutate] = useMutation(addCardsToDeckDesktop);

  const { decks } = data ?? {};

  const onAddToList = (id) => {
    const { name } = decks.find((wantsList) => wantsList.id === id) || {
      name: newListName,
    };

    const refetchQueries = [];
    if (oracle_id) {
      refetchQueries.push({
        query: getCardByOracleId,
        variables: { oracle_id },
      });
    }

    mutate({
      variables: {
        deckId: id,
        deckName: id === NEW_LIST_DUMMY_ID ? newListName : undefined,
        cards: cardIds.map((cardId) => ({ id: cardId })),
      },
      refetchQueries,
    });

    message(`Added to <b>${name}</b>!`);
  };

  const addDeckElement = {
    name: '+ New Deck',
    id: NEW_LIST_DUMMY_ID,
  };

  const sortByName = (a, b) => (a.name.toLowerCase() >= b.name.toLowerCase() ? 1 : -1);

  const isLoading = loading || parentLoading;
  const selectOptions =
    decks && !isLoading ? [addDeckElement, ...[...decks].sort(sortByName)] : [];

  return (
    <Select
      onChange={onAddToList}
      value={title}
      loading={isLoading}
      disabled={isLoading}
      showSearch={!isMobile()}
      filterOption={(input, { name }) => name.toLowerCase().includes(input.toLowerCase())}
      options={selectOptions.map(({ id, name, imgSrc }) => ({
        label: (
          <>
            <StyledDeckThumbnail src={imgSrc} />
            <Typography.Text type={id === NEW_LIST_DUMMY_ID ? 'secondary' : 'primary'}>
              {name}
            </Typography.Text>
          </>
        ),
        value: id,
      }))}
    />
  );
};

export default AddToDeck;
