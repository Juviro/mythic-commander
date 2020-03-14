import { createGlobalStyle } from 'styled-components';

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
  .transparent .ant-select-selection__clear {
    background-color: transparent;
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

  /* single card view owned styling for collapse */
  .collapse-owned > .ant-collapse-item {
    border: 1px solid #e4e2e2;
    border-radius: 8px !important;
    background-color: white;
  }
`;
