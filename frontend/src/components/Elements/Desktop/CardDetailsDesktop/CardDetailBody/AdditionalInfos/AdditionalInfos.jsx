import React from 'react';
import { Row, Col, Divider } from 'antd';

import styled from 'styled-components';
import CardLinks from 'components/Elements/Shared/CardLinks';
import ScryfallTagList from 'components/Elements/Shared/ScryfallTagList/ScryfallTagList';
import RelatedCards from '../RelatedCards';
import AdditionalInfoOracleTextAndRules from './AdditionalInfoOracleTextAndRules';
import OtherInfo from './OtherInfo';

const StyledColumn = styled(Col)`
  padding: 8px;
`;

const AdditionalInfos = ({ card, loading, isFlipped }) => {
  return (
    <>
      <Row style={{ width: '100%' }}>
        <StyledColumn span={14}>
          <AdditionalInfoOracleTextAndRules
            card={card}
            loading={loading}
            isFlipped={isFlipped}
          />
        </StyledColumn>
        <StyledColumn span={10}>
          <OtherInfo card={card} loading={loading} />
        </StyledColumn>
      </Row>
      <Row style={{ width: '100%' }}>
        <StyledColumn span={8}>
          <Divider>Related Cards</Divider>
          <RelatedCards card={card} loading={loading} />
        </StyledColumn>
        <StyledColumn span={8}>
          <Divider>Resources</Divider>
          <CardLinks card={card} loading={loading} />
        </StyledColumn>
        <StyledColumn span={8}>
          <Divider>Scryfall Tags</Divider>
          <ScryfallTagList card={card} loading={loading} />
        </StyledColumn>
      </Row>
    </>
  );
};

export default AdditionalInfos;
