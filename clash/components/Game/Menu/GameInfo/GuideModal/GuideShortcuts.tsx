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
    value: 'u',
  },
  {
    label: 'Tap / untap all lands',
    value: 'a',
  },
  {
    label: 'Draw card',
    value: 'd',
  },
  {
    label: 'Search library',
    value: '[SHIFT] + s',
  },
  {
    label: 'Shuffle library',
    value: 's',
  },
];

const HOVERING_SHORTCUTS = [
  {
    label: 'Tap card / selection',
    value: 't',
  },
  {
    label: 'Flip card / selection',
    value: 'f',
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
