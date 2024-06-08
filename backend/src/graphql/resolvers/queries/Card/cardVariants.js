export const VARIANTS = {
  TEXTURED: 'Textured',
  COMPLEAT: 'Compleat',
  HALO_FOIL: 'Halo Foil',
  BOXTOPPER: 'Boxtopper',
  BUY_A_BOX: 'Buy-a-Box',
  NEON_INK: 'Neon Ink',
  OIL_SLICK: 'Oil Slick',
  SERIALIZED: 'Serialized',
  DOUBLE_RAINBOW: 'Double Rainbow',
  GALAXY_FOIL: 'Galaxy Foil',
  BORDERLESS: 'Borderless',
  THICK: 'Thick',
  FULL_ART: 'Full Art',
  SHOWCASE: 'Showcase',
  INVERTED: 'Inverted',
  EXTENDED_ART: 'Extended Art',
  ETCHED_FOIL: 'Etched Foil',
  FUTURE_FRAME: 'Future Frame',
  RETRO_FRAME: 'Retro Frame',
  TEXTLESS: 'Textless',
  CONFETTI_FOIL: 'Confetti Foil',
  EMBOSSED: 'Embossed',
  SURGE_FOIL: 'Surge Foil',
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
  if (promo_types?.includes('serialized')) {
    variants.push(VARIANTS.SERIALIZED);
  }
  if (promo_types?.includes('doublerainbow')) {
    variants.push(VARIANTS.DOUBLE_RAINBOW);
  }
  if (border_color === 'borderless') {
    variants.push(VARIANTS.BORDERLESS);
  }
  if (full_art === true) {
    variants.push(VARIANTS.FULL_ART);
  }
  if (frame_effects?.includes('inverted')) {
    variants.push(VARIANTS.INVERTED);
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
