import React, { useContext } from 'react';

import CardContext from '../../CardProvider/CardProvider';
import CardList from '../../Elements/CardList';

export default () => {
  const { cards } = useContext(CardContext);

  return <CardList cards={cards} />;
};
