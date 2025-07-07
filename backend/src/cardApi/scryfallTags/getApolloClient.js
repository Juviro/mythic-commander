import { ApolloClient, InMemoryCache } from '@apollo/client';

const getInitialToken = async () => {
  const response = await fetch('https://tagger.scryfall.com/', {
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
      'cache-control': 'max-age=0',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
      'x-requested-with': 'XMLHttpRequest',
      'sec-ch-ua':
        '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
    },
  });
  const sessionToken = response.headers
    .get('Set-Cookie')
    .split(';')[0]
    .split('=')[1];

  const html = await response.text();
  const csrfTokenMatch = html.match(
    /<meta name="csrf-token" content="([^"]+)"/
  );
  const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : null;

  return { sessionToken, csrfToken };
};

const getApolloClient = async () => {
  const { sessionToken, csrfToken } = await getInitialToken();

  return new ApolloClient({
    uri: 'https://tagger.scryfall.com/graphql',
    cache: new InMemoryCache(),
    headers: {
      Cookie: `_scryfall_tagger_session=${sessionToken}`,
      origin: 'https://tagger.scryfall.com',
      'x-csrf-token': csrfToken,
      'sec-ch-ua':
        '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
      Accept: '*/*',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
      'content-type': 'application/json; charset=utf-8',
      'x-requested-with': 'XMLHttpRequest',
    },
  });
};

export default getApolloClient;
