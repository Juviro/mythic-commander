import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { StringParam, useQueryParams } from 'use-query-params';
import { FilterOutlined } from '@ant-design/icons';

import { blendIn } from '../../../../Animations';

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const StyledText = styled.span`
  &:before {
    content: 'Filter';
  }
`;

const StyledButton = styled(Button)`
  animation: ${blendIn} 0.3s linear;
`;

const filterAttrs = [
  'search',
  'colors',
  'creatureType',
  'isLegendary',
  'cardType',
];

export default ({ showIcon = true }) => {
  const [filter, setFilter] = useQueryParams(
    filterAttrs.reduce((acc, val) => ({ ...acc, [val]: StringParam }), {})
  );

  const onResetSearch = e => {
    e.stopPropagation();
    setFilter(filterAttrs.reduce((acc, val) => ({ ...acc, [val]: null }), {}));
  };

  const canResetSearch = filterAttrs.some(attr => filter[attr]);

  return (
    <StyledHeader>
      <div>
        <StyledText />
      </div>
      <div>
        {canResetSearch && (
          <StyledButton
            danger
            type="link"
            onClick={onResetSearch}
            style={{ height: 14, lineHeight: 0 }}
          >
            reset
          </StyledButton>
        )}
        {showIcon && <FilterOutlined />}
      </div>
    </StyledHeader>
  );
};
