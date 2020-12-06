import React from 'react';
import { Input, Tooltip, Button, Modal, message } from 'antd';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ImportOutlined,
} from '@ant-design/icons';

import {
  StyledWrapper,
  StyledInputWrapper,
  StyledStatus,
  IconWrapper,
} from './StyledMultiInput';
import { splitSearchString } from '../../../Shared/CardSearch/CardSearch';
import CardContext from '../../../../Provider/CardProvider';

const NO_CARD = 'NO_CARD';

const PLACEHOLDER = `One card per line

Possible Formats:
Forest
1 Forest
1x Forest

Ignore line with //
`;

// TODO: refactor
export default class MultiInput extends React.Component {
  state = {
    value: '',
    isOpen: false,
    cardResults: [],
    isValidInput: false,
  };

  static contextType = CardContext;

  componentDidUpdate(_, prevState) {
    // checks for rows that need to be updated
    const { cardNames } = this.context;
    const { value, cardResults } = this.state;
    const oldValues = prevState.value.split('\n');
    let shouldUpdate = false;
    // prevents bug with pressing enter in an empty field
    if (!prevState.value.replace(/[\s]+/g, '') && !value.replace(/[\s]+/g, '')) {
      return;
    }

    const newCardResult = value.split('\n').map((row, index) => {
      if (row === oldValues[index]) return cardResults[index] || '';
      shouldUpdate = true;
      if (!row.replace(/[\s]+/g, '') || row.startsWith('//') || row.startsWith('SB')) {
        return { name: NO_CARD };
      }
      // Removes sideboard indicators (currently filtered by the function above)
      // and second half of a two faced name
      const { amount, name } = splitSearchString(row);
      const normalize = (str) =>
        str.toLowerCase().replace(/(^[sb:\s]*[\d]+x*|\/\/.+$|[.,'\s]+)/g, '');
      const normalizedRow = normalize(name);
      const foundName = cardNames.find(
        (cardName) => normalize(cardName) === normalizedRow
      );
      return { name: foundName, amount };
    });

    if (!shouldUpdate && newCardResult.length === prevState.value.split('\n').length) {
      return;
    }

    const isValidInput = newCardResult.every(({ name }) => name);
    this.setState({ cardResults: newCardResult, isValidInput });
  }

  onChange = (event) => {
    const { value } = event.target;
    this.setState({ value });
  };

  onSubmit = () => {
    const { onAddCards } = this.props;
    const { cardResults } = this.state;
    const { cards } = this.context;
    if (!cards || !cards.length) {
      message.warn('Still initializing.. please try again');
      return;
    }

    const cardNames = cardResults.filter(({ name }) => name && name !== NO_CARD);
    const cardIds = cardNames.map(({ name, amount }) => ({
      amount,
      id: cards.find((card) => card.name === name).id,
    }));
    const uniqueCardIds = cardIds.filter(
      ({ id }, index) => cardIds.findIndex((cardId) => cardId.id === id) === index
    );
    onAddCards(uniqueCardIds);

    this.setState({
      value: '',
      isOpen: false,
    });
  };

  render() {
    const { cardResults, isValidInput, value, isOpen } = this.state;
    const { buttonProps = { ghost: true, type: 'primary' } } = this.props;

    return (
      <>
        <Button
          onClick={() => this.setState({ isOpen: true })}
          icon={<ImportOutlined />}
          {...buttonProps}
        >
          Import Card List
        </Button>
        <Modal
          destroyOnClose
          visible={isOpen}
          title="Import Multiple"
          onCancel={() => this.setState({ isOpen: false })}
          footer={
            <Button
              type="primary"
              onClick={this.onSubmit}
              disabled={!isValidInput || !value}
            >
              Send
            </Button>
          }
        >
          <StyledWrapper>
            <StyledInputWrapper>
              <Input.TextArea
                value={value}
                autoFocus
                onChange={this.onChange}
                autoSize={{ minRows: 9 }}
                style={{ whiteSpace: 'pre' }}
                onPressEnter={(e) => {
                  const isSubmit = e.metaKey || e.ctrlKey;
                  if (isSubmit && isValidInput) this.onSubmit();
                }}
                placeholder={PLACEHOLDER}
              />
              <StyledStatus>
                {cardResults.map(({ name }) => (
                  <IconWrapper key={Math.random()}>
                    {name !== NO_CARD && (
                      <Tooltip placement="right" title={name || 'Could not find card'}>
                        {name ? (
                          <CheckCircleOutlined
                            style={{ color: 'green', marginLeft: 16 }}
                          />
                        ) : (
                          <ExclamationCircleOutlined
                            style={{ color: 'red', marginLeft: 16 }}
                          />
                        )}
                      </Tooltip>
                    )}
                  </IconWrapper>
                ))}
              </StyledStatus>
            </StyledInputWrapper>
          </StyledWrapper>
        </Modal>
      </>
    );
  }
}
