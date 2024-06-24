import { createGlobalStyle } from 'styled-components';

import antdStyles from './AntdStyles';

export default createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  ${antdStyles}
`;
