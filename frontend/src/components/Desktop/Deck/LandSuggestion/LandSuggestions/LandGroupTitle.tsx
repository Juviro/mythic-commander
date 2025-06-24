import { StarTwoTone } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import {
  addLandCycleFavorite,
  getLandCycleFavorites,
  removeLandCycleFavorite,
} from '../LandSuggestionModal/mutations';

const StyledStar = styled(StarTwoTone)`
  path {
    transition: fill 0.3s ease-in-out;
    fill: ${({ selected }) => (selected ? '#ffd700' : '')};
  }

  &:hover path {
    fill: ${({ selected }) => (selected ? '' : '#ffd700')};
  }
`;

interface LandGroupTitleProps {
  title: string;
  selectedCount: number;
  totalCount: number;
  id: string;
}

const LandGroupTitle = ({
  title,
  selectedCount,
  totalCount,
  id,
}: LandGroupTitleProps) => {
  const [addFavorite] = useMutation(addLandCycleFavorite, {
    refetchQueries: [{ query: getLandCycleFavorites }],
  });
  const [removeFavorite] = useMutation(removeLandCycleFavorite, {
    refetchQueries: [{ query: getLandCycleFavorites }],
  });
  const { data } = useQuery(getLandCycleFavorites);

  const isFavorite = data?.landCycleFavorites.includes(id);

  const handleClick = async () => {
    if (isFavorite) {
      await removeFavorite({ variables: { landCycleId: id } });
    } else {
      await addFavorite({ variables: { landCycleId: id } });
    }
  };
  const tooltipContent = (
    <>
      <div>Favorite this group</div>
      <div>
        Your favorites will be prioritized when creating your mana base in the future.
      </div>
    </>
  );

  const isBasicLand = id === 'basicLands';

  if (isBasicLand) {
    return <span>{`${title} (${selectedCount})`}</span>;
  }

  return (
    <Space size={8} align="center">
      <span>{`${title} (${selectedCount}/${totalCount})`}</span>
      <Tooltip title={tooltipContent}>
        <StyledStar twoToneColor="#ffd700" onClick={handleClick} selected={isFavorite} />
      </Tooltip>
    </Space>
  );
};

export default LandGroupTitle;
