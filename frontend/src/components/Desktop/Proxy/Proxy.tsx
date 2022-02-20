import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { useQueryParams, StringParam } from 'use-query-params';

import useDocumentTitle from 'components/Hooks/useDocumentTitle';
import { Button } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { proxies } from './queries';
import { AddCards, PageCard, PageLayout } from '../../Elements/Desktop';
import ProxyCards from './ProxyCards';
import PrintView from './PrintView';
import { ProxyCard } from '../../../types/graphql';
import Flex from '../../Elements/Shared/Flex';

export default () => {
  const [{ filter, type, value }] = useQueryParams({
    filter: StringParam,
    type: StringParam,
    value: StringParam,
  });
  const [cards, setCards] = useState<ProxyCard[] | null>(null);

  useDocumentTitle('Proxy Cards');

  const { data, loading } = useQuery(proxies, {
    variables: { value, type, filter },
  });

  useEffect(() => {
    if (cards || !data?.proxies) return;

    setCards(
      data.proxies.map((card: ProxyCard) => ({ ...card, amount: card.amount || 1 }))
    );

    // eslint-disable-next-line
  }, [data?.proxies]);

  const onSetAmount = (cardId: string, amount: number) => {
    const newAmount = Math.max(1, amount);
    setCards(
      cards?.map((card) => (card.id === cardId ? { ...card, amount: newAmount } : card))
    );
  };

  const onRemoveCard = (cardId: string) => {
    setCards(cards?.filter((card) => card.id !== cardId));
  };

  const onAddCards = (card: ProxyCard[]) => {
    if (!cards) return;

    const cardIndex = cards.findIndex((c) => c.id === card[0].id);
    if (cardIndex === -1) {
      setCards([...card, ...cards]);
    } else {
      const newCards = cards.map((c) => ({
        ...c,
        amount: c.id === card[0].id ? c.amount + 1 : c.amount,
      }));
      setCards(newCards);
    }
  };

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
              placeholder="Add a card..."
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
