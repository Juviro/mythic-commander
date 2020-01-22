import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  /* transparent search field for deck view */
  .transparent input {
    background-color: rgba(45, 45, 45, 0.6);
    border: none;
    color: #fff;
    
    &::placeholder {
      color: #fff;
    }
  }
  .transparent span svg {
    color: #fff;
  }
`;
