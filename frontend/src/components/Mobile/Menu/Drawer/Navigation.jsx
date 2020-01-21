import React from 'react';
import { List } from 'antd';
import { Link } from 'react-router-dom';

export default () => {
  const options = [
    {
      href: '/m/search',
      title: 'Search',
    },
    {
      href: '/m/decks',
      title: 'Decks',
    },
    {
      href: '/m/collection',
      title: 'Collection',
    },
  ];
  return (
    <List>
      {options.map(({ href, title }) => (
        <List.Item key={title}>
          <Link to={href} style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
            {title}
          </Link>
        </List.Item>
      ))}
    </List>
  );
};
