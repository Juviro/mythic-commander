import updateSets from '../cardApi/sets/updateSets';

const update = async () => {
  await updateSets();
  process.exit(0);
};

update();
