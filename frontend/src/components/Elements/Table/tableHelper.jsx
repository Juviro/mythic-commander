import React from 'react';

import TablePreview from './RowElements/TablePreview';
import TypeTags from './RowElements/TypeTags';
import Rarity from './RowElements/Rarity';
import Owned from './RowElements/Owned';

const TYPE_SORTING_INNER = ['Land', 'Creature', 'Enchantment', 'Artifact', 'Instant', 'Sorcery', 'Planeswalker'];
const TYPE_SORTING_OUTER = ['Creature', 'Enchantment', 'Artifact', 'Instant', 'Sorcery', 'Planeswalker', 'Land'];

const sortByName = (a, b) => (a.name > b.name ? 1 : -1);
const sortByDate = (a, b) => Number(b.createdAt) - Number(a.createdAt);

const getEuroPrice = ({ eur, usd, usd_foil }) => Number(eur) || Number(usd || usd_foil) * 0.9 || 0;
const sortByPrice = (a, b) => getEuroPrice(a.prices) - getEuroPrice(b.prices);

const getPriceLabel = price => {
  const formatPrice = amount =>
    Number(amount).toLocaleString('de-DE', {
      style: 'currency',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      currency: 'EUR',
    });

  const amountInEuro = getEuroPrice(price);
  return amountInEuro ? formatPrice(amountInEuro) : '-';
};

const sortAndFilterCardTypes = types =>
  types.sort((a, b) => TYPE_SORTING_INNER.indexOf(a) - TYPE_SORTING_INNER.indexOf(b));

const sortByTypeAndCommander = (a, b) => {
  if (a.zone === 'COMMANDER') return -1;
  if (b.zone === 'COMMANDER') return 1;

  const findIndex = primaryTypes =>
    TYPE_SORTING_OUTER.findIndex(
      type => primaryTypes.filter(typeName => TYPE_SORTING_OUTER.includes(typeName))[0] === type
    );
  const indexDifference = findIndex(a.primaryTypes) - findIndex(b.primaryTypes);

  return !indexDifference && (a.primaryTypes.length || b.primaryTypes.length)
    ? sortByTypeAndCommander({ primaryTypes: a.primaryTypes.slice(1) }, { primaryTypes: b.primaryTypes.slice(1) })
    : indexDifference;
};

const sortByRarity = (a, b) => {
  const raritySorting = ['mythic', 'rare', 'uncommon', 'common', 'land'];
  return raritySorting.indexOf(b.rarity) - raritySorting.indexOf(a.rarity);
};

const sortByOwned = (a, b) => {
  return b.owned ? 1 : a.owned ? -1 : 0;
};

export const getColumns = (displayedColumns, Actions) => {
  const allColumns = [
    {
      title: 'Type',
      key: 'types',
      width: 200,
      sorter: sortByTypeAndCommander,
      render: ({ primaryTypes, flipTypes }) => <TypeTags primaryTypes={primaryTypes} flipTypes={flipTypes} />,
    },
    {
      title: 'Rarity',
      key: 'rarity',
      dataIndex: 'rarity',
      width: 75,
      sorter: sortByRarity,
      render: rarity => <Rarity rarity={rarity} />,
    },
    {
      align: 'center',
      title: 'Image',
      key: 'images',
      width: 120,
      render: card => <TablePreview card={card} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: sortByName,
      width: 250,
      displayDefault: true,
      ellipsis: true,
    },
    {
      title: 'Price',
      dataIndex: 'prices',
      key: 'prices',
      sorter: sortByPrice,
      width: 80,
      render: getPriceLabel,
    },
    {
      title: 'Owned',
      key: 'owned',
      sorter: sortByOwned,
      width: 85,
      render: card => <Owned card={card} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: card => <Actions card={card} />,
    },
  ];

  return allColumns.filter(({ key, displayDefault }) =>
    key === 'actions' ? Boolean(Actions) : displayDefault || displayedColumns.includes(key)
  );
};

export const getSortedCards = (cards, type) => {
  return cards
    .map(card => {
      const primaryTypes = sortAndFilterCardTypes(card.primaryTypes || []);
      const isBasicLand = card.primaryTypes && card.primaryTypes.includes('Basic');
      const rarity = isBasicLand ? 'land' : card.rarity;
      return { ...card, key: card.id, primaryTypes, rarity };
    })
    .sort(sortByName)
    .sort(type === 'deck' ? sortByTypeAndCommander : sortByDate);
};
