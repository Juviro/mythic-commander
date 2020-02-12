import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
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
    width: auto;
    height: 100%;
    cursor: pointer;
    position: absolute;
    border-radius: 20px;
    background-size: cover;
    will-change: transform,opacity;
  }

  /* modal with transparent background */
  .transparent-modal .ant-modal-content {
    background-color: transparent;
  }
`;
