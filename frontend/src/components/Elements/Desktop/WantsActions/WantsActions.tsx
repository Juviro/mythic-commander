import MultiInput from 'components/Elements/Desktop/AddCards/MultIinput';
import DeleteList from 'components/Elements/Desktop/WantsActions/DeleteList';
import DuplicateList from 'components/Elements/Desktop/WantsActions/DuplicateList';
import UnlinkDeck from 'components/Elements/Desktop/WantsActions/UnlinkDeck';
import ExportAsText from 'components/Elements/Shared/ExportAsText';
import Menu from 'components/Elements/Shared/Menu';
import ProxyCards from 'components/Elements/Shared/ProxyCards';
import UserContext from 'components/Provider/UserProvider';
import React, { useContext } from 'react';
import { CardInputType } from 'types/graphql';
import { UnifiedWantsList } from 'types/unifiedTypes';

interface Props {
  canEdit: boolean;
  wantsList: UnifiedWantsList;
  onAddCards: (newCards: CardInputType[], name: string) => void;
  onDeleteWantsList?: () => void;
}

export const WantsActions = ({
  canEdit,
  wantsList,
  onAddCards,
  onDeleteWantsList,
}: Props) => {
  const { user } = useContext(UserContext);

  const canUnlink = wantsList.deck && canEdit;
  const baseActions = [
    <ExportAsText title={wantsList.name} cards={wantsList.cards} />,
    <ProxyCards id={wantsList.id} type="wants" />,
  ];

  const loggedInActions = [<DuplicateList id={wantsList.id} />];

  const editActions = [
    <MultiInput onAddCards={onAddCards} buttonProps={{ type: 'link' }} />,
    <DeleteList wantsList={wantsList} onDelete={onDeleteWantsList} />,
  ];

  const unlinkAction = <UnlinkDeck id={wantsList.id} />;

  const actions = baseActions;
  if (canUnlink) actions.push(unlinkAction);
  if (user) actions.push(...loggedInActions);
  if (canEdit) actions.push(...editActions);
  return <Menu actions={actions} placement="bottomRight" />;
};
