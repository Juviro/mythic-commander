import React from 'react';
import styled from 'styled-components';
import { Col, Input } from 'antd';

import { FoilIcon } from '../../../Elements/Shared';

const StyledAmount = styled.span`
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
`;

export default ({ isEditing, amount = 0, isFoil, cardId, onChangeAmount }) => {
  if (!isEditing) {
    return (
      <Col span={isFoil ? 5 : 3}>
        {Boolean(amount) && (
          <StyledAmount>
            {`${amount}x`}
            {isFoil && <FoilIcon />}
          </StyledAmount>
        )}
      </Col>
    );
  }

  return (
    <Col span={isFoil ? 8 : 5}>
      <Input
        type="number"
        defaultValue={amount}
        onClick={e => e.stopPropagation()}
        onChange={e => onChangeAmount(e.target.value, cardId, isFoil)}
        addonAfter={isFoil ? <FoilIcon /> : undefined}
      />
    </Col>
  );
};
