import React from 'react';
import { Dropdown, Menu, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import AddDeckCardsTo from './AddDeckCardsTo';
import { ProxyCards, ExportAsText } from '../../../../Elements/Shared';
import DuplicateDeck from '../../../../Mobile/Deck/EditDeck/DuplicateDeck';
import DeleteDeck from '../../../../Mobile/Deck/EditDeck/DeleteDeck';

export default ({ deck }) => {
  return (
    <Dropdown
      trigger="click"
      overlay={
        <Menu>
          <Menu.Item key="export">
            <ExportAsText cards={deck.cards} title={deck.name} />
          </Menu.Item>
          <Menu.Item key="proxy">
            <ProxyCards id={deck.id} type="deck" />
          </Menu.Item>
          <Menu.Item key="addToCollection">
            <AddDeckCardsTo cards={deck.cards} />
          </Menu.Item>
          <Menu.Item key="duplicate">
            <DuplicateDeck />
          </Menu.Item>
          <Menu.Item key="delete">
            <DeleteDeck />
          </Menu.Item>
        </Menu>
      }
    >
      <Button type="primary" size="normal">
        Actions <DownOutlined />
      </Button>
    </Dropdown>
  );
};
