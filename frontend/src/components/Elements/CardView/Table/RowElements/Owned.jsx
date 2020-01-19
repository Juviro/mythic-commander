import React from 'react';
import { Icon, Tooltip } from 'antd';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useMutation } from 'react-apollo';

import { editDeckCard } from '../../../../../queries';

const OwnedWrapper = styled.div`
  margin-left: 20px;
`;

export default ({ card: { owned, oracle_id } }) => {
  const { id: deckId } = useParams();
  const [editMutation] = useMutation(editDeckCard);

  const onToggleOwned = () => {
    editMutation({
      variables: {
        deckId,
        cardOracleId: oracle_id,
        newProps: { owned: !owned },
      },
    });
  };

  return (
    <OwnedWrapper>
      <Tooltip title={owned ? 'Remove from collection' : 'Add to collection'}>
        <Icon
          type={owned ? 'check-circle' : 'close-circle'}
          onClick={onToggleOwned}
          style={{ cursor: 'pointer', color: owned ? 'green' : 'red' }}
        />
      </Tooltip>
    </OwnedWrapper>
  );
};
