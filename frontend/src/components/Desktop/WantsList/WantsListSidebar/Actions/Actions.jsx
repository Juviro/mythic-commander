import React from 'react';
import { List } from 'antd';
import { Flex, ProxyCards } from '../../../../Elements/Shared';
import DeleteList from './DeleteList';
import ExportAsText from './ExportAsText';
import DuplicateList from './DuplicateList';
import UnlinkDeck from './UnlinkDeck';

export default ({ wantsList }) => {
  const canUnlink = wantsList.deck;
  const baseActions = [
    {
      key: 'export',
      component: <ExportAsText wantsList={wantsList} />,
    },
    {
      key: 'proxy',
      component: <ProxyCards id={wantsList.id} />,
    },
    {
      key: 'duplicate',
      component: <DuplicateList id={wantsList.id} />,
    },
    {
      key: 'delete',
      component: <DeleteList wantsList={wantsList} />,
    },
  ];
  const unlinkAction = {
    key: 'unlink',
    component: <UnlinkDeck id={wantsList.id} />,
  };

  const actions = canUnlink ? [unlinkAction, ...baseActions] : baseActions;

  return (
    <Flex direction="column">
      <List style={{ width: '100%' }}>
        {actions.map(({ component, key }) => (
          <List.Item key={key} style={{ marginLeft: -12 }}>
            {component}
          </List.Item>
        ))}
      </List>
    </Flex>
  );
};
