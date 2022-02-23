import sharp from 'sharp';
import fetch from 'node-fetch';

const IMG_URL =
  'https://c1.scryfall.com/file/scryfall-cards/normal/front/e/6/e6504f35-2b68-4bc8-bad9-1d68bb797e49.jpg';
const FILE_NAME = 'first_card';
const IMG_DIR = process.env.IMG_DIR;

const WIDTH = 220;
const HEIGHT = 306;

const downloadImages = async () => {
  const response = await fetch(IMG_URL);
  const buffer = await response.buffer();
  console.log('process.env.DB_NAME', process.env.IMG_DIR);

  sharp(buffer)
    .resize(WIDTH, HEIGHT)
    .toFile(`${IMG_DIR}/${FILE_NAME}.avif`, (err, info) => {
      console.log('err', err);
      console.log('info', info);
    });
};

export default downloadImages;
