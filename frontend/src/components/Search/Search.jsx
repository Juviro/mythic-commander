import React from 'react'
import { Card } from 'antd'
import { getCards } from '../../network/mtgApi'

import Cards from './Cards'
import Search from './SearchField'

class App extends React.Component {
  state = { loading: true, cards: [] }

  componentDidMount() {
    this.onSearch('re')
  }

  onSearch = async searchString => {
    this.setState({ cards: [], loading: true })
    const data = await getCards(searchString)
    const sortedCards = data.sort(card => (card.name.toLowerCase() === searchString.toLowerCase() ? -1 : 1))

    this.setState({ cards: sortedCards, loading: false })
  }

  render() {
    const { cards, loading } = this.state

    return (
      <Card style={{ height: '100%' }}>
        <Search onSearch={this.onSearch} style={{ width: 400 }} />
        <Cards cards={cards} loading={loading} />
      </Card>
    )
  }
}

export default App
