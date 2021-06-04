import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  div {
    user-select: none;
  }
  /* center items in Select component horizontally */
  .ant-select-selection-selected-value {
    display: flex !important;
    align-items: center;
  }

  /* disable hover color for table to avoid confusion */
  .ant-table-tbody > tr:hover > td {
    background: none !important;
  }

  /* add small margin to bottom of tables. Original value is "0 8px" */
  .ant-table-small > .ant-table-content > .ant-table-body {
    margin: 0 8px 2px;
  }

  .ant-list-item-meta-content {
    max-width: calc(100% - 50px);
  }

  /* Used in deck -> wants */
  .no-padding-collapse > .ant-collapse-item {
    border: none;
  }
  .no-padding-collapse .ant-collapse-content-box {
    padding: 0;
  }
  .no-padding-collapse .ant-collapse-header > span {
    left: 0 !important;
  }
  .no-padding-collapse .ant-collapse-header {
    padding-left: 20px !important;
  }
`;
