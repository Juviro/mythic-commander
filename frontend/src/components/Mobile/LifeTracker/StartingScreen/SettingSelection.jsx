import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

import { Flex } from '../../../Elements/Shared';
import NumberField from '../NumberField/NumberField';

const StyledNumberFieldWrapper = styled.div`
  width: 100%;
  height: 25vh;
`;

export default ({ title, value, step, onChange, maxValue, minValue }) => {
  return (
    <Flex direction="column">
      <Typography.Title level={3}>{title}</Typography.Title>
      <StyledNumberFieldWrapper>
        <NumberField
          step={step}
          value={value}
          setValue={onChange}
          maxValue={maxValue}
          minValue={minValue}
        />
      </StyledNumberFieldWrapper>
    </Flex>
  );
};
