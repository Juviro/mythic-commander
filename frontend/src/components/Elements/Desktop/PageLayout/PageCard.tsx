import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';
import React from 'react';

interface Props extends CardProps {
  isFirst?: boolean;
  children: React.ReactNode;
}

export default ({ children, isFirst, style, ...rest }: Props) => {
  return (
    <Card
      {...rest}
      style={{ marginTop: isFirst ? 0 : 32, borderBottom: 'none', ...style }}
    >
      {children}
    </Card>
  );
};
