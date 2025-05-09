const getCards = (deck, boardKey) => {
  const cardsMap = deck.boards[boardKey].cards;
  const cards = Object.values(cardsMap).map(({ card, quantity }) => ({
    ...card,
    quantity,
  }));

  const formattedCards = cards.map((card) => ({
    id: card.scryfall_id,
    amount: card.quantity,
  }));

  return formattedCards;
};

const formatDeck = (deck) => {
  const commanders = getCards(deck, 'commanders');
  const firstCommanderId = commanders[0]?.id;
  const imgSrc = `/img/${firstCommanderId}_art_crop_front.avif`;
  const [_, name, releaseName] = deck.name.match(/([^(]+)\s+\((.*)\)/) ?? [];
  const formattedReleaseName = releaseName
    ?.replace(/ Commander .* Decklist/, '')
    .trim();

  const commanderName = Object.values(deck.boards.commanders.cards)
    .map((commander) => commander.card.name)
    .join(' & ');

  return {
    id: deck.publicId,
    name,
    releaseName: formattedReleaseName,
    createdAt: deck.createdAtUtc,
    imgSrc,
    deckUrl: deck.publicUrl,
    colorIdentity: deck.colorIdentity,
    cards: getCards(deck, 'mainboard'),
    commanders,
    commanderName,
    commanderAlternatives: [],
  };
};

const getMoxfieldDeck = async (deckId) => {
  const url = `https://api2.moxfield.com/v3/decks/all/${deckId}`;

  const response = await fetch(url);
  const data = await response.json();

  return formatDeck(data);
};

export default getMoxfieldDeck;
