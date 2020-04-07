import React, { useState } from 'react';
import styled from 'styled-components';
import { LinkOutlined, LoadingOutlined } from '@ant-design/icons';
import { Typography, Modal, Select } from 'antd';
import { useQuery, useMutation } from 'react-apollo';
import { getDecks, linkWantsList } from './queries';

import message from '../../../../utils/message';
import { wantsListsForDeckMobile } from '../../Deck/LinkedWants/queries';

const StyledLinkButton = styled.div`
  width: 120px;
  height: 84px;
  display: flex;
  padding: 12px;
  margin: 4px 8px;
  border-radius: 4px;
  align-items: center;
  flex-direction: column;
  border: 1px solid #dddddd;
  justify-content: space-evenly;
`;

const StyledDeckPreview = styled.img`
  width: 42px;
  height: 32px;
  margin-right: 8px;
  border-radius: 2px;
`;

export default ({ wantsList }) => {
  const [modalVisible, setIsModalVisible] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const { data, loading } = useQuery(getDecks);
  const [mutate] = useMutation(linkWantsList);

  if (!wantsList) return null;

  const decks = data ? data.decks : [];

  const onLinkDeck = async deckId => {
    setIsModalVisible(false);
    setIsChanging(true);
    await mutate({
      variables: {
        deckId,
        wantsListId: wantsList.id,
      },
      refetchQueries: [
        {
          query: wantsListsForDeckMobile,
          variables: { deckId },
        },
      ],
    });
    setIsChanging(false);
    const deckName = decks.find(({ id }) => id === deckId).name;
    message(`Linked to <b>${deckName}</b>!`);
  };

  return (
    <>
      <StyledLinkButton onClick={() => setIsModalVisible(true)}>
        {isChanging ? (
          <LoadingOutlined style={{ fontSize: 24 }} />
        ) : (
          <LinkOutlined style={{ fontSize: 24 }} />
        )}
        <Typography.Text type="secondary">
          {isChanging ? 'Linking Deck...' : 'Link Deck'}
        </Typography.Text>
      </StyledLinkButton>
      <Modal
        title={
          <Typography.Text>
            {wantsList && `Link '${wantsList.name}' to a deck`}
          </Typography.Text>
        }
        visible={modalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
      >
        <Select
          loading={loading}
          style={{ width: '100%' }}
          onChange={onLinkDeck}
          placeholder="Select a Deck..."
        >
          {decks.map(({ id, name, imgSrc }) => (
            <Select.Option value={id} key={id}>
              <StyledDeckPreview src={imgSrc} />
              {name}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </>
  );
};
