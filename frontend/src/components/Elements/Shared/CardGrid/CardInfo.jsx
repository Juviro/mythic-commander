import React from 'react';
import { Typography } from 'antd';

import Flex from 'components/Elements/Shared/Flex';
import OwnedBadge from 'components/Elements/Shared/OwnedBadge';
import PriceLabel from 'components/Elements/Shared/PriceLabel';
import { highlightText } from 'utils/highlightText';

export default ({
  card,
  loading = false,
  search,
  minimal = false,
  hidePrices = false,
}) => {
  if (loading) return null;

  return (
    <Flex direction="column" justify="center" style={{ width: '100%', marginTop: 4 }}>
      <Flex direction="row" justify="space-between">
        <Typography.Text ellipsis style={{ fontSize: 14 }}>
          {highlightText(search, card.name)}
        </Typography.Text>
        {card.owned && !minimal && <OwnedBadge style={{ fontSize: 14 }} />}
      </Flex>
      {!minimal && !hidePrices && <PriceLabel card={card} />}
    </Flex>
  );
};
