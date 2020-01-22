import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  /* makes sure that the table border is always areound all columns */
  .ant-table-small {
    display: inline-block;
  }

  /* Support for ellipsis in collapse headers */
  .ant-collapse-header {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  /* Highlight non-legal cards in table */
  .not-legal {
    margin: 5px;
    background-color: #ffcfcf;
  }
`;
