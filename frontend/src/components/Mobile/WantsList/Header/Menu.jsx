import React, { useContext } from 'react';
import {
  MoreOutlined,
  DeleteOutlined,
  CopyOutlined,
  DisconnectOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu, Popconfirm } from 'antd';
import { withRouter } from 'react-router';
import { useMutation } from '@apollo/client';
import UserContext from 'components/Provider/UserProvider';
import WantsListVisibility from 'components/Elements/Shared/Visibility/WantsListVisibility';
import { deleteWantsList, duplicateWantsList, unlinkWantsList } from '../queries';
import { wantsListsMobile as wantsLists } from '../../WantsLists/queries';
import message from '../../../../utils/message';
import { wantsListsForDeckMobile } from '../../Deck/LinkedWants/queries';
import { useToggle } from '../../../Hooks';

const WantsListMenu = ({ history, wantsList, canEdit }) => {
  const { deck } = wantsList;
  const deckId = deck && deck.id;
  const wantsListId = wantsList.id;
  const { user } = useContext(UserContext);

  const [isOpen, toggleIsOpen] = useToggle(false);
  const [mutateDelete] = useMutation(deleteWantsList);
  const [mutateDuplicate] = useMutation(duplicateWantsList);
  const [mutateUnlink] = useMutation(unlinkWantsList);

  const canUnlink = Boolean(deck) && canEdit;

  if (!canEdit && !user) return null;

  const onDelete = () => {
    toggleIsOpen(false);
    mutateDelete({
      variables: {
        wantsListId,
      },
      refetchQueries: [
        {
          query: wantsListsForDeckMobile,
          variables: { deckId },
        },
      ],
      update: (cache) => {
        const existing = cache.readQuery({
          query: wantsLists,
        });
        if (!existing) return;

        const newWantsLists = existing.wantsLists.filter(({ id }) => id !== wantsListId);

        cache.writeQuery({
          query: wantsLists,
          data: { wantsLists: newWantsLists },
        });
        message('Deleted wants list!');
      },
    });
    history.replace('/m/my-wants');
  };

  const onDuplicate = async () => {
    toggleIsOpen(false);
    const { data } = await mutateDuplicate({
      variables: {
        wantsListId,
      },
      refetchQueries: [
        {
          query: wantsListsForDeckMobile,
          variables: { deckId },
        },
      ],
    });
    history.push(`/m/wants/${data.duplicateWantsList.id}`);
  };

  const onUnlink = async () => {
    toggleIsOpen(false);
    mutateUnlink({
      variables: { wantsListId },
      refetchQueries: [
        {
          query: wantsListsForDeckMobile,
          variables: { deckId },
        },
      ],
      optimisticResponse: () => ({
        __typename: 'Mutation',
        unlinkWantsList: {
          id: wantsListId,
          deck: null,
          __typename: 'WantsList',
        },
      }),
    });
    message('Unlinked Deck');
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={onDuplicate}>
        <CopyOutlined />
        <span>Duplicate</span>
      </Menu.Item>
      {canUnlink && (
        <Menu.Item key="2" onClick={onUnlink}>
          <DisconnectOutlined />
          <span>Unlink from Deck</span>
        </Menu.Item>
      )}
      {canEdit && (
        <>
          <Menu.Item key="3">
            <WantsListVisibility
              visibility={wantsList?.visibility}
              asListItem
              callback={toggleIsOpen}
            />
          </Menu.Item>
          <Menu.Item key="4">
            <Popconfirm
              placement="bottomRight"
              title="Are you sure you want to delete this list?"
              onConfirm={onDelete}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined />
              <span>Delete</span>
            </Popconfirm>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
  return (
    <Dropdown overlay={menu} visible={isOpen} onVisibleChange={toggleIsOpen}>
      <MoreOutlined onClick={toggleIsOpen} />
    </Dropdown>
  );
};

export default withRouter(WantsListMenu);
