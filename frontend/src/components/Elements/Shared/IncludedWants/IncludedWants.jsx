import React from 'react';
import { Typography, List } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import getDynamicUrl from '../../../../utils/getDynamicUrl';
import AddToWants, { StyledCoverLetterWrapper } from './AddToWants';
import { StyledDeckThumbnail } from '../IncludedDecks/AddToDeck';
import DeckCoverLetter from '../../Desktop/OverviewList/DeckCoverLetter';
import Flex from '../Flex';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const NEW_LIST_DUMMY_ID = 'new-wants-list';

const WantsListLink = ({ id, name }) => {
  if (id === NEW_LIST_DUMMY_ID) return name;
  return (
    <Link to={getDynamicUrl(`/wants/${id}`)}>
      <Typography.Text
        ellipsis
        style={{
          color: 'inherit',
          maxWidth: '100%',
        }}
      >
        {name}
      </Typography.Text>
    </Link>
  );
};

export default ({ card, large, cardId, loading }) => {
  const { containingWantsLists } = card ?? {};

  const dataSource =
    containingWantsLists &&
    [...containingWantsLists]?.sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <StyledWrapper>
      <AddToWants
        cardIds={[cardId || card?.id]}
        oracle_id={card?.oracle_id}
        loading={loading}
      />
      {loading ? (
        <div style={{ height: 54 }} />
      ) : containingWantsLists?.length ? (
        <List
          size="small"
          style={{ margin: '16px 0 24px' }}
          dataSource={dataSource}
          renderItem={({ id, name, deck }) => (
            <List.Item style={{ padding: large ? 8 : 4, height: 44 }}>
              <Flex align="center">
                {deck?.imgSrc ? (
                  <StyledDeckThumbnail src={deck?.imgSrc} />
                ) : (
                  <StyledCoverLetterWrapper>
                    <DeckCoverLetter id={id} name={name} size={14} />
                  </StyledCoverLetterWrapper>
                )}
                <WantsListLink id={id} name={name} />
              </Flex>
            </List.Item>
          )}
        />
      ) : (
        <Typography.Text type="secondary" style={{ marginTop: 32 }}>
          You don&apos;t have any wants lists containing this card
        </Typography.Text>
      )}
    </StyledWrapper>
  );
};
