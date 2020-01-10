import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  .ant-notification {
      width: auto;
  }
  /* makes sure that the table border is always areound all columns */
  .ant-table-small {
    display: inline-block;
  }
`;
