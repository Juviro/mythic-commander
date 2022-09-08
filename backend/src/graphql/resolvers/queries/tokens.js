import db from '../../../database';
import { getImageKey } from './Card/helper';

const KEY_WORDS = [
  'Flying',
  'Vigilance',
  'Trample',
  'Haste',
  'Lifelink',
  'Defender',
  'First Strike',
  'Double Strike',
  'Reach',
  'Hexproof',
  'Indestructible',
  'Deathtouch',
  'Decayed',
  'Infect',
  'Menace',
  "can't block",
  'can block only',
  'attack each combat',
  'target of a spell',
  'dies',
  'regenerate',
];

export const getTokenName = (token) => {
  const additionalInfo = [];
  if (token.toughness !== null || token.power !== null) {
    additionalInfo.push(`${token.power}/${token.toughness}`);
  }

  if (token.color_identity?.length) {
    additionalInfo.push(token.color_identity.join('/'));
  }
  if (token.type_line.startsWith('Token Enchantment')) {
    additionalInfo.push('Enchantment');
  }

  if (token.layout === 'token') {
    KEY_WORDS.forEach((keyWord) => {
      if (token.oracle_text?.toLowerCase().includes(keyWord.toLowerCase())) {
        additionalInfo.push(keyWord);
      }
    });
  }

  if (!additionalInfo.length) return `${token.name} (Token)`;
  return `${token.name} (${additionalInfo.join(' ')})`;
};

const tokens = async () => {
  const allTokens = await db('distinctTokens')
    .orderBy('name', 'asc')
    .orderBy('power', 'asc')
    .orderBy('toughness', 'asc');

  return allTokens.map((token) => ({
    ...token,
    name: getTokenName(token),
    isTwoFaced: !token.image_uris,
    imgKey: getImageKey(token),
  }));
};

export default tokens;
