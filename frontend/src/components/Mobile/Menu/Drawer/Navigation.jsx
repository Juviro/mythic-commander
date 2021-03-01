import React, { useContext } from 'react';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import UserContext from 'components/Provider/UserProvider';
import { FeatureFlag } from '../../../Elements/Shared';

export default ({ onCloseDrawer }) => {
  const { user } = useContext(UserContext);

  const options = [
    {
      href: '/m/my-decks',
      title: 'Decks',
      hidden: !user,
    },
    {
      href: '/m/my-wants',
      title: 'Wants',
      hidden: !user,
    },
    {
      href: '/m/collection',
      title: 'Collection',
      hidden: !user,
    },
    {
      href: '/m/search',
      title: 'Advanced Search',
    },
    {
      href: '/m/life-tracker',
      title: 'Life Tracker',
    },
  ];

  const filteredOptions = options.filter(({ hidden }) => !hidden);

  return (
    <List>
      {filteredOptions.map(({ href, title, flag }) => (
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
