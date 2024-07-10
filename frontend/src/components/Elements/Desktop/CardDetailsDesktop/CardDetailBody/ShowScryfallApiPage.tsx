import { LinkOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import FeatureFlag from 'components/Elements/Shared/FeatureFlag';
import { FEATURE_FLAG_DEBUG } from 'constants/featureFlags';
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  max-width: 220px;
  margin-left: 16px;
  margin-top: 8px;
`;

interface Props {
  cardId: string;
}

const ShowScryfallApiPage = ({ cardId }: Props) => {
  return (
    <FeatureFlag flag={FEATURE_FLAG_DEBUG}>
      <StyledButton
        href={`https://api.scryfall.com/cards/${cardId}`}
        target="_blank"
        rel="noopener noreferrer"
        icon={<LinkOutlined />}
      >
        Show on Scryfall Api
      </StyledButton>
    </FeatureFlag>
  );
};

export default ShowScryfallApiPage;
