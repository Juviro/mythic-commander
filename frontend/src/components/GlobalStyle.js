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
`;
