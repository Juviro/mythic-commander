import updatePrecons from '../cron/updatePrecons';

const updatePreconsManually = async () => {
  await updatePrecons(true);

  process.exit(0);
};

updatePreconsManually();
