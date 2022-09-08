import fs from 'fs';
import sharp from 'sharp';
import fetch from 'node-fetch';

const IMG_DIR = process.env.IMG_DIR;

const DIMENSIONS = {
  small: {
    width: 72,
    height: 96,
  },
  normal: {
    width: 602,
    height: 838,
  },
  art_crop: {
    width: 566,
    height: 416,
  },
};

const getFileName = (card, size = 'normal', face = 'front') => {
  return `${IMG_DIR}/${card.id}_${size}_${face}.avif`;
};

const doesFileExist = async (filename) => {
  // eslint-disable-next-line no-sync
  return fs.existsSync(filename);
};

const downloadImage = async (filename, url, size, alwayswUpdate = false) => {
  const exists = await doesFileExist(filename);
  if (exists && !alwayswUpdate) {
    return;
  }

  const response = await fetch(url);
  const buffer = await response.buffer();

  sharp(buffer)
    .resize(DIMENSIONS[size].width, DIMENSIONS[size].height)
    .toFile(filename, (err) => {
      if (err) {
        console.error(err);
      }
    });
};

const downloadAllImages = async (card, imageUris, face) => {
  // Some cards are spoiled in different languages, but by their release date
  // they should have the english image. Until then, we always update those images
  const isUnreleased = new Date(card.released_at) > new Date();

  await downloadImage(
    getFileName(card, 'small', face),
    imageUris.small,
    'small',
    isUnreleased
  );
  await downloadImage(
    getFileName(card, 'normal', face),
    imageUris.normal,
    'normal',
    isUnreleased
  );
  await downloadImage(
    getFileName(card, 'art_crop', face),
    imageUris.art_crop,
    'art_crop',
    isUnreleased
  );
};

const storeCardImage = async (card) => {
  if (!process.env.IMG_DIR) return;

  if (card.image_uris) {
    await downloadAllImages(card, card.image_uris, 'front');
  } else {
    const faces = card.card_faces;
    await downloadAllImages(card, faces[0].image_uris, 'front');
    await downloadAllImages(card, faces[1].image_uris, 'back');
  }
};

export default storeCardImage;
