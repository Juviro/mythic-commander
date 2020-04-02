export const CARD_FIELDS = `
  id
  set
  name
  rarity
  image_uris {
    small
    normal
    art_crop
  }
  isTwoFaced
  imgKey
  card_faces {
    name
    image_uris {
      small
      normal
      art_crop
    }
    colors
  }
  prices {
    eur
    usd
    usd_foil
  }
  legalities {
    commander
  }
  oracle_id
  allSets {
    id
    set
    prices {
      eur
      usd
      usd_foil
    }
    image_uris {
      small
      normal
    }
    card_faces {
      image_uris {
        small
        normal
      }
    }
  }
`;
