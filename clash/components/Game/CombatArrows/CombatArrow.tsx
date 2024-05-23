import React from 'react';

import styles from './CombatArrows.module.css';

export interface Point {
  x: number;
  y: number;
}

interface Props {
  from: Point;
  to: Point;
  isTemporary?: boolean;
}

const getLineLength = (from: Point, to: Point) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getPointOnLine = (from: Point, to: Point, distanceFromEnd = 25) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.sqrt(dx * dx + dy * dy);

  return {
    x: to.x - (dx / length) * distanceFromEnd,
    y: to.y - (dy / length) * distanceFromEnd,
  };
};

const CombatArrow = ({ from, to, isTemporary }: Props) => {
  const lineLength = getLineLength(from, to);
  if (lineLength < 25) return null;

  const pointOnLine = getPointOnLine(from, to);

  return (
    <svg className={styles.arrow}>
      <defs>
        <marker
          id="arrow"
          markerWidth="10"
          markerHeight="10"
          refX="5"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
          viewBox="0 0 20 20"
        >
          <path d="M0,0 L0,6 L9,3 z" fill="currentColor" />
        </marker>
      </defs>
      <line
        x1={from.x}
        y1={from.y}
        x2={pointOnLine.x}
        y2={pointOnLine.y}
        stroke="currentColor"
        opacity={isTemporary ? 0.6 : 0.8}
        strokeWidth="5"
        markerEnd="url(#arrow)"
      />
    </svg>
  );
};

export default CombatArrow;
