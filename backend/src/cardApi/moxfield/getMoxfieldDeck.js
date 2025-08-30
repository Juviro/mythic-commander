const getCards = (deck, boardKey, format = true) => {
  const cardsMap = deck.boards[boardKey].cards;
  const cards = Object.values(cardsMap).map(({ card, quantity }) => ({
    ...card,
    quantity,
  }));

  if (!format) {
    return cards;
  }

  const formattedCards = cards.map((card) => ({
    id: card.scryfall_id,
    amount: card.quantity,
  }));

  return formattedCards;
};

const parseColorIdentity = (colorIdentity) => {
  return colorIdentity.sort().join(',');
};

const getHasPartner = (oracleText) => {
  if (!oracleText) {
    return false;
  }

  const isPartnerWith = oracleText.includes('Partner with ');

  const isGeneralPartner =
    oracleText.includes('Partner (You can have') ||
    oracleText.endsWith('Partner');

  return isPartnerWith || isGeneralPartner;
};

const getAlternativeCommanders = (deck) => {
  const cards = getCards(deck, 'mainboard', false);
  const colorIdentity = parseColorIdentity(deck.colorIdentity);

  const alternativeCommanders = cards.filter((card) => {
    const hasPartner = getHasPartner(card.oracle_text);
    if (hasPartner) return true;

    if (parseColorIdentity(card.color_identity) !== colorIdentity) return false;

    const isLegendaryCommander = card.type_line?.match(
      /Legendary.*(Creature|Vehicle|Spacecraft)/
    );

    const canBeCommander = card.oracle_text
      ?.toLowerCase()
      .includes('can be your commander');

    return isLegendaryCommander || canBeCommander || hasPartner;
  });

  return alternativeCommanders.map((card) => ({
    id: card.scryfall_id,
    name: card.name,
    amount: 1,
    isPartner: getHasPartner(card.oracle_text),
  }));
};

const formatDeck = (deck) => {
  const commanders = getCards(deck, 'commanders');
  const firstCommanderId = commanders[0]?.id;
  const imgSrc = `/img/${firstCommanderId}_art_crop_front.avif`;
  const name = deck.name.replace(/\s\(.*/, '');

  const commanderName = Object.values(deck.boards.commanders.cards)
    .map((commander) => commander.card.name)
    .join(' & ');

  const cards = getCards(deck, 'mainboard');
  const alternativeCommanders = getAlternativeCommanders(deck);

  return {
    id: deck.publicId,
    name,
    createdAt: deck.createdAtUtc,
    imgSrc,
    set: deck.main.set,
    deckUrl: deck.publicUrl,
    colorIdentity: deck.colorIdentity,
    cards,
    commanders,
    alternativeCommanders,
    commanderName,
  };
};

const getMoxfieldDeck = async (deckId) => {
  const url = `https://api2.moxfield.com/v3/decks/all/${deckId}`;

  const response = await fetch(url);
  const deck = await response.json();

  if (deck.name.includes('Magic Online')) {
    return null;
  }

  return formatDeck(deck);
};

export default getMoxfieldDeck;
