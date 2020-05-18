import { StringParam, BooleanParam } from 'use-query-params';

export default {
  name: StringParam,
  text: StringParam,
  set: StringParam,
  cardType: StringParam,
  isLegendary: StringParam,
  creatureType: StringParam,
  colors: StringParam,
  rarity: StringParam,
  cmc: StringParam,
  power: StringParam,
  toughness: StringParam,
  isCommanderLegal: BooleanParam,
  isOwned: BooleanParam,
};
