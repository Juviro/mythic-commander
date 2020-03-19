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
  }
`;
