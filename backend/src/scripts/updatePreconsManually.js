import updatePrecons from '../cron/updatePrecons';

const updatePreconsManually = async () => {
  await updatePrecons();

  process.exit(0);
};

updatePreconsManually();
