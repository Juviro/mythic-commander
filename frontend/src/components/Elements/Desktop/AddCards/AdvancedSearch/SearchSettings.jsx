import React, { useState, useEffect, useContext } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import SelectFilter from 'components/Elements/Shared/Filter/SelectFilter/SelectFilter';
import CardContext from '../../../../Provider/CardProvider';
import SetIcon from '../../../Shared/SetIcon';
import { cardsBySet } from './queries';

const getSetIcon = (setKey) => <SetIcon setKey={setKey} style={{ marginRight: 6 }} />;

export default ({ setCardOptions }) => {
  const [setKey, setSetId] = useState(null);
  const { sets } = useContext(CardContext);

  const [fetchCards, { data, loading }] = useLazyQuery(cardsBySet, {
    variables: {
      setKey,
    },
    fetchPolicy: 'cache-first',
  });

  useEffect(() => {
    if (!setKey) return;
    setCardOptions({ loading: true });
    fetchCards();
    // eslint-disable-next-line
  }, [setKey]);

  useEffect(() => {
    if (loading || !data) return;
    if (!setKey) {
      setCardOptions({ cards: null });
      return;
    }
    setCardOptions({ cards: data.cardsBySet, cardPrefix: getSetIcon(setKey) });
    // eslint-disable-next-line
  }, [loading, data, setKey]);

  const allSets = Object.keys(sets)
    .map((key) => ({ value: key, ...sets[key] }))
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  const getPrefix = (key) => <SetIcon setKey={key} />;

  return (
    <SelectFilter
      onChange={setSetId}
      value={setKey}
      options={allSets}
      getPrefix={getPrefix}
      placeholder="Select Set..."
      allowClear
      size="small"
    />
  );
};
