import React from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const text = (
  <p style={{ paddingLeft: 24 }}>
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest
    in many households across the world.
  </p>
);

export default () => {
  const panels = [
    {
      title: 'Add Cards',
      component: text,
    },
  ];
  return (
    <Collapse bordered={false} defaultActiveKey={['1']} style={{ width: 300 }}>
      {panels.map(({ title, component }) => (
        <Panel header={title} key={title}>
          {component}
        </Panel>
      ))}
    </Collapse>
  );
};
