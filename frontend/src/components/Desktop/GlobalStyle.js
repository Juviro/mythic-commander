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

  /* Selected table row */ 
  .ant-table-tbody .selected {
    background-color: rgba(24, 144, 255, 0.1) !important;
  }
  .ant-table-tbody .selected  td {
    background-color: rgba(24, 144, 255, 0.1) !important;
  }
  .ant-table-tbody .selected .ant-table-column-sort {
    background: none;
    transition: background 0s;
  }

  .ant-table-tbody .selected:hover > td {
    background: none !important;
  }

  .ant-modal-content {
    overflow: hidden;
  }

  .recharts-surface {
    overflow: visible !important;
  }

  /* To allow full width tables */
  .ant-table-small {
    display: inherit;
  }

  /* Hoverable list */
  .hoverable .ant-list-item {
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: aliceblue;
    }
  }

  .add-tag-popover .ant-popover-inner-content {
    padding: 0;
  }

  /* 
    For some very strange reason, whenever you select a card
    from the search dropdown an input element is 
    briefly visible in the bottom of the screen.
    Seems like an antd bug.
   */
  body > input {
    display: none;
  }
`;
