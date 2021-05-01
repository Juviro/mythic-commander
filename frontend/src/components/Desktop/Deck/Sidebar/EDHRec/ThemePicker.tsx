import { Select, Space, Typography } from 'antd';
import React from 'react';
import { EdhRecTheme } from 'types/graphql';

interface Props {
  themes: EdhRecTheme[];
  loading: boolean;
  themeSuffix: string | null;
  setThemeSuffix: (id: string) => void;
}

export const ThemePicker = ({ themes, loading, themeSuffix, setThemeSuffix }: Props) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text strong>Pick a Deck Theme:</Typography.Text>
      <Select
        listHeight={390}
        value={themeSuffix}
        placeholder={themes ? `Pick from ${themes.length} Deck Themes` : 'Loading...'}
        style={{ width: '100%' }}
        loading={loading}
        onSelect={(value) => setThemeSuffix(value)}
      >
        {themes?.map(({ count, title, urlSuffix }) => (
          <Select.Option value={urlSuffix} key={urlSuffix}>
            {`${title} (${count} decks)`}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
};
