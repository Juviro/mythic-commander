import fs from 'fs';
import sharp from 'sharp';
import fetch from 'node-fetch';

const IMG_DIR = process.env.IMG_DIR;

const WIDTH = 301;
const HEIGHT = 419;

const getFileName = (card, face = 'front') => {
  return `${IMG_DIR}/${card.id}_${face}.avif`;
};

const doesFileExist = async filename => {
  // eslint-disable-next-line no-sync
  return fs.existsSync(filename);
};

const downloadImage = async (filename, url) => {
  const exists = await doesFileExist(filename);
  if (exists) {
    return;
  }

  const response = await fetch(url);
  const buffer = await response.buffer();

  sharp(buffer)
    .resize(WIDTH, HEIGHT)
    .toFile(filename, err => {
      if (err) {
        console.error(err);
      }
    });
};

const storeCardImage = async card => {
  if (card.image_uris) {
    await downloadImage(getFileName(card), card.image_uris.normal);
  } else {
    const faces = card.card_faces;
    await downloadImage(getFileName(card, 'front'), faces[0].image_uris.normal);
    await downloadImage(getFileName(card, 'back'), faces[1].image_uris.normal);
  }
};

export default storeCardImage;
