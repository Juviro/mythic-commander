import { createGlobalStyle } from 'styled-components';
import { darkBackground } from '../../constants/colors';

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
