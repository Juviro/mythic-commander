import React from 'react';
import { Collapse } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';

import { WantsList } from 'types/graphql';
import { UnifiedDeck } from '../../Deck';

interface Props {
  wantsLists: WantsList[];
  deck?: UnifiedDeck;
}

export default ({ wantsLists, deck }: Props) => {
  const getMoveToList = (wantsListId: string) => ({
    decks: [deck],
    wantsLists: wantsLists.filter(({ id }) => id !== wantsListId),
  });

  return (
    <Collapse
      bordered={false}
      style={{ backgroundColor: 'white', marginTop: 16 }}
      className="no-padding-collapse"
    >
      {wantsLists.map((wantsList) => (
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
          hello world
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};
