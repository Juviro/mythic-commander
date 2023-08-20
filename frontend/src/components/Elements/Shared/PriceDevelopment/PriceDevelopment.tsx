import React, { useEffect, useState } from 'react';
import { Divider } from 'antd';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import ValueChart from 'components/Elements/Shared/CollectionCharts/ValueChart';
import useLocalStorage from 'components/Hooks/useLocalStorage';
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
  cardId?: string;
}

const DATA_KEY = 'Price';

const PriceDevelopment = ({ selectedCard, cardId }: Props) => {
  const [initialPriceDevelopment] = useLocalStorage('price-development', 'Eur');
  const [selectedKey, setSelectedKey] = useState(initialPriceDevelopment);

  // Used for the query if the current key is not available,
  // e.g. the card is only available in foil / nonfoil.
  // This tmp key is only used as long the main key can not be used
  // and will be reset afterwards.
  const [tmpSelectedKey, setTmpSelectedKey] = useState(null);

  const usedKey = tmpSelectedKey ?? selectedKey;

  const { data, loading } = useQuery(getPriceDevelopment, {
    variables: { cardId, currency: usedKey },
    fetchPolicy: 'cache-first',
    skip: !cardId,
  });

  const foilOnly = selectedCard && !selectedCard?.nonfoil;
  const nonfoilOnly = selectedCard && !selectedCard?.foil;

  useEffect(() => {
    if (selectedKey.includes('Foil') && nonfoilOnly) {
      setTmpSelectedKey(selectedKey.replace('Foil', ''));
    } else if (!selectedKey.includes('Foil') && foilOnly) {
      setTmpSelectedKey(`${selectedKey}Foil`);
    } else {
      setTmpSelectedKey(null);
    }
  }, [foilOnly, nonfoilOnly]);

  const unit = usedKey.toLowerCase().includes('usd') ? '$' : '€';

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
        selectedKey={usedKey}
        foilOnly={foilOnly}
        nonfoilOnly={nonfoilOnly}
      />
    </StyledWrapper>
  );
};

export default PriceDevelopment;
