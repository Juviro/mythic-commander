import React from 'react';

import PreviewCardImage from '../../../Shared/PreviewCardImage';
import ManaCost from '../../../Shared/ManaCost';
// import { CARD_TYPES } from '../../../../Provider/CardProvider/staticTypes';
import { getPriceLabel } from '../../../../../utils/cardStats';
import formatDate from '../../../../../utils/formatDate';
import { highlightText } from '../../../../../utils/highlightText';
import { byColor } from '../../../../../utils/cardFilter';
import { ContextMenu, OwnedBadge } from '../../../Shared';

// TODO: move columns to table file, simplify, remove sorters
const renderAmount = ({ totalAmount, amount }) => amount || totalAmount || 0;

// const renderType = ({ primaryTypes, subTypes }) => {
//   const primaryTypesLabel = primaryTypes.join(' ');
//   if (!subTypes.length) {
//     return <Typography.Text>{primaryTypesLabel}</Typography.Text>;
//   }
//   const subTypesLabel = subTypes.join(' ');

//   return (
//     <Flex direction="column">
//       <Typography.Text>{`${primaryTypesLabel} -`}</Typography.Text>
//       <Typography.Text>{subTypesLabel}</Typography.Text>
//     </Flex>
//   );
// };

const renderPrice = ({ price, minPrice, sumPrice, totalAmount }) => {
  const displayedPrice = price || minPrice;
  if (!sumPrice) {
    return getPriceLabel(displayedPrice);
  }
  if (displayedPrice === sumPrice || totalAmount === 1) {
    return getPriceLabel(sumPrice);
  }

  return `${getPriceLabel(displayedPrice)}  (${getPriceLabel(sumPrice)})`;
};

const sortByAmount = (columnKey, fallbackKey) => (a, b) => {
  const key = a[columnKey] === undefined ? fallbackKey : columnKey;
  return Number(a[key]) - Number(b[key]);
};
const sortByName = (columnKey) => (a, b) => {
  return a[columnKey] > b[columnKey] ? 1 : -1;
};

// const sortType = (a, b) => {
//   const getIndex = ({ primaryTypes }) => {
//     const mainType = primaryTypes[primaryTypes.length - 1];
//     return CARD_TYPES.indexOf(mainType);
//   };
//   return getIndex(a) - getIndex(b);
// };

const renderActions = (actions) => (card) => {
  return <ContextMenu menuItems={actions} card={card} />;
};

const columns = (search) => [
  {
    title: 'Card',
    key: 'img',
    width: 50,
    render: (card) => <PreviewCardImage card={card} highlightOnHover />,
  },
  {
    title: 'Amount',
    key: 'amount',
    width: 70,
    align: 'center',
    render: renderAmount,
    sorter: sortByAmount('totalAmount', 'amount'),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 200,
    key: 'name',
    render: (name) => highlightText(search, name),
    sorter: sortByName('name'),
  },
  {
    title: 'Owned',
    dataIndex: 'owned',
    width: 65,
    key: 'owned',
    render: (owned) => (owned ? <OwnedBadge marginLeft={0} /> : null),
  },
  // {
  //   title: 'CMC',
  //   key: 'cmc',
  //   dataIndex: 'cmc',
  //   width: 70,
  //   align: 'center',
  //   sorter: sortByAmount('cmc'),
  // },
  {
    title: 'Mana Cost',
    key: 'manaCost',
    dataIndex: 'mana_cost',
    width: 200,
    align: 'center',
    render: (manaCost) => <ManaCost costString={manaCost} />,
    sorter: byColor,
  },
  // {
  //   title: 'Type',
  //   key: 'type',
  //   width: 200,
  //   align: 'center',
  //   render: renderType,
  //   sorter: sortType,
  // },
  {
    title: 'Price',
    key: 'minPrice',
    width: 150,
    align: 'center',
    render: renderPrice,
    sorter: sortByAmount('minPrice'),
  },
  {
    title: 'Added',
    key: 'added',
    width: 150,
    align: 'center',
    dataIndex: 'createdAt',
    render: formatDate,
    sorter: sortByAmount('createdAt'),
  },
];

const getActionColumn = (actions) => {
  if (!actions) return [];

  return {
    title: '',
    key: 'actions',
    width: 40,
    align: 'left',
    render: renderActions(actions),
  };
};

export default ({ showSorter, hiddenColumns, actions, search = '' }) => {
  const baseColumns = columns(search)
    .map(({ sorter, ...rest }) => ({
      sorter: showSorter && sorter,
      ...rest,
    }))
    .filter(({ key }) => !hiddenColumns || !hiddenColumns.includes(key));

  const actionColumn = getActionColumn(actions);

  return baseColumns.concat(actionColumn);
};
