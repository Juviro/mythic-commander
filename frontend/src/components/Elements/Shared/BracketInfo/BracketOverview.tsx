/* eslint-disable max-len */
import React from 'react';
import { UnifiedCard } from 'types/unifiedTypes';

interface BracketOverviewProps {
  gameChangers: UnifiedCard[];
}

const BracketOverview = ({ gameChangers }: BracketOverviewProps) => {
  return (
    <div>
      <h2>Game Changers in this deck ({gameChangers.length}):</h2>
      <ul>
        {gameChangers.map((card) => (
          <li key={card.id}>{card.name}</li>
        ))}
      </ul>
      <h2>Bracket Overview:</h2>
      <p>
        <b>Bracket 1: Exhibition</b>
        <br />
        <span>
          Incredibly casual, with a focus on decks built around a theme (like &quot;the
          Weatherlight Crew&quot;) as opposed to focused on winning.{' '}
          <b>No Game Changers, two-card combos, mass land denial, or extra-turn cards.</b>{' '}
          Tutors should be sparse.
        </span>
      </p>
      <p>
        <b>Bracket 2: Core</b>
        <br />
        <span>
          The power level of the average modern-day preconstructed deck sits here.{' '}
          <b>No Game Changers, two-card combos, or mass land denial.</b> You
          shouldn&apos;t expect to be chaining extra turns together. Tutors should be
          sparse.
        </span>
      </p>
      <p>
        <b>Bracket 3: Upgraded</b>
        <br />
        <span>
          Decks are stronger than modern-day preconstructed decks but not fully optimized
          and include a small number of Game Changers.{' '}
          <b>Up to three Game Changers, no mass land denial, no early two-card combos.</b>{' '}
          You shouldn&apos;t expect to be chaining extra turns together.
        </span>
      </p>
      <p>
        <b>Bracket 4: Optimized</b>
        <br />
        <span>
          Go wild with your highest-power cards! No restrictions other than the banned
          list.
        </span>
      </p>
      <p>
        <b>Bracket 5: cEDH</b>
        <br />
        <span>
          This bracket is powerful with an eye toward a metagame and tournament structure.
          No restrictions other than banned list.
        </span>
      </p>
    </div>
  );
};

export default BracketOverview;
