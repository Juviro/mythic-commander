import React from 'react';
import { Divider, Skeleton } from 'antd';
import OracleTextFace from './OracleTextFace';

export default ({ card, loading, isFlipped }) => {
  if (loading) return <Skeleton />;
  if (!card.oracle_text && !card.type_line) return null;

  const canFlip = card.isTwoFaced;
  const isSplitCard = !canFlip && card.type_line?.includes('//');

  const [cardTypeFront, cardTypeBack] = card.type_line?.split(' // ') ?? [];
  const [cardNameFront, cardNameBack] = card.name?.split(' // ') ?? [];
  const [frontText, backText] = card?.oracle_text?.split(/<\w+>/) ?? [];
  const [manaCostFront, manaCostBack] = card.mana_cost?.split(' // ') ?? [];

  const cardLinesFront = frontText?.split('\n').filter(Boolean);
  const cardLinesBack = backText?.split('\n').filter(Boolean);

  const displayFront = isSplitCard || !isFlipped || !canFlip;
  const displayBack = isSplitCard || isFlipped;

  return (
    <>
      {displayFront && (
        <OracleTextFace
          cardType={cardTypeFront}
          cardLines={cardLinesFront}
          cardName={cardNameFront}
          manaCost={manaCostFront}
        />
      )}
      {displayFront && displayBack && <Divider />}
      {displayBack && (
        <OracleTextFace
          cardType={cardTypeBack}
          cardLines={cardLinesBack}
          cardName={cardNameBack}
          manaCost={manaCostBack}
        />
      )}
    </>
  );
};
