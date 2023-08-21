import React from 'react';
import { Typography } from 'antd';

import Flex from 'components/Elements/Shared/Flex';
import NumberField from '../NumberField/NumberField';

export default ({
  title,
  value,
  step = undefined,
  onChange,
  maxValue = undefined,
  minValue,
}) => {
  return (
    <Flex direction="row" align="center">
      <Typography.Text style={{ fontWeight: 400, fontSize: 20, flex: 1 }}>
        {title}
      </Typography.Text>
      <NumberField
        small
        step={step}
        value={value}
        setValue={onChange}
        maxValue={maxValue}
        minValue={minValue}
      />
    </Flex>
  );
};
