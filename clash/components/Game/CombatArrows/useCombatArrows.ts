import useWindowSize from 'hooks/useWindowSize';
import { useContext, useEffect, useMemo, useState } from 'react';
import useCombatStore, { Attacker } from 'store/combatStore';
import GameStateContext from '../GameStateContext';
import { getPlayerNameId } from '../GameField/PlayerInterface/PlayerName/PlayerName';
import { Point } from './CombatArrow';

interface TemporaryAttacker {
  id: string;
  to?: Point;
  isTemporary?: boolean;
}

interface AttackerPosition {
  id: string;
  from: Point;
  to: Point;
  isTemporary: boolean;
}

const getPositionOfElement = (element: Element) => {
  const { x, y, width, height } = element.getBoundingClientRect();

  return { x: x + width / 2, y: y + height / 2 };
};

const addPositions = (attacker: Attacker | TemporaryAttacker) => {
  const { id } = attacker;
  const fromElement = document.querySelector(`[data-card-id="${id}"]`);
  if (!fromElement) return null;

  const from = getPositionOfElement(fromElement);

  if (!('targetId' in attacker)) {
    return { ...attacker, from };
  }

  const { targetType, targetId } = attacker;
  const querySelector =
    targetType === 'card'
      ? `[data-card-id="${targetId}"]`
      : `#${getPlayerNameId(targetId)}`;
  const toElement = document.querySelector(querySelector);

  if (!toElement) throw new Error(`Element not found: ${querySelector}`);

  const to = getPositionOfElement(toElement);

  return { ...attacker, from, to };
};

const useCombatArrows = () => {
  const { gameState } = useContext(GameStateContext);

  const [mousePosition, setMousePosition] = useState({ x: 200, y: 200 });
  const selectedAttackerIds = useCombatStore((store) => store.selectedAttackerIds);
  const attackers = useCombatStore((store) => store.attackers);
  /**
   * A string that represents the positions of all cards that have an arrow
   * pointing from or to them.
   * This is used to trigger a re-render when the positions of the cards change.
   */
  const [cardPositionString, setCardPositionString] = useState('');

  const [windowWidth] = useWindowSize();

  const attackerIds = attackers.map((attacker) => attacker.id);
  const cardsWithArrow = selectedAttackerIds.concat(attackerIds);

  // Update the cardPositionString whenever the gameState changes
  useEffect(() => {
    const allBattlefieldCards = gameState!.players
      .flatMap((player) => player.zones.battlefield)
      .filter((card) => cardsWithArrow.includes(card.clashId));

    const newCardPositionString = allBattlefieldCards.reduce((acc, card) => {
      return `${acc};${card.position?.x},${card.position?.y}`;
    }, '');

    const timeout = setTimeout(() => {
      setCardPositionString(newCardPositionString);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [gameState]);

  const temporaryAttackers: TemporaryAttacker[] = selectedAttackerIds.map((id) => ({
    id,
    isTemporary: true,
  }));

  const allAttackers = [...temporaryAttackers, ...attackers];

  const attackersWithPositions = useMemo(() => {
    return allAttackers.map(addPositions).filter((e) => e !== null) as AttackerPosition[];
  }, [windowWidth, cardPositionString, selectedAttackerIds]);

  const attackersWithMousePosition = attackersWithPositions.map((attacker) => ({
    ...attacker,
    to: attacker.to ?? mousePosition,
  }));

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return {
    attackers: attackersWithMousePosition,
  };
};

export default useCombatArrows;
