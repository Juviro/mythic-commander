import gql from 'graphql-tag';

const CARD_FIELDS = `
  id
  oracle_id
  name
  imgKey
  scryfall_uri
  oracle_text
  isTwoFaced
  type_line
  game_changer
  mana_cost
  
  oracleCard {
    _id
    totalAmount
    isCommanderLegal
    reserved
    scryfallTags {
      id
      name
      slug
      description
    }

    containingWantsLists {
      id
      name
      amount

      deck {
        imgSrc
      }
    }
  
    containingDecks {
      id
      name
      status
      imgSrc
    }
  
    allSets {
      id
      set
      imgKey
      amountOwned
      amountOwnedFoil
      set_name
      nonfoil
      prices {
        usd
        usd_foil
        eur
        eur_foil
      }
    }
  }
`;

export const getCardByOracleId = gql`
  query cardByOracleId($oracle_id: String!) {
    cardByOracleId(oracle_id: $oracle_id) {
      ${CARD_FIELDS}
    }
  }
`;

export const addCardsToWantsList = gql`
  mutation addCardsToWantsList($cards: [CardInputType!]!, $wantsListId: String!) {
    addCardsToWantsList(cards: $cards, wantsListId: $wantsListId) {
      id
      card {
        id
        oracle_id
        name
        imgKey
        isTwoFaced

        oracleCard {
          _id
          isCommanderLegal

          containingWantsLists {
            id
            name
            amount

            deck {
              imgSrc
            }
          }
        }
      }
    }
  }
`;
