import React, { useContext } from 'react';
import { Table, Skeleton } from 'antd';
import styled from 'styled-components';

import getColumns from './columns';
import CardContext from '../../../CardProvider/CardProvider';
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

export default ({ card, loading, cardId }) => {
  const { sets } = useContext(CardContext);

  if (!card) {
    return <Skeleton active paragraph={4} />;
  }

  const columns = getColumns(sets);

  return (
    <>
      {/* <StyledTitle>Buy</StyledTitle> */}
      {card && !loading ? (
        <>
          <Table
            dataSource={card.all_sets.map(cardSet => ({
              ...cardSet,
              key: cardSet.id,
            }))}
            columns={columns}
            pagination={false}
            size="small"
            style={{
              width: '100%',
              maxHeight: 325,
              overflowX: 'hidden',
              overflowY: 'auto',
            }}
            rowClassName={row => (row.id === cardId ? 'table-active' : '')}
          />
          <PurchaseIcons name={card.name} />
        </>
      ) : (
        <Skeleton active paragraph={4} />
      )}
    </>
  );
};
