import React from 'react';
import { Input, AutoComplete } from 'antd';
import { withRouter } from 'react-router';
import { useQueryParams, StringParam } from 'use-query-params';
import { useQuery } from 'react-apollo';

import { getDecks as getDecksQuery } from '../../../../../queries';
import { getDecks } from './Decks';

const Menu = ({ history, transparentSearchBar }) => {
  const [{ query }, setQuery] = useQueryParams({
    query: StringParam,
  });
  const { data: decksData } = useQuery(getDecksQuery);

  const onSetSearch = value => setQuery({ query: value.split(';')[0] });

  const dataSource = [getDecks(decksData, query, history, onSetSearch)].filter(
    Boolean
  );

  return (
    <AutoComplete
      value={query}
      dataSource={dataSource}
      dropdownMatchSelectWidth={false}
      placeholder="Search for something"
      style={{ width: 'calc(100% - 16px)' }}
      onChange={onSetSearch}
      className={transparentSearchBar && 'transparent'}
    >
      <Input className="no-border" />
    </AutoComplete>
  );
};

export default withRouter(Menu);
