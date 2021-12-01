import { Divider } from 'antd';
import ValueChart from 'components/Elements/Shared/CollectionCharts/ValueChart';
import useLocalStorage from 'components/Hooks/useLocalStorage';
import React from 'react';
import styled from 'styled-components';
import { UnifiedCard } from 'types/unifiedTypes';
import formatDate from 'utils/formatDate';
import PriceDevelopmentPlaceholder from './PriceDevelopmentPlaceholder';
import PriceDevelopmentSelection from './PriceDevelopmentSelection';

const StyledWrapper = styled.section`
  margin: 32px 0;
`;

interface Props {
  selectedCard: UnifiedCard;
  loading: boolean;
}

const DATA_KEY = 'Price';

const PriceDevelopment = ({ selectedCard, loading }: Props) => {
  const priceDevelopment = selectedCard?.priceDevelopment;
  const [selectedKey, setSelectedKey] = useLocalStorage('price-development', 'priceUsd');

  const unit = selectedKey.toLowerCase().includes('usd') ? '$' : '€';

  const formattedPriceDevelopment = priceDevelopment?.map(({ date, ...rest }) => ({
    date: formatDate(date, true),
    [DATA_KEY]: rest[selectedKey],
  }));

  const hasData =
    !loading && formattedPriceDevelopment?.some((item) => item[DATA_KEY] !== null);

  return (
    <StyledWrapper>
      <Divider>Price Development</Divider>
      {hasData ? (
        <ValueChart
          formattedData={formattedPriceDevelopment}
          dataKey={DATA_KEY}
          unit={unit}
        />
      ) : (
        <PriceDevelopmentPlaceholder loading={loading} />
      )}
      <PriceDevelopmentSelection
        onSelect={setSelectedKey}
        selectedKey={selectedKey}
        priceDevelopment={priceDevelopment}
      />
    </StyledWrapper>
  );
};

export default PriceDevelopment;
