import React from 'react';
import styled from 'styled-components';
import { getCards } from '../../network/mtgApi';

import Cards from '../Elements/CardView/ImageView';
import Search from '../Elements/SearchField/SearchField';

const StyledSearch = styled.div`
  padding: 19px;
`;

// TODO: BUG
// pasting "Daghatar the Adamant" into the search filed will fill the field with object object
class App extends React.Component {
  state = { loading: false, cards: [] };

  onSearch = async searchString => {
    this.setState({ cards: [], loading: true });
    const data = await getCards(searchString);
    const sortedCards = data.sort(card => (card.name.toLowerCase() === searchString.toLowerCase() ? -1 : 1));

    this.setState({ cards: sortedCards, loading: false });
  };

  render() {
    const { cards, loading } = this.state;

    return (
      <StyledSearch>
        <Search onSearch={this.onSearch} />
        <Cards cards={cards} loading={loading} />
      </StyledSearch>
    );
  }
}

export default App;
