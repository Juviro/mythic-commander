import React from 'react';

import GuideDataTable from './GuideDataTable';

const BASE_SHORTCUTS = [
  {
    label: 'Next Phase / Step',
    value: 'Space',
  },
  {
    label: 'End Turn',
    value: 'Enter',
  },
  {
    label: 'Add life',
    value: '+',
  },
  {
    label: 'Remove life',
    value: '-',
  },
];

const GAME_SHORTCUTS = [
  {
    label: 'Untap all permanents',
    value: 'U',
  },
  {
    label: 'Tap / untap all lands',
    value: 'A',
  },
  {
    label: 'Draw card',
    value: 'D',
  },
  {
    label: 'Search library',
    value: '[SHIFT] + S',
  },
  {
    label: 'Shuffle library',
    value: 'S',
  },
  {
    label: 'Reveal cards',
    value: 'R',
  },
  {
    label: 'Organize Lands',
    value: 'O',
  },
];

const HOVERING_SHORTCUTS = [
  {
    label: 'Tap card / selection',
    value: 'T',
  },
  {
    label: 'Transform card / selection',
    value: 'F',
  },
  {
    label: 'Clear selection',
    value: 'Escape',
  },
  {
    label: 'Move selection to graveyard',
    value: 'Backspace / Delete',
  },
];

const GuideShortcuts = () => {
  return (
    <>
      <GuideDataTable items={BASE_SHORTCUTS} title="Base Shortcuts" />
      <GuideDataTable items={GAME_SHORTCUTS} title="Game Shortcuts" />
      <GuideDataTable
        items={HOVERING_SHORTCUTS}
        title="When Hovering a Card / With Selection"
      />
    </>
  );
};

export default GuideShortcuts;
