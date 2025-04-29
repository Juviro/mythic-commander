import { StringParam, ArrayParam, BooleanParam } from 'use-query-params';

export default {
  name: StringParam,
  text: StringParam,
  sets: ArrayParam,
  cardTypes: ArrayParam,
  isLegendary: StringParam,
  subTypes: ArrayParam,
  colors: StringParam,
  tags: ArrayParam,
  rarity: StringParam,
  cmc: StringParam,
  power: StringParam,
  toughness: StringParam,
  isCommanderLegal: StringParam,
  isOwned: StringParam,
  variants: ArrayParam,
  displayAllVariants: BooleanParam,
  isGameChanger: BooleanParam,
};
