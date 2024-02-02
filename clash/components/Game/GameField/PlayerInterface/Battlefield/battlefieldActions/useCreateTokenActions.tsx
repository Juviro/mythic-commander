import { RefObject, useContext, useMemo } from 'react';

import { BattlefieldCard, Player, TokenOption } from 'backend/database/gamestate.types';
import GameStateContext from 'components/Game/GameStateContext';
import useGameActions from 'components/Game/useGameActions';
import CardPositionContext from 'components/Game/CardPositionContext';
import { MenuProps, Select } from 'antd';
import { getRelativePosition } from '../BattlefieldDropzone/useBattlefieldDropzone';

const MAX_ORACLE_TEXT_LENGTH = 20;
const MAX_SUGGESTED_TOKENS = 15;

const getTokenName = ({ colors, powerToughness, name, oracle_text }: TokenOption) => {
  let tokenName = '';
  if (powerToughness) {
    tokenName += `${powerToughness} `;
  }
  tokenName += name;
  if (oracle_text && powerToughness) {
    const textWithoutReminderText = oracle_text.replace(/\(.*?\)/g, '');
    const displayedText =
      textWithoutReminderText.length > MAX_ORACLE_TEXT_LENGTH
        ? `"${textWithoutReminderText.slice(0, MAX_ORACLE_TEXT_LENGTH)}..."`
        : textWithoutReminderText;
    tokenName += `, ${displayedText}`;
  }
  if (colors) {
    tokenName += ` (${colors})`;
  }
  return tokenName;
};

interface TokenOptionWithId extends TokenOption {
  id: string;
}

interface Props {
  cards: BattlefieldCard[];
  player: Player;
  battlefieldRef: RefObject<HTMLDivElement>;
}

const useCreateTokenActions = ({ cards, player, battlefieldRef }: Props) => {
  const { gameState } = useContext(GameStateContext);
  const { contextMenuPosition } = useContext(CardPositionContext);
  const { createToken } = useGameActions();

  const allTokens = gameState?.resources?.tokens || [];

  const suggestedTokenIds = cards
    .map(({ meta }) => {
      return meta?.relatedCards?.map(({ id }) => id) ?? [];
    })
    .flat();
  const uniqueSuggestedTokenIds = [...new Set(suggestedTokenIds)];

  const suggestedTokens = useMemo(() => {
    return uniqueSuggestedTokenIds
      .map((id) => {
        return {
          ...allTokens.find(({ ids }) => ids.includes(id)),
          id,
        };
      })
      .sort((a, b) => {
        return (a.powerToughness ?? '999').localeCompare(b.powerToughness ?? '999');
      })
      .slice(0, MAX_SUGGESTED_TOKENS) as TokenOptionWithId[];
  }, [suggestedTokenIds.join(',')]);

  const onCreateToken = (token: TokenOptionWithId) => {
    const position = contextMenuPosition.current
      ? getRelativePosition(contextMenuPosition.current, battlefieldRef.current!)
      : undefined;

    createToken({
      cardId: token.id,
      battlefieldPlayerId: player.id,
      name: token.name,
      position,
    });
  };

  const suggestedTokenActions: MenuProps['items'] = suggestedTokens.map((token) => ({
    key: `create-token-${token.id}`,
    label: getTokenName(token),
    onClick: () => onCreateToken(token),
  }));

  const otherCounterOptions = allTokens
    .sort((a, b) => {
      return (a.powerToughness ?? '999').localeCompare(b.powerToughness ?? '999');
    })
    .map((token, index) => ({
      label: getTokenName(token),
      value: index,
    }));

  const otherTokenAction = {
    key: 'custom-token',
    label: (
      <Select
        autoFocus
        onSelect={(index) => {
          const token = allTokens[index];
          onCreateToken({ ...token, id: token.ids[0] });
        }}
        style={{ width: '100%', minWidth: 250 }}
        placeholder="Search token..."
        options={otherCounterOptions}
        showSearch
        filterOption={(value, { label }: { label: string } = { label: '' }) => {
          const unifyLabel = (val: string) =>
            val.toLowerCase().replace('/', '').split(' ');

          const labelTerms = unifyLabel(label);
          const lowerCaseTerms = unifyLabel(value);

          return lowerCaseTerms.every((term) =>
            labelTerms.some((labelTerm) => labelTerm.includes(term))
          );
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') return;
          e.stopPropagation();
        }}
        onClick={(e) => e.stopPropagation()}
      />
    ),
  };

  return suggestedTokenActions.concat(otherTokenAction);
};

export default useCreateTokenActions;
