import React from 'react'

import { Table } from 'antd'
import TablePreview from './TablePreview'

const sortByName = (a, b) => (a.name > b.age ? -1 : 1)
const sortByDate = (a, b) => Number(a.createdAt) - Number(b.createdAt)

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
    width: 200,
  },
  {
    title: 'Added',
    dataIndex: 'createdAt',
    sorter: sortByDate,
    width: 150,
    render: createdAt => new Date(Number(createdAt)).toLocaleDateString('de'),
  },
]

export default ({ cards, loading }) => {
  if (loading) return null

  const dataSource = cards.map(card => {
    const images = card.image_uris ? [card.image_uris] : card.card_faces.map(({ image_uris }) => image_uris)
    if (!card.image_uris) console.log('images', images, card)
    return { ...card, key: card.id, images }
  })

  return <Table tableLayout="fixed" style={{ width: "auto", margin: '0 3%' }} columns={columns} dataSource={dataSource} />
}
