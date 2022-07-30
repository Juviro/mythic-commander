import React from 'react';
import styled from 'styled-components';
import { LinkOutlined, LoadingOutlined } from '@ant-design/icons';
import { Typography, Modal, List } from 'antd';
import { useQuery, useMutation } from '@apollo/client';

import { useToggle } from '../../../Hooks';
import message from '../../../../utils/message';
import { getDecks, linkWantsList } from './queries';
import { wantsListsForDeckMobile } from '../../../Mobile/Deck/LinkedWants/queries';

const StyledLinkButton = styled.div`
  width: ${({ large }) => (large ? 210 : 120)}px;
  height: ${({ large }) => (large ? 153 : 88)}px;
  display: flex;
  padding: 12px;
  margin: 4px 8px;
  border-radius: 4px;
  align-items: center;
  flex-direction: column;
  border: 1px solid #dddddd;
  justify-content: space-evenly;
  cursor: pointer;
  margin-bottom: 32px;
`;

const StyledDeckPreview = styled.img`
  width: 42px;
  height: 32px;
  margin-right: 8px;
  border-radius: 2px;
`;

export default ({ wantsList, large }) => {
  const [modalVisible, toggleIsModalVisible] = useToggle(false);
  const [isChanging, toggleIsChanging] = useToggle(false);
  const { data, loading } = useQuery(getDecks);
  const [mutate] = useMutation(linkWantsList);

  if (!wantsList) return null;

  const decks = data ? data.decks : [];

  const onLinkDeck = async (deckId) => {
    toggleIsModalVisible(false);
    toggleIsChanging(true);
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
    toggleIsChanging(false);
    const deckName = decks.find(({ id }) => id === deckId).name;
    message(`Linked to <b>${deckName}</b>!`);
  };

  return (
    <>
      <StyledLinkButton large={large} onClick={() => toggleIsModalVisible(true)}>
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
        onCancel={() => toggleIsModalVisible(false)}
        footer={null}
        centered
        bodyStyle={{
          maxHeight: '70vh',
          overflow: 'auto',
        }}
      >
        <List loading={loading} style={{ width: '100%' }} className="hoverable">
          {decks.map(({ id, name, imgSrc }) => (
            <List.Item key={id} onClick={() => onLinkDeck(id)}>
              <StyledDeckPreview src={imgSrc} />
              {name}
            </List.Item>
          ))}
        </List>
      </Modal>
    </>
  );
};
