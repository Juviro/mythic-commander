import React from 'react';
import { useQuery } from 'react-apollo';

import { PageCard, PageLayout } from 'components/Elements/Desktop';
import CardGrid from 'components/Elements/Shared/CardGrid';
import { getProxyUrl } from 'utils/getProxyUrl';
import { Button } from 'antd';
import { tokenFinder } from './queries';

const TokenFinder = () => {
  const { data, loading } = useQuery(tokenFinder);

  const onPrint = () => {
    if (!data) return;

    const proxyUrl = getProxyUrl(data.tokenFinder.map(({ id }) => id));
    window.open(proxyUrl, '_newtab');
  };

  return (
    <PageLayout>
      <PageCard
        // eslint-disable-next-line max-len
        title="Here you can find a complete list of all tokens that could be created by your active Decks"
        extra={
          <Button onClick={onPrint} type="primary" ghost>
            Proxy Tokens
          </Button>
        }
      >
        <CardGrid minimal hidePagination loading={loading} cards={data?.tokenFinder} />
      </PageCard>
    </PageLayout>
  );
};

export default TokenFinder;
