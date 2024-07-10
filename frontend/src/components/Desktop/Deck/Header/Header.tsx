import React, { useContext } from 'react';

import { CardInputType } from 'types/graphql';
import { UnifiedDeck } from 'types/unifiedTypes';
import UserContext from 'components/Provider/UserProvider/UserProvider';
import { Button, Space } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import DeckActions from './DeckActions';

interface Props {
  deck?: UnifiedDeck;
  onAddCards: (cards: CardInputType[], name: string) => void;
}

const Header = ({ deck, onAddCards }: Props) => {
  const { user } = useContext(UserContext);

  if (!deck) return null;

  const baseUrl = process.env.REACT_APP_CLASH_URL || 'play.mythic-commander.com';
  const url = `${baseUrl}/playtest/${deck.id}`;

  return (
    <Space>
      {user && (
        <Button
          type="primary"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          icon={<RightOutlined />}
        >
          Playtest
        </Button>
      )}
      {deck.canEdit && <DeckActions deck={deck} onAddCards={onAddCards} />}
    </Space>
  );
};

export default Header;
