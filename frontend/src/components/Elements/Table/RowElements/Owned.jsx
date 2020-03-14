import React from 'react';
import { Tooltip } from 'antd';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useMutation } from 'react-apollo';

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { editDeckCard } from '../../../../queries';

const OwnedWrapper = styled.div`
  margin-left: 20px;
`;

export default ({ card: { owned, id } }) => {
  const { id: deckId } = useParams();
  const [editMutation] = useMutation(editDeckCard);

  const onToggleOwned = () => {
    editMutation({
      variables: {
        deckId,
        cardId: id,
        newProps: { owned: !owned },
      },
    });
  };

  const Icon = owned ? CheckCircleOutlined : CloseCircleOutlined;

  return (
    <OwnedWrapper>
      <Tooltip title={owned ? 'Remove from collection' : 'Add to collection'}>
        <Icon
          onClick={onToggleOwned}
          style={{ cursor: 'pointer', color: owned ? 'green' : 'red' }}
        />
      </Tooltip>
    </OwnedWrapper>
  );
};
