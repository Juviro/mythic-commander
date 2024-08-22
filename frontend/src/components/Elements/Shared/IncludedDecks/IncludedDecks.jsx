import React from 'react';
import { Divider, List, Typography } from 'antd';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import getDynamicUrl from '../../../../utils/getDynamicUrl';
import Flex from '../Flex';
import AddToDeck, { StyledDeckThumbnail } from './AddToDeck';
import useGroupByDeckType from '../../../../hooks/useGroupByDeckType';
import DeckStatusTag from '../../Desktop/OverviewList/DeckStatus/DeckStatusTag';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
  max-height: 500px;
  overflow: auto;
`;

const StyledDivider = styled(Divider)`
  &::before {
    content: none !important;
  }

  & > span {
    padding-left: 0;
  }
`;

const NEW_DECK_DUMMY_ID = 'new-deck';

const DeckLink = ({ id, name }) => {
  if (id === NEW_DECK_DUMMY_ID) return name;
  return (
    <Link to={getDynamicUrl(`/decks/${id}`)}>
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

export default ({ card, large, loading }) => {
  const { containingDecks } = card && !loading ? card : {};

  const dataSource =
    containingDecks && [...containingDecks].sort((a, b) => (a.name > b.name ? 1 : -1));

  const decksByType = useGroupByDeckType(dataSource, true);

  return (
    <StyledWrapper>
      <AddToDeck cardIds={[card?.id]} oracle_id={card?.oracle_id} loading={loading} />

      {loading ? (
        <div style={{ height: 54 }} />
      ) : containingDecks?.length ? (
        <>
          {decksByType.map(({ decks, status }) => (
            <React.Fragment key={status}>
              <StyledDivider orientation="left" style={{ marginBottom: 0 }}>
                <DeckStatusTag status={status} />
              </StyledDivider>
              <List
                rowKey="id"
                size="small"
                style={{ marginTop: -16 }}
                dataSource={decks}
                renderItem={({ id, name, imgSrc }) => (
                  <List.Item style={{ padding: large ? 8 : 4, height: 44 }}>
                    <Flex align="center">
                      <StyledDeckThumbnail src={imgSrc} />
                      <DeckLink id={id} name={name} />
                    </Flex>
                  </List.Item>
                )}
              />
            </React.Fragment>
          ))}
        </>
      ) : (
        <Typography.Text type="secondary" style={{ marginTop: 32 }}>
          You don&apos;t have any deck containing this card
        </Typography.Text>
      )}
    </StyledWrapper>
  );
};
