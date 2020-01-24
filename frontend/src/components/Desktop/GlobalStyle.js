import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  /* makes sure that the table border is always around all columns */
  .ant-table-small {
    display: inline-block;
  }

  /* Support for ellipsis in collapse headers */
  .ant-collapse-header {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
`;
