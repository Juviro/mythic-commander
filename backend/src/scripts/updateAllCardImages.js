import updateAllImages from '../cardApi/images/updateAllImages';

const update = async () => {
  await updateAllImages();

  process.exit(0);
};

update();
