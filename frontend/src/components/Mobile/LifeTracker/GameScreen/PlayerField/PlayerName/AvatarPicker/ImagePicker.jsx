import React, { useRef, useEffect, useContext } from 'react';
import { useLazyQuery } from '@apollo/client';

import Flex from 'components/Elements/Shared/Flex';
import CardSearch from 'components/Elements/Shared/CardSearch';
import ImageList from './ImageList';
import { cardImages } from './queries';
import FullscreenModalContext from '../../../../../../Provider/FullscreenModalProvider';

const ImagePicker = ({ onPick, currentSelection }) => {
  const searchInputRef = useRef(null);
  const { getContainer } = useContext(FullscreenModalContext);
  const [fetchImages, { called, data, loading }] = useLazyQuery(cardImages, {
    fetchPolicy: 'cache-first',
  });

  const onSearchCard = ({ id }) => {
    fetchImages({ variables: { cardId: id } });
    searchInputRef.current.blur();
  };

  useEffect(() => {
    searchInputRef.current.blur();
    const firstElement = data?.cardImages[0];
    if (loading || !firstElement) return;

    onPick(firstElement);
    // eslint-disable-next-line
  }, [loading]);

  return (
    <Flex direction="column">
      <CardSearch
        onSearch={onSearchCard}
        width="100%"
        loading={loading}
        autoFocus={false}
        ref={searchInputRef}
        getContainer={getContainer}
      />
      {called && (
        <ImageList
          images={data?.cardImages}
          loading={loading}
          onPick={onPick}
          currentSelection={currentSelection}
        />
      )}
    </Flex>
  );
};

export default React.memo(ImagePicker);
