import React from 'react';
import { Input, Tooltip, Button } from 'antd';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  StyledWrapper,
  StyledButtonWrapper,
  StyledInputWrapper,
  StyledStatus,
  IconWrapper,
} from './StyledMultiInput';

import { splitAmountAndName } from '../../CardSearch/CardSearch';
import CardContext from '../../../CardProvider/CardProvider';

const NO_CARD = 'NO_CARD';

const PLACEHOLDER = `One card per line

Possible Formats:
Forest
1 Forest
1x Forest

Ignore line with //
`;

export default class MultiInput extends React.Component {
  state = {
    cardResults: [],
    isValidInput: false,
    value: '',
  };

  static contextType = CardContext;

  componentDidUpdate(_, prevState) {
    // checks for rows that need to be updated
    const { cardNames } = this.context;
    const { value, cardResults } = this.state;
    const oldValues = prevState.value.split('\n');
    let shouldUpdate = false;

    const newCardResult = value.split('\n').map((row, index) => {
      if (row === oldValues[index]) return cardResults[index];
      shouldUpdate = true;
      if (
        !row.replace(/[\s]+/g, '') ||
        row.startsWith('//') ||
        row.startsWith('SB')
      ) {
        return { name: NO_CARD };
      }
      // Remove sideboard indicators (currently filtered by the function above)
      // and second half of a two faced name
      const { amount, name } = splitAmountAndName(row);
      const normalize = str =>
        str.toLowerCase().replace(/(^[sb:\s]*[\d]+x*|\/\/.+$|[.,'\s]+)/g, '');
      const normalizedRow = normalize(name);
      const foundName = cardNames.find(
        cardName => normalize(cardName) === normalizedRow
      );
      return { name: foundName, amount };
    });

    if (
      !shouldUpdate &&
      newCardResult.length === prevState.value.split('\n').length
    )
      return;

    const isValidInput = newCardResult.every(({ name }) => name);
    this.setState({ cardResults: newCardResult, isValidInput });
  }

  onChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  onSubmit = () => {
    const { onAddCards } = this.props;
    const { cardResults } = this.state;

    onAddCards(cardResults.filter(({ name }) => name && name !== NO_CARD));

    this.setState({
      value: '',
    });
  };

  render() {
    const { cardResults, isValidInput, value } = this.state;

    return (
      <StyledWrapper>
        <StyledButtonWrapper>
          {Boolean(cardResults.length) && (
            <Button
              type="primary"
              onClick={this.onSubmit}
              disabled={!isValidInput || !value}
            >
              Send
            </Button>
          )}
        </StyledButtonWrapper>
        <StyledInputWrapper>
          <Input.TextArea
            value={value}
            onChange={this.onChange}
            autoSize={{ minRows: 9 }}
            style={{ whiteSpace: 'pre' }}
            onPressEnter={e => {
              const isSubmit = e.metaKey || e.ctrlKey;
              if (isSubmit && isValidInput) this.onSubmit();
            }}
            placeholder={PLACEHOLDER}
          />
          <StyledStatus>
            {cardResults.map(({ name }) => (
              <IconWrapper key={Math.random()}>
                {name !== NO_CARD && (
                  <Tooltip placement="right" title={name}>
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
    );
  }
}
