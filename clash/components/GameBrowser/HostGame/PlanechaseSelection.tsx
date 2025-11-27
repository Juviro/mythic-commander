import React, { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Form, Checkbox, Space } from 'antd';
import { useQuery } from 'react-query';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

import AnimatedHeightChange from 'components/lib/AnimatedHeightChange/AnimatedHeightChange';
import { PlanechaseSet } from 'backend/lobby/GameLobby.types';

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

interface PlanechaseSelectionProps {
  initialSelection?: string[];
  onSelectionChange?: (selection: PlanechaseSet[]) => void;
}

const PlanechaseSelection = ({
  initialSelection,
  onSelectionChange,
}: PlanechaseSelectionProps) => {
  const hasInitialSelection = Boolean(initialSelection && initialSelection?.length > 0);
  const [isActive, setIsActive] = useState(hasInitialSelection);
  const [selection, setSelection] = useState<string[]>(initialSelection || []);

  const { data, isLoading } = useQuery<PlanechaseOption[]>(
    'planechaseOptions',
    () => getPlanechaseOptions(),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  const addSetName = (set: string) => {
    const setName = data?.find((option) => option.set === set)?.set_name;
    return {
      set,
      setName: setName || 'Unknown Set',
    };
  };

  const onPlanechaseCheckboxChange = (e: CheckboxChangeEvent) => {
    setIsActive(e.target.checked);
    if (!e.target.checked) {
      onSelectionChange?.([]);
    } else {
      onSelectionChange?.(selection.map(addSetName));
    }
  };

  const onCheckboxChange = (e: CheckboxChangeEvent) => {
    let newSelection = [...selection];
    const set = e.target.id!.split(',').at(0)!.replace('planechase-', '');
    if (e.target.checked) {
      newSelection.push(set);
    } else {
      newSelection = newSelection.filter((s) => s !== set);
    }
    setSelection(newSelection);
    onSelectionChange?.(newSelection.map(addSetName));
  };

  return (
    <Form.Item label="Planechase">
      <Form.Item name="planechase" valuePropName="checked" noStyle>
        <Checkbox
          className={styles.planechase_checkbox}
          onChange={onPlanechaseCheckboxChange}
          defaultChecked={hasInitialSelection}
        >
          Planechase
        </Checkbox>
      </Form.Item>
      {isLoading && isActive && <LoadingOutlined />}
      <AnimatedHeightChange isActive={isActive}>
        <Space orientation="vertical" size={0}>
          {data?.map((option) => (
            <Form.Item
              key={option.set_name}
              name={`planechase-${option.set},${option.set_name}`}
              valuePropName="checked"
              noStyle
              initialValue={initialSelection?.includes(option.set)}
              className={styles.planechase_option_checkbox_label}
            >
              <Checkbox
                onChange={onCheckboxChange}
              >{`${option.set_name} (${option.count})`}</Checkbox>
            </Form.Item>
          ))}
        </Space>
      </AnimatedHeightChange>
    </Form.Item>
  );
};

export default PlanechaseSelection;
