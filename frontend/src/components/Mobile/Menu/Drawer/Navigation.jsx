import React from 'react';
import { List } from 'antd';
import { Link } from 'react-router-dom';

export default ({ onCloseDrawer }) => {
  const options = [
    {
      href: '/m/decks',
      title: 'Decks',
    },
    {
      href: '/m/collection',
      title: 'Collection',
    },
    {
      href: '/m/wants',
      title: 'Wants',
    },
    {
      href: '/m/search',
      title: 'Advanced Search',
    },
  ];
  return (
    <List>
      {options.map(({ href, title }) => (
        <List.Item key={title} onClick={onCloseDrawer} style={{ padding: 0 }}>
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
      ))}
    </List>
  );
};
