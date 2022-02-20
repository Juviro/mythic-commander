export const getProxyUrl = (cardIds: string[]) =>
  `/proxy?type=cards&value=${cardIds.join(',')}`;
