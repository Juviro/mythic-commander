import React, { useEffect } from 'react';
import { Button } from 'antd';
import { useQuery } from 'react-apollo';
import { PrinterOutlined } from '@ant-design/icons';
import { useQueryParams, StringParam } from 'use-query-params';

import useDocumentTitle from 'components/Hooks/useDocumentTitle';
import { proxies, tokens } from './queries';
import { AddCards, PageCard, PageLayout } from '../../Elements/Desktop';
import ProxyCards from './ProxyCards';
import PrintView from './PrintView';
import { ProxyCard } from '../../../types/graphql';
import Flex from '../../Elements/Shared/Flex';
import useProxyCards from './useProxyCards';

// TODO:
// * Add option to change version
// * http://localhost:1234/proxy?type=cards&value=2b567975-53b5-4716-831d-e65612285d51 prints two page, should only print one

export default () => {
  const [{ filter, type, value }] = useQueryParams({
    filter: StringParam,
    type: StringParam,
    value: StringParam,
  });
  const { cards, onAddCards, onRemoveCard, onSetAmount, setCards } = useProxyCards();

  useDocumentTitle('Proxy Cards');

  const { data, loading } = useQuery(proxies, {
    variables: { value, type, filter },
    skip: !type,
  });
  const { data: tokenData } = useQuery(tokens);

  useEffect(() => {
    if (!data?.proxies) return;

    setCards(
      data.proxies.map((card: ProxyCard) => ({ ...card, amount: card.amount || 1 }))
    );

    // eslint-disable-next-line
  }, [data?.proxies]);

  return (
    <>
      <PrintView cards={cards} />
      <PageLayout>
        <PageCard title="Proxy Cards">
          <Flex justify="space-between">
            <AddCards
              isAdvanced={false}
              onAddCards={onAddCards}
              focusId="proxy"
              allowFoilInput={false}
              placeholder="Add a card or token..."
              additionalOptions={tokenData?.tokens}
              containedCardNames={cards?.map(({ name }) => name)}
            />
            <Button
              size="large"
              type="primary"
              onClick={() => window.print()}
              icon={<PrinterOutlined />}
            >
              Print
            </Button>
          </Flex>
        </PageCard>
        <PageCard>
          <ProxyCards
            cards={cards}
            loading={loading}
            onSetAmount={onSetAmount}
            onRemoveCard={onRemoveCard}
          />
        </PageCard>
      </PageLayout>
    </>
  );
};
