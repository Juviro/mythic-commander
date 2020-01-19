import updateCards from './updateCards';

const update = async () => {
  await updateCards(true);
  process.exit(0);
};

update();
