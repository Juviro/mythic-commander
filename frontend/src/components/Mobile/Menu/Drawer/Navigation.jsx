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
      href: '/m/cards?owned=1',
      title: 'Collection',
    },
  ];
  return (
    <List>
      {options.map(({ href, title }) => (
        <List.Item key={title} onClick={onCloseDrawer}>
          <Link to={href} style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
            {title}
          </Link>
        </List.Item>
      ))}
    </List>
  );
};
