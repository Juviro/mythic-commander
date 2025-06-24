import gql from 'graphql-tag';

export const getLandCycleFavorites = gql`
  query getLandCycleFavorites {
    landCycleFavorites
  }
`;

export const addLandCycleFavorite = gql`
  mutation addLandCycleFavorite($landCycleId: String!) {
    addLandCycleFavorite(landCycleId: $landCycleId)
  }
`;

export const removeLandCycleFavorite = gql`
  mutation removeLandCycleFavorite($landCycleId: String!) {
    removeLandCycleFavorite(landCycleId: $landCycleId)
  }
`;
