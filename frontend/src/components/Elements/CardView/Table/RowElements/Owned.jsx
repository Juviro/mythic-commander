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
    <OwnedWrapper onClick={onToggleOwned} style={{ cursor: 'pointer' }}>
      <Tooltip title={owned ? 'Remove from collection' : 'Add to collection'}>
        {owned ? (
          <Icon type="check-circle" style={{ color: 'green' }} />
        ) : (
          <Icon type="close-circle" style={{ color: 'red' }} />
        )}
      </Tooltip>
    </OwnedWrapper>
  );
};
