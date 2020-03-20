import React from 'react';
import { Select, Typography, Col, Row, List } from 'antd';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useQuery, useMutation } from 'react-apollo';

import styled from 'styled-components';
import { wantsLists as wantsListsQuery } from '../WantsLists/queries';
import { CustomSkeleton } from '../../Elements';
import { addCardsToWantsList } from './queries';
import message from '../../../utils/message';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default ({ card }) => {
  const { cardId } = useParams();
  const { data } = useQuery(wantsListsQuery);
  const [mutate] = useMutation(addCardsToWantsList);

  if (!data || !card) return <CustomSkeleton.Line />;

  const { containingWantsLists } = card;
  const { wantsLists } = data;

  const onAddToList = id => {
    const { name } = wantsLists.find(wantsList => wantsList.id === id);
    const updatedWantsList = containingWantsLists.find(
      wantsList => wantsList.id === id
    ) || { name, id, amount: 0, __typename: 'ContainingList' };
    updatedWantsList.amount++;

    mutate({
      variables: {
        wantsListId: id,
        cards: [{ id: cardId }],
      },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        addCardsToWantsList: [
          {
            ...card,
            containingWantsLists: containingWantsLists
              .filter(wantsList => wantsList.id !== id)
              .concat(updatedWantsList),
          },
        ],
      }),
    });

    message(`Added to <b>${name}</b>!`);
  };

  const dataSource = containingWantsLists.sort((a, b) =>
    a.name > b.name ? 1 : -1
  );

  return (
    <StyledWrapper>
      {Boolean(containingWantsLists.length) && (
        <List
          size="small"
          dataSource={dataSource}
          renderItem={({ id, name, amount }) => (
            <List.Item style={{ padding: 0 }}>
              <Link to={`/m/wants/${id}`} style={{ width: '100%' }}>
                <Row>
                  <Col span={3}>
                    <Typography.Text strong>{`${amount}x`}</Typography.Text>
                  </Col>
                  <Col span={21}>{name}</Col>
                </Row>
              </Link>
            </List.Item>
          )}
        />
      )}
      <Select
        style={{ width: '100%', marginTop: 16 }}
        onChange={onAddToList}
        value="Add to list..."
      >
        {wantsLists.map(({ id, name }) => (
          <Select.Option value={id} key={id}>
            {name}
          </Select.Option>
        ))}
      </Select>
    </StyledWrapper>
  );
};
