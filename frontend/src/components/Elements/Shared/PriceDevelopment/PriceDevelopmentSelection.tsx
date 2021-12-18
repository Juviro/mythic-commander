import { Button, Space } from 'antd';
import useLocalStorage from 'components/Hooks/useLocalStorage';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { PriceDevelopment } from 'types/graphql';

const StyledSpace = styled(Space)`
  margin-top: 48px;
`;

const PRICE_KEYS = ['priceEur', 'priceEurFoil', 'priceUsd', 'priceUsdFoil'];

const labelMap = {
  priceUsd: 'Price USD',
  priceUsdFoil: 'Price USD Foil',
  priceEur: 'Price EUR',
  priceEurFoil: 'Price EUR Foil',
};

interface Props {
  selectedKey: string;
  onSelect: (value: string) => void;
  priceDevelopment: PriceDevelopment[];
}

const PriceDevelopmentSelection = ({
  onSelect,
  selectedKey,
  priceDevelopment,
}: Props) => {
  const [defaultKey, storeDefaultKey] = useLocalStorage('price-development', 'priceEur');
  const hasData = (key: string) => {
    return priceDevelopment?.some((price) => price[key] !== null);
  };

  const onClick = (key: string) => {
    storeDefaultKey(key);
    onSelect(key);
  };

  useEffect(() => {
    if (hasData(defaultKey)) {
      onSelect(defaultKey);
      return;
    }
    if (!priceDevelopment || hasData(selectedKey)) return;

    const firstKeyWithData = PRICE_KEYS.find((key) => hasData(key));
    if (firstKeyWithData) {
      onSelect(firstKeyWithData);
    }
    // eslint-disable-next-line
  }, [selectedKey, priceDevelopment, onSelect]);

  return (
    <StyledSpace size={12}>
      {PRICE_KEYS.map((key) => (
        <Button
          disabled={!hasData(key)}
          type={key === selectedKey ? 'primary' : 'ghost'}
          size="small"
          onClick={() => onClick(key)}
          key={key}
        >
          {labelMap[key]}
        </Button>
      ))}
    </StyledSpace>
  );
};

export default PriceDevelopmentSelection;
