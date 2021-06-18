import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

import Flex from 'components/Elements/Shared/Flex';
import Avatar from '../../PlayerName/Avatar';
import NumberField from '../../../../NumberField';
import { INFECT } from '../../../useGameState';

const StyledNumberField = styled.div`
  height: 100%;
  width: 150px;
  font-size: 6px;
`;

export default ({ onSetDamage, damage, id, name, color, img }) => {
  return (
    <Flex direction="row" align="center" justify="space-between" style={{ height: 50 }}>
      <Flex direction="row" align="center" justify="space-between">
        <Avatar img={img} color={color} isInfect={id === INFECT} />
        <Typography.Text
          ellipsis
          style={{ fontSize: 20, marginLeft: 8, maxWidth: 'calc(100vw - 270px' }}
        >
          {name}
        </Typography.Text>
      </Flex>
      <StyledNumberField>
        <NumberField value={damage} minValue={0} setValue={onSetDamage} />
      </StyledNumberField>
    </Flex>
  );
};
