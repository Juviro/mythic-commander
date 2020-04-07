import React from 'react';
import { Collapse } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';

import unifyCardFormat from '../../../../utils/unifyCardFormat';
import FilteredCardList from '../../../Elements/CardListMobile/FilteredCardList';

export default ({ wantsLists, basePath }) => {
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
            cards={unifyCardFormat(wantsList.cards)}
            basePath={basePath}
            hideFooter
          />
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};
