import { createGlobalStyle } from 'styled-components';
import { darkBackground } from '../constants/colors';

export default createGlobalStyle`
  /* transparent search field for deck view */
  .transparent  .ant-select-clear {
    border-radius: 50%;
  }
  .transparent input {
    border: none;
    color: white;
    background-color: rgba(45,45,45,0.6);
    
  }
  .transparent .ant-select-selection-placeholder {
    color: white;
    opacity: 0.7;
  }
  .dark-placeholder .ant-select-selection-placeholder {
    color: ${darkBackground};
    opacity: 0.5;
  }
  .transparent .ant-select-selection-search-input  {
    background-color: rgba(45,45,45, 1);
    border: none;
    opacity: 0.6;
    border-radius: 2px;
  }

  /* Highlight non-legal cards in table */
  .not-legal {
    background-color: #ffcfcf;
  }
  /* Highlight active cards in table */
  .table-active {
    background-color: #e4f0ff;
  }

  /* Flippable card */
  .flippable-card {
    top: 0;
    left: 0;
    right: 0;
    border: 0;
    width: 100%;
    height: auto;
    cursor: pointer;
    position: absolute;
    border-radius: 4%;
    background-size: cover;
    will-change: transform,opacity;
  }

  /* modal with transparent background */
  .transparent-modal .ant-modal-content {
    background-color: transparent;
  }

  .fullscreen-modal {
    margin: 0;
    top: 50px;
    width: auto !important;
    max-width: 100vw;
    padding-bottom: 0;
    position: fixed;
  }

  /* Darken selected color of auto completes to improve clarity for ben's laptop */
  .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
    background-color: #ececec;
  }

  .no-padding-collapse .ant-collapse-content > .ant-collapse-content-box {
    padding: 0 !important;
  }

  /* for some reason, this prevents the dropdown to match the size of its parent */
  .ant-select-dropdown {
    max-width: 0;
  }

  /* Fix bottom margin for divider, seems like their code for this changed */
  .ant-divider-horizontal {
    margin: 16px 0px 32px !important;
  }
  /* Prevent edit input field from jumping */
  div.ant-typography-edit-content {
    left: 0 !important;
  }

  .lazyload-wrapper {
    display: initial;
  }
  .fullscreen {
    width: 100%;
    height: 100%;
  }
  .lazyload-wrapper {
    width: 100%;
  }
`;
