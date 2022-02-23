import React, { useEffect } from 'react';
import { Button } from 'antd';
import { useQuery } from 'react-apollo';
import { PrinterOutlined } from '@ant-design/icons';
import { useQueryParams, StringParam } from 'use-query-params';

import useDocumentTitle from 'components/Hooks/useDocumentTitle';
import styled from 'styled-components';
import PageLayout, { PageCard } from 'components/Elements/Desktop/PageLayout';
import AddCards from 'components/Elements/Desktop/AddCards';
import { proxies, tokens } from './queries';
import ProxyCards from './ProxyCards';
import PrintView from './PrintView';
import { ProxyCard } from '../../../types/graphql';
import Flex from '../../Elements/Shared/Flex';
import useProxyCards from './useProxyCards';

const StyledHideOnPrint = styled.div`
  @media print {
    display: none;
  }
`;

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
    if (!type && !cards) {
      setCards([]);
      return;
    }

    if (!data?.proxies) return;

    setCards(
      data.proxies.map((card: ProxyCard) => ({ ...card, amount: card.amount || 1 }))
    );

    // eslint-disable-next-line
  }, [data?.proxies]);

  return (
    <>
      <PrintView cards={cards} />
      <StyledHideOnPrint>
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
      </StyledHideOnPrint>
    </>
  );
};
