import React from 'react';
import styled from 'styled-components';
import { Slider } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useShortcut } from '../../../../Hooks';
import DesktopTooltip from '../../DesktopTooltip';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  width: 200px;
  margin: 0 16px;
`;

const MIN_ZOOM = 50;
const MAX_ZOOM = 200;
const DEFAULT_ZOOM = 100;
const ZOOM_STEP = 10;

export default ({ zoom, setZoom }) => {
  const onPlus = () => setZoom(Math.min(MAX_ZOOM, zoom + ZOOM_STEP));
  const onMinus = () => setZoom(Math.max(MIN_ZOOM, zoom - ZOOM_STEP));
  const onReset = () => setZoom(DEFAULT_ZOOM);

  useShortcut('+', onPlus);
  useShortcut('-', onMinus);
  useShortcut('0', onReset);

  if (!zoom) return null;

  return (
    <StyledWrapper>
      <DesktopTooltip title="Zoom Out [-]">
        <MinusOutlined onClick={onMinus} />
      </DesktopTooltip>
      <Slider
        style={{ width: 200, margin: '0 8px' }}
        value={zoom}
        step={ZOOM_STEP}
        min={MIN_ZOOM}
        max={MAX_ZOOM}
        onChange={setZoom}
        tipFormatter={val => `${val}%`}
      />
      <DesktopTooltip title="Zoom In [+]">
        <PlusOutlined onClick={onPlus} />
      </DesktopTooltip>
    </StyledWrapper>
  );
};
