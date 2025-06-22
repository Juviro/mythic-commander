import React, { useContext } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';

import { Deck } from 'types/graphql';
import LandSuggestionSettings from '../LandSuggestionSettings/LandSuggestionSettings';
import { StyledLandWizardIcon } from '../LandSuggestionIcon';
import LandSuggestions from '../LandSuggestions/LandSuggestions';
import LandSuggestionContext from '../LandSuggestionContext';
import LandSuggestionModalFooter from './LandSuggestionModalFooter';

const StyledTitle = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledIcon = styled(StyledLandWizardIcon)`
  margin: 0;
  cursor: default;
  transform: unset !important;
  color: inherit !important;
`;

interface Props {
  deck: Deck;
}

const LandSuggestionModal = ({ deck }: Props) => {
  const { displaySetings, setIsOpen, settings, setSettings } =
    useContext(LandSuggestionContext);
  const { numberOfSelectedLands } = useContext(LandSuggestionContext);

  return (
    <Modal
      open
      width={1000}
      styles={{
        content: {
          maxWidth: '90vw',
        },
        body: {
          maxHeight: '80vh',
          overflow: 'auto',
        },
      }}
      okButtonProps={{
        disabled: !numberOfSelectedLands,
      }}
      footer={<LandSuggestionModalFooter />}
      onCancel={() => setIsOpen(false)}
      title={
        <StyledTitle>
          <StyledIcon />
          <span>Land Wizard</span>
          {Boolean(numberOfSelectedLands) && (
            <span>{`- ${numberOfSelectedLands} lands selected`}</span>
          )}
        </StyledTitle>
      }
    >
      {displaySetings ? (
        <LandSuggestionSettings settings={settings} setSettings={setSettings} />
      ) : (
        <LandSuggestions settings={settings} deck={deck} />
      )}
    </Modal>
  );
};

export default LandSuggestionModal;
