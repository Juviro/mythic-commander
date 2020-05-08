import React from 'react';
import { Divider, Row, Col } from 'antd';

import AddToWantsList from './AddToWantsList';
import { Sidebar } from '../../../Elements/Desktop';
import {
  WantsListTitle,
  WantsListDeckLink,
  WantsListStats,
} from '../../../Elements/Shared';
import Actions from './Actions';

export default ({ width, wantsList, isVisible, toggleIsVisible, loading }) => {
  console.log('wantsList :', wantsList);
  return (
    <Sidebar
      isVisible={isVisible}
      toggleIsVisible={toggleIsVisible}
      width={width}
      loading={loading}
    >
      <WantsListTitle wantsList={wantsList} level={3} />
      <Row>
        <Col span={14}>
          <WantsListStats wantsList={wantsList} />
        </Col>
        <Col span={10} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <WantsListDeckLink wantsList={wantsList} />
        </Col>
      </Row>
      <Divider>Add cards</Divider>
      <AddToWantsList cards={wantsList && wantsList.cards} />
      <Divider>Actions</Divider>
      <Actions wantsList={wantsList} />
    </Sidebar>
  );
};
