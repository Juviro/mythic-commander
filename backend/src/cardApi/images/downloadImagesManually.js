import downloadImages from './downloadImages';

const update = async () => {
  await downloadImages();
  process.exit(0);
};

update();
