import React from 'react';
import styled from 'styled-components';
import { Icon, Input } from 'antd';
import Set from '../../../Elements/Set';

const StyledRow = styled.div`
  width: calc(100% - 10px);
  margin: 0 5px;
  display: flex;
  height: 20px;
  font-size: 12px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledSetWrapper = styled.div`
  max-width: ${({ isEditing }) =>
    isEditing ? 'calc(100% - 95px)' : 'calc(100% - 75px)'};
`;

const StyledAmountWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const StyledAmount = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  transition: all 0.2s;
  width: ${({ isLarge }) => (isLarge ? 40 : 35)}px;
`;

export default ({ set, set_name, amount, amountFoil, isEditing }) => {
  return (
    <StyledRow>
      <StyledSetWrapper isEditing={isEditing}>
        <Set setKey={set} name={set_name} />
      </StyledSetWrapper>
      <StyledAmountWrapper>
        <StyledAmount isLarge>
          {isEditing ? (
            <Input
              defaultValue={amount}
              size="small"
              style={{
                height: 'calc(100% - 2px)',
                width: 35,
                fontSize: 12,
                marginRight: 5,
              }}
              type="number"
            />
          ) : (
            Boolean(amount) && `${amount}x`
          )}
        </StyledAmount>
        <StyledAmount>
          {isEditing ? (
            <>
              <Input
                defaultValue={amountFoil}
                size="small"
                style={{ height: 'calc(100% - 2px)', width: 35, fontSize: 12 }}
                type="number"
              />
              <Icon
                style={{ marginLeft: 5, fontSize: 14 }}
                type="star"
                theme="twoTone"
                twoToneColor="#d4af37"
              />
            </>
          ) : (
            Boolean(amountFoil) && (
              <>
                {`${amountFoil}x`}
                <Icon
                  style={{ marginLeft: 5, fontSize: 14 }}
                  type="star"
                  theme="twoTone"
                  twoToneColor="#d4af37"
                />
              </>
            )
          )}
        </StyledAmount>
      </StyledAmountWrapper>
    </StyledRow>
  );
};
