export const toDeckCard = card => ({ ...card, card: { id: card.id } });

export const getPreviewImg = ({ image_uris, card_faces }) =>
  image_uris ? image_uris.small : card_faces[0].image_uris.small;

const sortSets = (a, b) =>
  a.set_name > b.set_name
    ? 1
    : a.set_name < b.set_name
    ? -1
    : a.promo > b.promo
    ? 1
    : -1;

export const getAllSets = async (oracle_id, userId, db) => {
  const { rows: cards } = await db.raw(
    `
      SELECT 
        cards.*, 
        coalesce(collection.amount,0) as amount, 
        coalesce(collection."amountFoil",0) as "amountFoil" 
      FROM cards 
      LEFT JOIN collection
        ON collection.id = cards.id
        AND collection."userId" = ?
      WHERE cards.oracle_id = ? 
      AND 'paper' = ANY(games);
      `,
    [userId, oracle_id]
  );

  if (!cards.length) return null;

  const cardsWithImageUris = cards
    .map(card => ({
      ...card,
      image_uris: card.image_uris
        ? [card.image_uris]
        : card.card_faces.map(({ image_uris }) => image_uris),
    }))
    .sort(sortSets);

  return cardsWithImageUris.map(card => {
    const cardsWithSameSet = cardsWithImageUris.filter(
      ({ set }) => set === card.set
    );
    if (cardsWithSameSet.length === 1) return card;
    const version = cardsWithSameSet.findIndex(({ id }) => id === card.id) + 1;
    return {
      ...card,
      set_name: `${card.set_name} (Version ${version})`,
    };
  });
};

export const getTypes = ({ type_line }) => {
  const [mainTypes, flipTypes] = type_line.split(' // ');
  const [primaryTypes, subTypes] = mainTypes
    .split(' — ')
    .map(part => part.split(' '));

  return { mainTypes, flipTypes, primaryTypes, subTypes };
};
