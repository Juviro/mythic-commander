import React from 'react';
import { Select, Typography, Col, Row, List } from 'antd';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo';
import styled from 'styled-components';

import CustomSkeleton from '../CustomSkeleton';
import { addCardsToWantsList, wantsLists as wantsListsQuery } from './queries';
import message from '../../../utils/message';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const NEW_LIST_DUMMY_ID = 'new-deck';

const WantsListLink = ({ id, name }) => {
  if (id === NEW_LIST_DUMMY_ID) return name;
  return (
    <Link to={`/m/wants/${id}`}>
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

export default ({ card, large, cardId }) => {
  const { data } = useQuery(wantsListsQuery);
  const [mutate] = useMutation(addCardsToWantsList);

  if (!data || !card || !card.containingWantsLists)
    return <CustomSkeleton.Line />;

  const { containingWantsLists } = card;
  const { wantsLists } = data;

  const onAddToList = id => {
    const { name } = wantsLists.find(wantsList => wantsList.id === id) || {
      name: 'New Wants List',
    };

    mutate({
      variables: {
        wantsListId: id,
        cards: [{ id: cardId || card.id }],
      },
      refetchQueries: ['wantsLists'],
    });

    message(`Added to <b>${name}</b>!`);
  };

  const dataSource = containingWantsLists.sort((a, b) =>
    a.name > b.name ? 1 : -1
  );

  const addDeckElement = {
    name: '+ New list',
    id: NEW_LIST_DUMMY_ID,
  };

  const selectOptions = [addDeckElement, ...wantsLists];

  return (
    <StyledWrapper>
      <Select
        style={{ width: '100%' }}
        onChange={onAddToList}
        value="Add to wants list..."
      >
        {selectOptions.map(({ id, name }) => (
          <Select.Option value={id} key={id}>
            <Typography.Text
              type={id === NEW_LIST_DUMMY_ID ? 'secondary' : 'primary'}
            >
              {name}
            </Typography.Text>
          </Select.Option>
        ))}
      </Select>
      {Boolean(containingWantsLists.length) && (
        <List
          size="small"
          style={{ margin: '16px 0 24px' }}
          dataSource={dataSource}
          renderItem={({ id, name, amount }) => (
            <List.Item style={{ padding: large ? undefined : 0 }}>
              <Row style={{ width: '100%' }}>
                <Col span={2}>
                  <Typography.Text strong>{`${amount}x`}</Typography.Text>
                </Col>
                <Col span={22}>
                  <WantsListLink id={id} name={name} />
                </Col>
              </Row>
            </List.Item>
          )}
        />
      )}
    </StyledWrapper>
  );
};