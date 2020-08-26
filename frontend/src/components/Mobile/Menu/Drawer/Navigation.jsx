import React from 'react';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import { FeatureFlag } from '../../../Elements/Shared';

export default ({ onCloseDrawer }) => {
  const options = [
    {
      href: '/m/decks',
      title: 'Decks',
    },
    {
      href: '/m/wants',
      title: 'Wants',
    },
    {
      href: '/m/collection',
      title: 'Collection',
    },
    {
      href: '/m/search',
      title: 'Advanced Search',
    },
    {
      href: '/m/life-tracker',
      title: 'Life Tracker (Beta)',
    },
  ];
  return (
    <List>
      {options.map(({ href, title, flag }) => (
        <FeatureFlag flag={flag} key={title}>
          <List.Item onClick={onCloseDrawer} style={{ padding: 0 }}>
            <Link
              to={href}
              style={{
                color: 'rgba(0, 0, 0, 0.85)',
                width: '100%',
                padding: '12px 0',
              }}
            >
              {title}
            </Link>
          </List.Item>
        </FeatureFlag>
      ))}
    </List>
  );
};
