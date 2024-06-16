import React from 'react';
import { Button, Space } from 'antd';
import styled from 'styled-components';

const StyledSpace = styled(Space)`
  margin-top: 48px;
`;

const PRICE_KEYS = ['Eur', 'EurFoil', 'Usd', 'UsdFoil'];

const labelMap = {
  Usd: 'Price USD',
  UsdFoil: 'Price USD Foil',
  Eur: 'Price EUR',
  EurFoil: 'Price EUR Foil',
};

interface Props {
  selectedKey: string;
  onSelect: (value: string) => void;
  nonfoilOnly: boolean;
  foilOnly: boolean;
}

const PriceDevelopmentSelection = ({
  onSelect,
  selectedKey,
  foilOnly,
  nonfoilOnly,
}: Props) => {
  return (
    <StyledSpace size={12}>
      {PRICE_KEYS.map((key) => (
        <Button
          type="primary"
          ghost={key !== selectedKey}
          disabled={
            (foilOnly && !key.includes('Foil')) || (nonfoilOnly && key.includes('Foil'))
          }
          size="small"
          onClick={() => onSelect(key)}
          key={key}
        >
          {labelMap[key]}
        </Button>
      ))}
    </StyledSpace>
  );
};

export default PriceDevelopmentSelection;
