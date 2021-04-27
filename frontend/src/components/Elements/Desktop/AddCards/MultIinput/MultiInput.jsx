import React from 'react';
import { Input, Tooltip, Button, Modal, message, Space, Typography } from 'antd';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ImportOutlined,
} from '@ant-design/icons';

import SearchSettings from 'components/Elements/Desktop/AddCards/AdvancedSearch/SearchSettings';
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
    cardOptions: null,
  };

  static contextType = CardContext;

  componentDidUpdate(_, prevState) {
    // checks for rows that need to be updated
    const { cardNames } = this.context;
    const { value, cardResults, cardOptions } = this.state;

    const currentCardNames = cardOptions?.cards?.map(({ name }) => name) ?? cardNames;

    const oldValues = prevState.value.split('\n');
    const forceUpdate = prevState.cardOptions !== cardOptions;
    let shouldUpdate = false;
    // prevents bug with pressing enter in an empty field
    if (!prevState.value.replace(/[\s]+/g, '') && !value.replace(/[\s]+/g, '')) {
      return;
    }

    const newCardResult = value.split('\n').map((row, index) => {
      if (row === oldValues[index] && !forceUpdate) return cardResults[index] || '';
      shouldUpdate = true;
      if (
        !row.replace(/[\s]+/g, '') ||
        row.startsWith('//') ||
        row.startsWith('SB') ||
        row.match(/\(\d+\)$/)
      ) {
        return { name: NO_CARD };
      }
      // Removes sideboard indicators (currently filtered by the function above)
      // and second half of a two faced name
      const { amount, name } = splitSearchString(row);
      const normalize = (str) =>
        str.toLowerCase().replace(/(^[sb:\s]*[\d]+x*|\/\/.+$|[.,'\s]+)/g, '');
      const normalizedRow = normalize(name);
      const foundName = currentCardNames.find(
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
    const { cardResults, cardOptions } = this.state;
    const { cards } = this.context;
    if (!cards || !cards.length) {
      message.warn('Still initializing.. please try again');
      return;
    }

    const cardNames = cardResults.filter(({ name }) => name && name !== NO_CARD);

    const getIdByName = (name) => {
      if (cardOptions?.cards)
        return cardOptions.cards.find((card) => card.name === name)?.id;
      return cards.find((card) => card.name === name)?.id;
    };

    const cardIds = cardNames.map(({ name, amount }) => ({
      amount,
      id: getIdByName(name),
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
          title="Import Card List"
          onCancel={() => this.setState({ isOpen: false })}
          footer={
            <Button
              type="primary"
              onClick={this.onSubmit}
              disabled={!isValidInput || !value}
            >
              Add Cards
            </Button>
          }
        >
          <StyledWrapper>
            <Space size={24} direction="vertical">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Typography.Text>Only cards from specific set:</Typography.Text>
                <SearchSettings
                  setCardOptions={(cardOptions) => this.setState({ cardOptions })}
                />
              </Space>
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
            </Space>
          </StyledWrapper>
        </Modal>
      </>
    );
  }
}
