import React from 'react';

import TablePreview from './RowElements/TablePreview';
import Actions from './RowElements/Actions';
import TypeTags from './RowElements/TypeTags';
import Rarity from './RowElements/Rarity';

const TYPE_SORTING_INNER = ['Land', 'Creature', 'Enchantment', 'Artifact', 'Instant', 'Sorcery', 'Planeswalker'];
const TYPE_SORTING_OUTER = ['Creature', 'Enchantment', 'Artifact', 'Instant', 'Sorcery', 'Planeswalker', 'Land'];

const sortByName = (a, b) => (a.name < b.name ? 1 : -1);
const sortByDate = (a, b) => Number(a.createdAt) - Number(b.createdAt);
const sortByPrice = (a, b) => Number(a.prices.usd || a.prices.usd_foil) - Number(b.prices.usd || b.prices.usd_foil);
const dollarToFormattedEuro = dollar =>
  (Number(dollar) * 0.9).toLocaleString('de-DE', {
    style: 'currency',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    currency: 'EUR',
  });

const sortAndFilterCardTypes = types =>
  types
    .sort((a, b) => TYPE_SORTING_INNER.indexOf(a) - TYPE_SORTING_INNER.indexOf(b))
    .filter(type => TYPE_SORTING_OUTER.includes(type));

const sortByTypeAndCommander = (a, b) => {
  if (a.zone === 'COMMANDER') return 1;
  if (b.zone === 'COMMANDER') return -1;

  const findIndex = primaryTypes => TYPE_SORTING_OUTER.findIndex(type => primaryTypes[0] === type);
  const indexDifference = findIndex(b.primaryTypes) - findIndex(a.primaryTypes);

  return !indexDifference && (a.primaryTypes.length || b.primaryTypes.length)
    ? sortByTypeAndCommander({ primaryTypes: a.primaryTypes.slice(1) }, { primaryTypes: b.primaryTypes.slice(1) })
    : indexDifference;
};

const sortByRarity = (a, b) => {
  const raritySorting = ['mythic', 'rare', 'uncommon', 'common', 'land'];
  return raritySorting.indexOf(b.rarity) - raritySorting.indexOf(a.rarity);
};

const getPrice = price => (price.usd || price.usd_foil ? dollarToFormattedEuro(price.usd || price.usd_foil) : '-');

export const getColumns = (type, displayedColumns) => {
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
      width: 60,
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
      render: getPrice,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_, card) => <Actions card={card} type={type} />,
    },
  ];

  return allColumns.filter(({ key, displayDefault }) => displayDefault || displayedColumns.includes(key));
};

export const getSortedCards = (cards, type) => {
  return (
    cards
      .map(card => {
        const images = card.image_uris ? [card.image_uris] : card.card_faces.map(({ image_uris }) => image_uris);
        const primaryTypes = sortAndFilterCardTypes(card.primaryTypes || []);
        const isBasicLand = card.primaryTypes && card.primaryTypes.includes('Basic');
        const rarity = isBasicLand ? 'land' : card.rarity;
        return { ...card, key: card.id, images, primaryTypes, rarity };
      })
      .sort(sortByName)
      .sort(type === 'deck' ? sortByTypeAndCommander : sortByDate)
      // TODO remove this reverse() as it will screw with the collection
      .reverse()
  );
};
