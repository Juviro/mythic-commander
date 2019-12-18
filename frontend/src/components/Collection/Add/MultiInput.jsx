import React from 'react'
import { Input, Icon, Tooltip, Button } from 'antd'
import styled from 'styled-components'
import CardContext from '../../CardProvider/CardProvider'

const NO_CARD = 'NO_CARD'

const PLACEHOLDER = `One card per line

Possible Formats:
Forest
1 Forest
1x Forest

Ignore line with //
`

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`

const StyledButtonWrapper = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-end;
`

const StyledInputWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 20px;
`

const StyledStatus = styled.div`
  width: 30px;
  padding: 4px 0;
  display: flex;
  flex-direction: column;
`

const IconWrapper = styled.div`
  height: 21.1px;
  width: 100%;
`

const StyledIcon = styled(Icon)`
  display: flex;
  justify-content: flex-end;
`

const getIconStyles = name => ({
  type: name ? 'check-circle' : 'exclamation-circle',
  style: {
    color: name ? 'green' : 'red',
  },
})

export default class SearchField extends React.Component {
  static contextType = CardContext
  state = {
    cardResults: [],
    isValidInput: false,
    value: '',
  }

  componentDidUpdate(_, prevState) {
    const { cardNames } = this.context
    const { value, cardResults } = this.state
    const oldValues = prevState.value.split('\n')
    let shouldUpdate = false

    const newCardResult = value.split('\n').map((row, index) => {
      if (row === oldValues[index]) return cardResults[index]
      shouldUpdate = true
      if (!row.replace(/[\s]+/g, '') || row.startsWith('//') || row.startsWith('SB')) {
        return NO_CARD
      }
      // Remove sideboard indicators (CURRENTLY FILTERED), amount in front of name (number or number with x) and second half of a two faced name
      const normalize = str => str.toLowerCase().replace(/(^[sb:\s]*[\d]+x*|\/\/.+$|[.,'\s]+)/g, '')
      const normalizedRow = normalize(row)
      return cardNames.find(name => normalize(name) === normalizedRow)
    })

    if (!shouldUpdate && newCardResult.length === prevState.value.split('\n').length) return

    const isValidInput = newCardResult.every(Boolean)
    this.setState({ cardResults: newCardResult, isValidInput })
  }

  onChange = event => {
    const { value } = event.target
    this.setState({ value })
  }

  onSubmit = () => {
    const { onAddCards } = this.props
    const { cardResults } = this.state

    onAddCards(cardResults.filter(name => name && name !== NO_CARD))

    this.setState({
      value: '',
    })
  }

  render() {
    const { cardResults, isValidInput, value } = this.state

    return (
      <StyledWrapper>
        <StyledButtonWrapper>
          {Boolean(cardResults.length) && (
            <Button type="primary" onClick={this.onSubmit} disabled={!isValidInput || !value}>
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
              const isSubmit = e.metaKey || e.ctrlKey
              isSubmit && isValidInput && this.onSubmit()
            }}
            placeholder={PLACEHOLDER}
          />
          <StyledStatus>
            {cardResults.map((name, index) => (
              <IconWrapper key={`${index}${name}`}>
                {name !== NO_CARD && (
                  <Tooltip placement="right" title={name}>
                    <StyledIcon {...getIconStyles(name)} />
                  </Tooltip>
                )}
              </IconWrapper>
            ))}
          </StyledStatus>
        </StyledInputWrapper>
      </StyledWrapper>
    )
  }
}
