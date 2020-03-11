import React from 'react';
import { Table, Skeleton } from 'antd';
import styled from 'styled-components';

import columns from './columns';
import mkmIcon from '../../../../assets/purchaseIcons/mkm.png';
import ckIcon from '../../../../assets/purchaseIcons/ck.ico';

const StyledPurchaseIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 4px;
`;

const StyledPurchaseIcons = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const PurchaseIcons = ({ name }) => {
  const encodedName = encodeURI(name);
  const cardMarketUri = `https://www.cardmarket.com/en/Magic/Products/Search?searchString=${encodedName}`;
  const cardKingdomUri = `https://www.cardkingdom.com/catalog/search?search=header&filter%5Bname%5D=${encodedName}`;

  const options = [
    {
      icon: ckIcon,
      uri: cardKingdomUri,
      name: 'Card Kingdom',
    },
    {
      icon: mkmIcon,
      uri: cardMarketUri,
      name: 'Cardmarket',
    },
  ];

  return (
    <StyledPurchaseIcons>
      {options.map(({ icon, uri, name: serviceName }) => (
        <a
          href={uri}
          target="_blank"
          rel="noopener noreferrer"
          key={serviceName}
        >
          <StyledPurchaseIcon src={icon} />
          <span>{serviceName}</span>
        </a>
      ))}
    </StyledPurchaseIcons>
  );
};

const CardCosts = ({ card, loading, selectedCardId, onChangeSet }) => {
  if (!card) {
    return <Skeleton active paragraph={4} />;
  }

  return (
    <>
      {card && !loading ? (
        <>
          <Table
            dataSource={card.allSets.map(cardSet => ({
              ...cardSet,
              key: cardSet.id,
            }))}
            columns={columns}
            onRow={({ id }) => ({
              onClick: () => onChangeSet(id),
            })}
            pagination={false}
            size="small"
            style={{
              width: '100%',
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: 400,
            }}
            rowClassName={row =>
              row.id === selectedCardId ? 'table-active' : ''
            }
          />
          <PurchaseIcons name={card.name} />
        </>
      ) : (
        <Skeleton active paragraph={4} />
      )}
    </>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.selectedCardId !== nextProps.selectedCardId) return false;
  if (prevProps.loading !== nextProps.loading) return false;
  return true;
};

export default React.memo(CardCosts, areEqual);
