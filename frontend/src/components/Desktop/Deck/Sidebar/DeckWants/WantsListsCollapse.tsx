import React from 'react';
import styled from 'styled-components';
import { Collapse } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';

import { WantsList } from 'types/graphql';
import { UnifiedDeck } from '../../Deck';

interface Props {
  wantsLists: WantsList[];
  deck?: UnifiedDeck;
}

const StyledPanel = styled(Collapse.Panel)`
  .ant-collapse-header:after {
    content: none !important;
  }
`;

export default ({ wantsLists, deck }: Props) => {
  return (
    <Collapse
      bordered={false}
      style={{ backgroundColor: 'white', width: '100%' }}
      className="no-padding-collapse"
    >
      {wantsLists.map((wantsList) => (
        <StyledPanel
          key={wantsList.id}
          style={{ marginBottom: 8, width: '100%' }}
          extra={
            <Link to={`/m/wants/${wantsList.id}`}>
              <ArrowRightOutlined />
            </Link>
          }
          header={<b>{`${wantsList.name} (${wantsList.cards.length})`}</b>}
        >
          hello world
        </StyledPanel>
      ))}
    </Collapse>
  );
};
