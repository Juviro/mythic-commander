import React from 'react';
import { Select, Typography } from 'antd';
import { useQuery, useMutation } from '@apollo/client';

import styled from 'styled-components';
import { addCardsToWantsList, wantsLists as wantsListsQuery } from './queries';
import message from '../../../../utils/message';
import { wantsList as wantsListQuery } from '../../../Mobile/WantsList/queries';
import { getCardByOracleId } from '../../../Mobile/Card/queries';
import { StyledDeckThumbnail } from '../IncludedDecks/AddToDeck';
import DeckCoverLetter from '../../Desktop/OverviewList/DeckCoverLetter';
import Flex from '../Flex';
import isMobile from '../../../../utils/isMobile';

const NEW_LIST_DUMMY_ID = 'new-wants-list';
const DEFAULT_NEW_LIST_NAME = 'New Wants List';

export const StyledCoverLetterWrapper = styled.div`
  width: 38px;
  height: 28px;
  margin-right: 8px;
  border-radius: 2px;
  display: inline-block;
  border-radius: 2px;
  overflow: hidden;
`;

export default ({
  cardIds,
  oracle_id,
  newListName = DEFAULT_NEW_LIST_NAME,
  title = 'Add to wants list...',
  loading: parentLoading,
}) => {
  const { data, loading } = useQuery(wantsListsQuery);
  const [mutate] = useMutation(addCardsToWantsList);

  const isLoading = loading || parentLoading;

  const { wantsLists } = data ?? {};

  const onAddToList = (id) => {
    const { name } = wantsLists.find((wantsList) => wantsList.id === id) || {
      name: newListName,
    };

    const refetchQueries = [];
    if (id !== NEW_LIST_DUMMY_ID) {
      refetchQueries.push({
        query: wantsListQuery,
        variables: { id },
      });
    }
    if (oracle_id) {
      refetchQueries.push({
        query: getCardByOracleId,
        variables: { oracle_id },
      });
    }

    mutate({
      variables: {
        wantsListId: id,
        wantsListName: id === NEW_LIST_DUMMY_ID ? newListName : undefined,
        cards: cardIds.map((cardId) => ({ id: cardId })),
      },
      refetchQueries,
    });

    message(`Added to <b>${name}</b>!`);
  };

  const addDeckElement = {
    name: '+ New Wants List',
    id: NEW_LIST_DUMMY_ID,
  };

  const sortByName = (a, b) => (a.name.toLowerCase() >= b.name.toLowerCase() ? 1 : -1);

  const selectOptions = isLoading
    ? null
    : [addDeckElement, ...[...wantsLists].sort(sortByName)];

  return (
    <Select
      style={{ width: '100%' }}
      onChange={onAddToList}
      value={title}
      loading={isLoading}
      disabled={isLoading}
      showSearch={!isMobile()}
      filterOption={(input, { name }) => name.toLowerCase().includes(input.toLowerCase())}
    >
      {selectOptions?.map(({ id, name, deck }) => (
        <Select.Option value={id} key={id} name={name}>
          <Flex align="center">
            {deck?.imgSrc ? (
              <StyledDeckThumbnail src={deck?.imgSrc} />
            ) : (
              <StyledCoverLetterWrapper>
                {name !== addDeckElement.name && (
                  <DeckCoverLetter id={id} name={name} size={14} />
                )}
              </StyledCoverLetterWrapper>
            )}
            <Typography.Text type={id === NEW_LIST_DUMMY_ID ? 'secondary' : 'primary'}>
              {name}
            </Typography.Text>
          </Flex>
        </Select.Option>
      ))}
    </Select>
  );
};
