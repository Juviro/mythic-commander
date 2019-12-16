import React from 'react'

import { Table } from 'antd'
import TablePreview from './TablePreview'
import Actions from './Actions'

const sortByName = (a, b) => (a.name > b.name ? 1 : -1)
const sortByDate = (a, b) => Number(a.createdAt) - Number(b.createdAt)
const sortByPrice = (a, b) => Number(a.prices.usd || a.prices.usd_foil) - Number(b.prices.usd || b.prices.usd_foil)
const dollarToFormattedEuro = dollar =>
  (Number(dollar) * 0.9).toLocaleString('de-DE', {
    style: 'currency',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    currency: 'EUR',
  })

const getPrice = price => (price.usd || price.usd_foil ? dollarToFormattedEuro(price.usd || price.usd_foil) : '-')

const columns = [
  {
    align: 'center',
    title: 'Image',
    dataIndex: 'images',
    width: 120,
    render: images => <TablePreview images={images} />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: sortByName,
    width: 250,
    ellipsis: true,
  },
  {
    title: 'Price',
    dataIndex: 'prices',
    sorter: sortByPrice,
    width: 80,
    render: getPrice,
  },
  {
    title: 'Actions',
    key: 'action',
    width: 100,
    render: card => <Actions card={card} />,
  },
]

export default ({ cards, loading, setHighlightedCard }) => {
  const dataSource = cards
    .map(card => {
      const images = card.image_uris ? [card.image_uris] : card.card_faces.map(({ image_uris }) => image_uris)
      return { ...card, key: card.id, images }
    })
    .sort(sortByDate)
    .reverse()

  return (
    <div style={{ width: 'calc(100% - 300px)' }}>
      <Table
        loading={loading && !cards.length}
        size="small"
        tableLayout="fixed"
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 20 }}
        onRow={record => ({
          onMouseEnter: () => setHighlightedCard(record.name),
        })}
      />
    </div>
  )
}
