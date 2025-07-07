import React from 'react';
import { Divider } from 'antd';

import Flex from 'components/Elements/Shared/Flex';
import OracleText from 'components/Elements/Shared/OracleText/OracleText';
import { UnifiedCard } from 'types/unifiedTypes';

interface AdditionalInfoOracleTextAndRulesProps {
  card: UnifiedCard;
  loading: boolean;
  isFlipped: boolean;
}

const AdditionalInfoOracleTextAndRules = ({
  card,
  loading,
  isFlipped,
}: AdditionalInfoOracleTextAndRulesProps) => {
  return (
    <Flex direction="column" justify="space-between" style={{ height: '100%' }}>
      <span>
        <Divider>Oracle Text</Divider>
        <OracleText card={card} loading={loading} isFlipped={isFlipped} />
      </span>
    </Flex>
  );
};

export default AdditionalInfoOracleTextAndRules;
