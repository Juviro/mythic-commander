import React from 'react';
import styled from 'styled-components';
import { Divider, Space, Typography } from 'antd';

import { DeckQuickstats, ValueLabel } from 'components/Elements/Shared';
import DeckName from './DeckName';

const StyledInfoBox = styled(Space)`
  width: 100%;
  padding: 16px;
`;

const StyledDivider = styled(Divider)`
  && {
    margin-bottom: 0px !important;
  }
`;

export default ({ deck }) => {
  const commander = deck?.cards.find(({ isCommander }) => isCommander);

  return (
    <StyledInfoBox direction="vertical">
      <DeckName name={deck?.name} commander={commander} />
      <DeckQuickstats deck={deck} />
      <StyledDivider />
      <Space style={{ marginTop: 12 }}>
        <Typography.Text strong style={{ fontSize: 16 }}>
          Estimated Value:
        </Typography.Text>
        <ValueLabel list={deck} />
      </Space>
      <StyledDivider />
    </StyledInfoBox>
  );
};
