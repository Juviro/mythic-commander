import React from 'react';
import styled from 'styled-components';

const rarityToColor = {
  common: {
    from: 'rgb(100,100,100)',
    to: 'rgb(33,33,33)',
  },
  uncommon: {
    from: 'rgb(185,220,235)',
    to: 'rgb(70,100,110)',
  },
  rare: {
    from: 'rgb(230,205,140)',
    to: 'rgb(118,98,55)',
  },
  mythic: {
    from: 'rgb(255,177,70)',
    to: 'rgb(180,50,25)',
  },
  land: {
    from: 'rgb(171, 103, 10)',
    to: 'rgb(82, 56, 36)',
  },
};

const getColorGradient = ({ rarity }) => {
  const { from, to } = rarityToColor[rarity];
  return `linear-gradient(45deg, ${to}, ${from}, ${to});`;
};

const StyledRarityWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledRarity = styled.div`
  font-size: 10px;
  transform: scale(1.2);
  background: ${getColorGradient};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default ({ rarity }) => {
  if (!rarity) return null;
  return (
    <StyledRarityWrapper>
      <StyledRarity rarity={rarity}>&#x2B24;</StyledRarity>
    </StyledRarityWrapper>
  );
};
