import gql from 'graphql-tag';

export const updateLtPlayer = gql`
  mutation updateLtPlayer($name: String!, $img: String, $color: String) {
    updateLtPlayer(name: $name, img: $img, color: $color) {
      name
      img
      color
      lastEdit
    }
  }
`;
