import updateCards from './updateCards';

const update = async () => {
  await updateCards();
  process.exit(0);
};

update();
