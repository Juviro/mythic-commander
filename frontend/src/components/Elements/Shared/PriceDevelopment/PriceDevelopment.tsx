import { Divider } from 'antd';
import ValueChart from 'components/Elements/Shared/CollectionCharts/ValueChart';
import useLocalStorage from 'components/Hooks/useLocalStorage';
import React, { useEffect, useState } from 'react';
import { useLazyQuery } from 'react-apollo';
import styled from 'styled-components';
import { UnifiedCard } from 'types/unifiedTypes';
import formatDate from 'utils/formatDate';
import PriceDevelopmentPlaceholder from './PriceDevelopmentPlaceholder';
import PriceDevelopmentSelection from './PriceDevelopmentSelection';
import { getPriceDevelopment } from './queries';

const StyledWrapper = styled.section`
  margin: 32px 0;
`;

interface Props {
  selectedCard?: UnifiedCard;
}

const DATA_KEY = 'Price';

const PriceDevelopment = ({ selectedCard }: Props) => {
  const [initialPriceDevelopment] = useLocalStorage('price-development', 'Eur');
  const [selectedKey, setSelectedKey] = useState(initialPriceDevelopment);

  const [fetchPrices, { data, loading }] = useLazyQuery(getPriceDevelopment, {
    // legacy adapter: currency started with "price", which is omitted in the new schema
    variables: { cardId: selectedCard?.id, currency: selectedKey.replace('price', '') },
    fetchPolicy: 'cache-first',
  });

  useEffect(() => {
    if (!selectedCard?.id) return;
    fetchPrices();
    // eslint-disable-next-line
  }, [selectedCard?.id]);

  const unit = selectedKey.toLowerCase().includes('usd') ? '$' : '€';

  const formattedPriceDevelopment = data?.priceDevelopment?.map(({ date, price }) => ({
    date: formatDate(date, true),
    [DATA_KEY]: price,
  }));

  return (
    <StyledWrapper>
      <Divider>Price Development</Divider>
      {loading || !formattedPriceDevelopment?.length ? (
        <PriceDevelopmentPlaceholder loading={loading} />
      ) : (
        <ValueChart
          formattedData={formattedPriceDevelopment}
          dataKey={DATA_KEY}
          unit={unit}
        />
      )}
      <PriceDevelopmentSelection
        onSelect={setSelectedKey}
        selectedKey={selectedKey}
        foilOnly={!selectedCard?.nonfoil}
        nonfoilOnly={!selectedCard?.foil}
      />
    </StyledWrapper>
  );
};

export default PriceDevelopment;
