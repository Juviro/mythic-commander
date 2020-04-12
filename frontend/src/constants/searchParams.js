import { StringParam, BooleanParam } from 'use-query-params';

export default {
  name: StringParam,
  rarity: StringParam,
  cmc: StringParam,
  power: StringParam,
  toughness: StringParam,
  set: StringParam,
  text: StringParam,
  colors: StringParam,
  creatureType: StringParam,
  cardType: StringParam,
  isLegendary: StringParam,
  isOwned: BooleanParam,
  isCommanderLegal: BooleanParam,
  orderBy: StringParam,
};
