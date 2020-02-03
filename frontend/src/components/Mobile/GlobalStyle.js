import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  /* transparent search field for deck view */
  .transparent > div {
    background-color: rgba(45, 45, 45, 0.6);
  }
  .transparent input {
    border: none;
    color: rgba(255, 255, 255, 0.7);
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }
  .transparent span svg {
    color: rgba(255, 255, 255, 0.7);
  }
`;
