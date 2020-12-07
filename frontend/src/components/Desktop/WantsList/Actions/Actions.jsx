import MultiInput from 'components/Elements/Desktop/AddCards/MultIinput';
import React from 'react';
import { ProxyCards, ExportAsText, Menu } from '../../../Elements/Shared';
import DeleteList from './DeleteList';
import DuplicateList from './DuplicateList';
import UnlinkDeck from './UnlinkDeck';

export default ({ wantsList, onAddCards }) => {
  if (!wantsList) return null;

  const canUnlink = wantsList.deck;
  const baseActions = [
    <MultiInput onAddCards={onAddCards} buttonProps={{ type: 'link' }} />,
    <ExportAsText title={wantsList.name} cards={wantsList.cards} />,
    <ProxyCards id={wantsList.id} type="wants" />,
    <DuplicateList id={wantsList.id} />,
    <DeleteList wantsList={wantsList} />,
  ];

  const unlinkAction = <UnlinkDeck id={wantsList.id} />;
  const actions = canUnlink ? [unlinkAction, ...baseActions] : baseActions;

  return <Menu actions={actions} placement="bottomRight" />;
};
