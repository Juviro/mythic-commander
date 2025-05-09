const fetchPage = async (page) => {
  const url = `https://api2.moxfield.com/v2/decks/search-sfw?showIllegal=true&authorUserNames=WizardsOfTheCoast&pageNumber=${page}&pageSize=100&sortType=updated&sortDirection=descending&board=mainboard`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
const fetchAllPages = async () => {
  const results = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const data = await fetchPage(page);
    results.push(...data.data);
    hasMore = data.pageNumber < data.totalPages;
    page += 1;
  }
  return results;
};

/**
 * @param {string} type - The type of card collections to fetch. Can be one of: 'secretLair', 'commanderPrecons', 'none', 'standard', 'precons'
 * @returns {Promise<Array>} - An array of card collections.
 */

const getMoxfieldCardCollections = async (type) => {
  const results = await fetchAllPages();
  const cardsOfType = results.filter(
    (result) => !type || result.format === type
  );
  return cardsOfType;
};

export default getMoxfieldCardCollections;
