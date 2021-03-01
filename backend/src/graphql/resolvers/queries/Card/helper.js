const sortSets = (a, b) =>
  a.set_name > b.set_name
    ? 1
    : a.set_name < b.set_name
    ? -1
    : a.promo > b.promo
    ? 1
    : -1;

export const getAllSets = async (oracle_id, userId = '', db) => {
  const { rows: cards } = await db.raw(
    `
      SELECT 
        cards.*, 
        coalesce(collection.amount,0) as "amountOwned", 
        coalesce(collection."amountFoil",0) as "amountOwnedFoil" 
      FROM cards 
      LEFT JOIN collection
        ON collection.id = cards.id
        AND collection."userId" = ?
      WHERE cards.oracle_id = ? 
      AND 'paper' = ANY(games);
      `,
    [userId, oracle_id]
  );

  return cards
    .map(card => {
      const cardsWithSameSet = cards
        .filter(({ set }) => set === card.set)
        .sort((a, b) => {
          const premiumFrameEffects = [
            'extendedart',
            'showcase',
            'inverted',
            'etched',
          ];
          const isSpecialCard = card => {
            if (card.booster === false) return true;
            return (
              card.frame_effects &&
              premiumFrameEffects.some(effect =>
                card.frame_effects.includes(effect)
              )
            );
          };
          if (isSpecialCard(a) === isSpecialCard(b)) return 0;
          return isSpecialCard(a) ? 1 : -1;
        });
      if (cardsWithSameSet.length === 1) return card;
      const version =
        cardsWithSameSet.findIndex(({ id }) => id === card.id) + 1;

      return {
        ...card,
        set_name: `${card.set_name} (Version ${version})`,
      };
    })
    .sort(sortSets);
};

export const getTypes = ({ type_line }) => {
  const [mainTypes, flipTypes] = type_line.split(' // ');
  const [primaryTypes, subTypes] = mainTypes
    .split(' — ')
    .map(part => part.split(' '));

  return { mainTypes, flipTypes, primaryTypes, subTypes };
};

export const getImageKey = ({ image_uris, card_faces }) => {
  const cardFront = image_uris || card_faces[0].image_uris;

  const cardMatch = cardFront.small.match(/front\/(.*)\//);

  if (!cardMatch) return '';

  return cardMatch[1];
};
