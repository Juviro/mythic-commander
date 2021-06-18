import React from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';

import Flex from 'components/Elements/Shared/Flex';
import { CardInputType } from 'types/graphql';
import { UnifiedWantsList } from 'types/unifiedTypes';
import WantsActions from 'components/Elements/Desktop/WantsActions';

interface Props {
  name: string;
  id: string;
  numberOfCards?: number;
  wantsList?: UnifiedWantsList;
  onAddCards: (newCards: CardInputType[], name: string) => void;
  onDeleteWantsList: () => void;
}

export const Title = ({
  wantsList,
  name,
  id,
  numberOfCards,
  onAddCards,
  onDeleteWantsList,
}: Props) => {
  return (
    <Flex justify="space-between">
      <Typography.Title level={3}>
        <Link to={`/wants/${id}`}>{`${name} (${numberOfCards})`}</Link>
      </Typography.Title>
      {wantsList && (
        <WantsActions
          wantsList={wantsList}
          canEdit
          onAddCards={onAddCards}
          onDeleteWantsList={onDeleteWantsList}
        />
      )}
    </Flex>
  );
};
