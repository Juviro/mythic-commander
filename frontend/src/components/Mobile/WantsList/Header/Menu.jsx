import React, { useState } from 'react';
import { MoreOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Popconfirm } from 'antd';
import { useParams, withRouter } from 'react-router';
import { useMutation } from 'react-apollo';
import { deleteWantsList, duplicateWantsList } from '../queries';
import { wantsLists } from '../../WantsLists/queries';
import message from '../../../../utils/message';

const WantsListMenu = ({ history }) => {
  const { id: wantsListId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [mutateDelete] = useMutation(deleteWantsList);
  const [mutateDuplicate] = useMutation(duplicateWantsList);

  const onDelete = () => {
    setIsOpen(false);
    mutateDelete({
      variables: {
        wantsListId,
      },
      update: cache => {
        const existing = cache.readQuery({
          query: wantsLists,
        });
        if (!existing) return;

        const newWantsLists = existing.wantsLists.filter(
          ({ id }) => id !== wantsListId
        );

        cache.writeQuery({
          query: wantsLists,
          data: { wantsLists: newWantsLists },
        });
        message('Deleted wants list!');
      },
    });
    history.replace('/m/wants');
  };

  const onDuplicate = async () => {
    setIsOpen(false);
    mutateDuplicate({
      variables: {
        wantsListId,
      },
      update: (cache, { data }) => {
        const { duplicateWantsList: newWantsList } = data;
        const existing = cache.readQuery({
          query: wantsLists,
        });
        if (!existing) return;

        const newWantsLists = existing.wantsLists.concat(newWantsList);

        cache.writeQuery({
          query: wantsLists,
          data: { wantsLists: newWantsLists },
        });
        history.push(`/m/wants/${newWantsList.id}`);
      },
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={onDuplicate}>
        <CopyOutlined />
        <span>Duplicate</span>
      </Menu.Item>
      <Menu.Item key="2">
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
    </Menu>
  );
  return (
    <Dropdown overlay={menu} visible={isOpen} onVisibleChange={setIsOpen}>
      <MoreOutlined onClick={() => setIsOpen(!isOpen)} />
    </Dropdown>
  );
};

export default withRouter(WantsListMenu);
