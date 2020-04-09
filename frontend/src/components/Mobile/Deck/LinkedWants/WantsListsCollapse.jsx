import React from 'react';
import { Collapse } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';

import unifyCardFormat from '../../../../utils/unifyCardFormat';
import { FilteredCardList } from '../../../Elements/Mobile';

export default ({ wantsLists, deck = {} }) => {
  const getMoveToList = wantsListId => ({
    decks: [deck],
    wantsLists: wantsLists.filter(({ id }) => id !== wantsListId),
  });

  return (
    <Collapse
      bordered={false}
      style={{ backgroundColor: 'white', marginTop: 16 }}
      className="no-padding-collapse"
    >
      {wantsLists.map(wantsList => (
        <Collapse.Panel
          key={wantsList.id}
          style={{ marginBottom: 8 }}
          extra={
            <Link to={`/m/wants/${wantsList.id}`}>
              <ArrowRightOutlined />
            </Link>
          }
          header={`${wantsList.name} (${wantsList.cards.length})`}
        >
          <FilteredCardList
            hideFooter
            cards={unifyCardFormat(wantsList.cards)}
            moveToList={{
              list: getMoveToList(wantsList.id),
              originType: 'WANTS_LIST',
              originId: wantsList.id,
            }}
          />
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};
