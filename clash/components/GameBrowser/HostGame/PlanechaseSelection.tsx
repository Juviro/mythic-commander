import React, { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Form, Checkbox, Space } from 'antd';
import { useQuery } from 'react-query';

import AnimatedHeightChange from 'components/lib/AnimatedHeightChange/AnimatedHeightChange';

import styles from './HostGame.module.css';

type PlanechaseOption = {
  set_name: string;
  set: string;
  count: number;
};

const getPlanechaseOptions = async () => {
  const res = await fetch('/api/planechase-options');
  return res.json();
};

const PlanechaseSelection = () => {
  const [isActive, setIsActive] = useState(false);

  const { data, isLoading } = useQuery<PlanechaseOption[]>(
    'planechaseOptions',
    () => getPlanechaseOptions(),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  return (
    <Form.Item label="Planechase">
      <Form.Item name="planechase" valuePropName="checked" noStyle>
        <Checkbox
          className={styles.planechase_checkbox}
          onChange={(e) => setIsActive(e.target.checked)}
        >
          Enabled
        </Checkbox>
      </Form.Item>
      {isLoading && isActive && <LoadingOutlined />}
      <AnimatedHeightChange isActive={isActive}>
        <Space direction="vertical" size={0}>
          {data?.map((option) => (
            <Form.Item
              key={option.set_name}
              name={`planechase-${option.set},${option.set_name}`}
              valuePropName="checked"
              noStyle
              className={styles.planechase_option_checkbox_label}
            >
              <Checkbox>{`${option.set_name} (${option.count})`}</Checkbox>
            </Form.Item>
          ))}
        </Space>
      </AnimatedHeightChange>
    </Form.Item>
  );
};

export default PlanechaseSelection;
