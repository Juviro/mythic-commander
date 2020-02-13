import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import Set from '../../../Elements/Set';

const StyledRow = styled.div`
  width: calc(100% - 10px);
  margin: 0 5px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledSetWrapper = styled.div`
  max-width: calc(100% - 75px);
`;

const StyledAmountWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const StyledAmount = styled.div`
  width: 35px;
  font-size: 14px;
`;

export default ({ set, set_name, amount, amountFoil, isEditing }) => {
  return (
    <StyledRow>
      <StyledSetWrapper>
        <Set setKey={set} name={set_name} />
      </StyledSetWrapper>
      <StyledAmountWrapper>
        <StyledAmount>{Boolean(amount) && `${amount}x`}</StyledAmount>
        <StyledAmount>
          {Boolean(amountFoil) && (
            <>
              {`${amountFoil}x`}
              <Icon
                style={{ marginLeft: 5 }}
                type="star"
                theme="twoTone"
                twoToneColor="#d4af37"
              />
            </>
          )}
        </StyledAmount>
      </StyledAmountWrapper>
    </StyledRow>
  );
};
