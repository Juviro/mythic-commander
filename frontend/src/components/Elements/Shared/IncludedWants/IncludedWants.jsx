import React from 'react';
import { Typography, Col, Row, List } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import CustomSkeleton from '../CustomSkeleton';
import getDynamicUrl from '../../../../utils/getDynamicUrl';
import AddToWants from './AddToWants';

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

export default ({ card, large, cardId }) => {
  if (!card || !card.containingWantsLists) {
    return <CustomSkeleton.Line />;
  }

  const { containingWantsLists } = card;

  const dataSource = containingWantsLists.sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <StyledWrapper>
      <AddToWants cardIds={[cardId || card.id]} oracle_id={card?.oracle_id} />
      {containingWantsLists.length ? (
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
      ) : (
        <Typography.Text type="secondary" style={{ marginTop: 32 }}>
          You don&apos;t have any wants lists containing this card
        </Typography.Text>
      )}
    </StyledWrapper>
  );
};
