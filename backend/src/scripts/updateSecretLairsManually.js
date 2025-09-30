import updateSecretLairs from '../cron/updateSecretLairs';

const updateSecretLairsManually = async () => {
  await updateSecretLairs(true);
  process.exit(0);
};

updateSecretLairsManually();
