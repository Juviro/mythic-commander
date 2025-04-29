// Query to get all promo_types:
// SELECT array_agg(DISTINCT unnest_promo) FROM (SELECT unnest(promo_types) as unnest_promo FROM cards) as unnested;

export const VARIANTS = {
  BORDERLESS: 'Borderless',
  BOXTOPPER: 'Boxtopper',
  BUY_A_BOX: 'Buy-a-Box',
  COMPLEAT: 'Compleat',
  CONFETTI_FOIL: 'Confetti Foil',
  DOUBLE_RAINBOW: 'Double Rainbow',
  DRAGONSCALE_FOIL: 'Dragonscale Foil',
  EMBOSSED: 'Embossed',
  ETCHED_FOIL: 'Etched Foil',
  EXTENDED_ART: 'Extended Art',
  FIRST_PLACE_FOIL: 'First Place Foil',
  FRACTUREFOIL: 'Fracture Foil',
  FULL_ART: 'Full Art',
  FUTURE_FRAME: 'Future Frame',
  GALAXY_FOIL: 'Galaxy Foil',
  GILDED: 'Gilded',
  GLOSSY: 'Glossy',
  HALO_FOIL: 'Halo Foil',
  INVERTED: 'Inverted',
  INVIBILE_INK: 'Invisible Ink',
  JUDGE_GIFT: 'Judge Gift',
  MAGNIFIED: 'Magnified',
  MANA_FOIL: 'Mana Foil',
  NEON_INK: 'Neon Ink',
  OIL_SLICK: 'Oil Slick',
  RAISED_FOIL: 'Raised Foil',
  RAINBOW_FOIL: 'Rainbow Foil',
  RETRO_FRAME: 'Retro Frame',
  RIPPLEFOIL: 'Ripple Foil',
  SERIALIZED: 'Serialized',
  SHOWCASE: 'Showcase',
  SILVER_FOIL: 'Silver Foil',
  SURGE_FOIL: 'Surge Foil',
  TEXTLESS: 'Textless',
  TEXTURED: 'Textured',
  THICK: 'Thick',
};

const HIDDEN_VARIANTS = {
  JAPANESE: 'Japanese',
};

export const getCardVariants = ({
  finishes,
  border_color,
  full_art,
  textless,
  frame_effects,
  promo_types,
  frame,
  released_at,
  lang,
}) => {
  const variants = [];
  if (promo_types?.includes('serialized')) {
    variants.push(VARIANTS.SERIALIZED);
  }
  if (lang === 'ja') {
    variants.push(HIDDEN_VARIANTS.JAPANESE);
  }
  if (promo_types?.includes('textured')) {
    variants.push(VARIANTS.TEXTURED);
  }
  if (promo_types?.includes('thick')) {
    variants.push(VARIANTS.THICK);
  }
  if (promo_types?.includes('confettifoil')) {
    variants.push(VARIANTS.CONFETTI_FOIL);
  }
  if (promo_types?.includes('galaxyfoil')) {
    variants.push(VARIANTS.GALAXY_FOIL);
  }
  if (promo_types?.includes('embossed')) {
    variants.push(VARIANTS.EMBOSSED);
  }
  if (promo_types?.includes('surgefoil')) {
    variants.push(VARIANTS.SURGE_FOIL);
  }
  if (promo_types?.includes('raisedfoil')) {
    variants.push(VARIANTS.RAISED_FOIL);
  }
  if (promo_types?.includes('rainbowfoil')) {
    variants.push(VARIANTS.RAINBOW_FOIL);
  }
  if (promo_types?.includes('invisibleink')) {
    variants.push(VARIANTS.INVIBILE_INK);
  }
  if (promo_types?.includes('gilded')) {
    variants.push(VARIANTS.GILDED);
  }
  if (promo_types?.includes('ripplefoil')) {
    variants.push(VARIANTS.RIPPLEFOIL);
  }
  if (promo_types?.includes('fracturefoil')) {
    variants.push(VARIANTS.FRACTUREFOIL);
  }
  if (promo_types?.includes('stepandcompleat')) {
    variants.push(VARIANTS.COMPLEAT);
  }
  if (promo_types?.includes('halofoil')) {
    variants.push(VARIANTS.HALO_FOIL);
  }
  if (promo_types?.includes('boxtopper')) {
    variants.push(VARIANTS.BOXTOPPER);
  }
  if (promo_types?.includes('buyabox')) {
    variants.push(VARIANTS.BUY_A_BOX);
  }
  if (promo_types?.includes('neonink')) {
    variants.push(VARIANTS.NEON_INK);
  }
  if (promo_types?.includes('oilslick')) {
    variants.push(VARIANTS.OIL_SLICK);
  }
  if (promo_types?.includes('doublerainbow')) {
    variants.push(VARIANTS.DOUBLE_RAINBOW);
  }
  if (promo_types?.includes('dragonscalefoil')) {
    variants.push(VARIANTS.DRAGONSCALE_FOIL);
  }
  if (promo_types?.includes('firstplacefoil')) {
    variants.push(VARIANTS.FIRST_PLACE_FOIL);
  }
  if (promo_types?.includes('glossy')) {
    variants.push(VARIANTS.GLOSSY);
  }
  if (promo_types?.includes('judgegift')) {
    variants.push(VARIANTS.JUDGE_GIFT);
  }
  if (promo_types?.includes('magnified')) {
    variants.push(VARIANTS.MAGNIFIED);
  }
  if (promo_types?.includes('silverfoil')) {
    variants.push(VARIANTS.SILVER_FOIL);
  }
  if (promo_types?.includes('manafoil')) {
    variants.push(VARIANTS.MANA_FOIL);
  }
  if (border_color === 'borderless') {
    variants.push(VARIANTS.BORDERLESS);
  }
  if (full_art === true) {
    variants.push(VARIANTS.FULL_ART);
  }
  if (frame_effects?.includes('showcase')) {
    variants.push(VARIANTS.SHOWCASE);
  }
  if (frame_effects?.includes('extendedart')) {
    variants.push(VARIANTS.EXTENDED_ART);
  }
  if (finishes?.length === 1 && finishes[0] === 'etched') {
    variants.push(VARIANTS.ETCHED_FOIL);
  }
  if (frame_effects?.includes('inverted')) {
    variants.push(VARIANTS.INVERTED);
  }
  if (frame === 'future') {
    variants.push(VARIANTS.FUTURE_FRAME);
  }
  if (
    parseInt(frame, 10) < 2000 &&
    new Date(released_at).getFullYear() > 2020
  ) {
    variants.push(VARIANTS.RETRO_FRAME);
  }
  if (textless === true) {
    variants.push(VARIANTS.TEXTLESS);
  }

  return variants;
};
