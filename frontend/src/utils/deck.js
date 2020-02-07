export const getNumberOfCards = cards => {
  if (!cards) return 0;
  return cards.reduce((acc, val) => acc + (Number(val.amount) || 1), 0);
};

export const getPriceLabel = amountInEuro => {
  const formatPrice = amount =>
    Number(amount).toLocaleString('de-DE', {
      style: 'currency',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      currency: 'EUR',
    });

  return amountInEuro ? formatPrice(amountInEuro) : '-';
};
