/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react';

class LongPress extends Component {
  shouldShortPress = true;

  moved = false;

  static defaultProps = {
    time: 500,
  };

  componentWillUnmount() {
    this.cancelTimeout();
  }

  startTimeout = () => {
    this.timeout = setInterval(this.longPressed, this.props.time);
  };

  longPressed = () => {
    this.shouldShortPress = false;
    if (this.props.onLongPress && this.moved === false) {
      this.props.onLongPress();
    }
  };

  cancelTimeout = () => {
    clearInterval(this.timeout);
  };

  onTouchStart = e => {
    this.shouldShortPress = true;
    this.moved = false;
    this.startTimeout();
    if (typeof this.props.onTouchStart === 'function') {
      this.props.onTouchStart(e);
    }
  };

  onTouchEnd = e => {
    this.cancelTimeout();
    if (this.props.onPress && this.shouldShortPress && this.moved === false) {
      this.props.onPress();
    }
    if (typeof this.props.onTouchEnd === 'function') {
      this.props.onTouchEnd(e);
    }
  };

  onTouchCancel = e => {
    this.cancelTimeout();
    if (typeof this.props.onTouchCancel === 'function') {
      this.props.onTouchCancel(e);
    }
  };

  onMove = e => {
    this.moved = true;
    if (typeof this.props.onTouchMove === 'function') {
      this.props.onTouchMove(e);
    }
  };

  render() {
    const { children, disabled } = this.props;

    if (disabled) {
      return children;
    }

    const props = {
      onContextMenu: e => e.preventDefault(),
      onTouchStart: this.onTouchStart,
      onMouseDown: this.onTouchStart,
      onTouchEnd: this.onTouchEnd,
      onMouseUp: this.onTouchEnd,
      onTouchMove: this.onMove,
      onMouseMove: this.onMove,
      onTouchCancel: this.onTouchCancel,
      onMouseLeave: this.onTouchCancel,
      style: {
        ...children.props.style,
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
      },
    };

    return React.cloneElement(children, { ...children.props, ...props });
  }
}

export default LongPress;
