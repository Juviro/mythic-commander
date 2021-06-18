import OneTimeInfoBox from 'components/Elements/Shared/OneTimeInfoBox';
import React from 'react';

export const PriceInfoAlert = () => {
  return (
    <OneTimeInfoBox
      id="deck.edhrec.priceInfo"
      style={{ marginTop: 24 }}
      showIcon
      message="Please note:"
      description={
        <>
          <p>
            All prices displayed in this list are taken from EDHREC and may vary from the
            prices displayed in the rest of the app, which are provided by scryfall.
          </p>
          <p> You can click on any card to see the prices from scryfall.</p>
        </>
      }
    />
  );
};
