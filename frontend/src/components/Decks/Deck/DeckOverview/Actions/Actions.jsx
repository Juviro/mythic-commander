import React from 'react';
import styled from 'styled-components';
import { Menu, Dropdown, Icon } from 'antd';
import { useMutation } from 'react-apollo';
import { getCollection, deleteFromCollection } from '../../../../../queries';

const StyledCardPreview = styled.div`
  padding-left: 20px;
`;

const getOptions = (card, onDelete) => {
  return [
    {
      name: 'DeleteFromDeck',
      onClick: () =>
        onDelete({
          variables: { cardId: card.id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteFromCollection: card.id,
          },
          update: (cache, { data: { deleteFromCollection: cardId } }) => {
            const newData = cache.readQuery({ query: getCollection });
            const updatedData = newData.collection.filter(({ id }) => id !== cardId);
            cache.writeQuery({ query: getCollection, data: { collection: updatedData } });
          },
        }),
    },
  ];
};

export default ({ card }) => {
  const [onDelete] = useMutation(deleteFromCollection);
  // const options = getOptions(card, onDelete);

  const options = [
    {
      name: 'Change Version',
      icon: 'swap',
    },
    {
      name: 'Add to collection',
      icon: 'plus',
    },
    {
      name: 'Make Commander',
      icon: 'star',
    },
    {
      name: 'divider1',
      isDivider: true,
    },
    {
      name: 'Delete',
      icon: 'delete',
    },
  ];

  const menu = (
    <Menu>
      {options.map(({ name, icon, isDivider }) =>
        isDivider ? (
          <Menu.Divider key={name} />
        ) : (
          <Menu.Item key={name}>
            <Icon type={icon} />
            <span>{name}</span>
          </Menu.Item>
        )
      )}
    </Menu>
  );

  return (
    <StyledCardPreview>
      <Dropdown overlay={menu} trigger={['click']}>
        <Icon type="ellipsis" />
      </Dropdown>
    </StyledCardPreview>
  );
};
