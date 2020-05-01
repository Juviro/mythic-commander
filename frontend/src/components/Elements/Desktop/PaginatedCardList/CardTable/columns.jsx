import React from 'react';

import { useQueryParam, StringParam } from 'use-query-params';
import { Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import PreviewCardImage from '../../../Shared/PreviewCardImage';
import ManaCost from '../../../Shared/ManaCost';
import { CARD_TYPES } from '../../../../CardProvider/staticTypes';
import { getPriceLabel } from '../../../../../utils/cardStats';
import formatDate from '../../../../../utils/formatDate';
import { highlightText } from '../../../../../utils/highlightText';
import { byColor } from '../../../../../utils/cardFilter';
import { Flex, ContextMenu } from '../../../Shared';

const renderAmount = ({ totalAmount, amount }) => amount || totalAmount || 0;

const renderType = ({ primaryTypes, subTypes }) => {
  const primaryTypesLabel = primaryTypes.join(' ');
  if (!subTypes.length) {
    return <Typography.Text>{primaryTypesLabel}</Typography.Text>;
  }
  const subTypesLabel = subTypes.join(' ');

  return (
    <Flex direction="column">
      <Typography.Text>{`${primaryTypesLabel} -`}</Typography.Text>
      <Typography.Text>{subTypesLabel}</Typography.Text>
    </Flex>
  );
};

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

const Name = React.memo(({ name }) => {
  const [searchString] = useQueryParam('name', StringParam);

  return highlightText(searchString, name);
});

const sortByAmount = columnKey => (a, b) => {
  return Number(a[columnKey]) - Number(b[columnKey]);
};
const sortByName = columnKey => (a, b) => {
  return a[columnKey] > b[columnKey] ? 1 : -1;
};

const sortType = (a, b) => {
  const getIndex = ({ primaryTypes }) => {
    const mainType = primaryTypes[primaryTypes.length - 1];
    return CARD_TYPES.indexOf(mainType);
  };
  return getIndex(a) - getIndex(b);
};

const renderActions = onDeleteCards => ({ oracle_id }) => {
  const menuItems = [
    {
      Icon: DeleteOutlined,
      onClick: () => onDeleteCards([oracle_id]),
      title: 'Delete',
    },
  ];
  return <ContextMenu menuItems={menuItems} />;
};

const columns = [
  {
    title: 'Card',
    key: 'img',
    width: 90,
    render: card => <PreviewCardImage card={card} highlightOnHover />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 300,
    key: 'name',
    render: name => <Name name={name} />,
    sorter: sortByName('name'),
  },
  {
    title: 'CMC',
    key: 'cmc',
    dataIndex: 'cmc',
    width: 70,
    align: 'center',
    sorter: sortByAmount('cmc'),
  },
  {
    title: 'Mana Cost',
    key: 'manaCost',
    dataIndex: 'mana_cost',
    width: 200,
    align: 'center',
    render: manaCost => <ManaCost costString={manaCost} />,
    sorter: byColor,
  },
  {
    title: 'Type',
    key: 'type',
    width: 200,
    align: 'center',
    render: renderType,
    sorter: sortType,
  },
  {
    title: 'Amount',
    key: 'amount',
    width: 70,
    align: 'center',
    render: renderAmount,
    sorter: sortByAmount('totalAmount'),
  },
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

const getActionColumn = ({ onDeleteCards }) => {
  if (!onDeleteCards) return [];

  return {
    title: '',
    key: 'actions',
    width: 40,
    align: 'left',
    render: renderActions(onDeleteCards),
  };
};

export default ({ showSorter, hiddenColumns, onDeleteCards }) => {
  const baseColumns = columns
    .map(({ sorter, ...rest }) => ({
      sorter: showSorter && sorter,
      ...rest,
    }))
    .filter(({ key }) => !hiddenColumns || !hiddenColumns.includes(key));

  const actionColumn = getActionColumn({ onDeleteCards });

  return baseColumns.concat(actionColumn);
};
