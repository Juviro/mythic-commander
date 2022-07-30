import React from 'react';
import { List, Typography } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import SplitCover from 'components/Elements/Shared/SplitCover/SplitCover';
import shimmer from 'components/Animations/shimmer';

const StyledImage = styled.img`
  margin: 0 16px 0 0;
  border-radius: 3px;
  overflow: hidden;
  height: 46px;
  min-width: 63px;
  max-width: 63px;
  display: block;
  ${shimmer}
`;

const StyledAddIcon = styled(PlusOutlined)`
  margin: 0 16px 0 0;
  border-radius: 3px;
  height: 46px;
  width: 63px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eaeaea;
  font-size: 24px;
`;

const StyledHeader = styled.div`
  font-size: 24px;
  font-weight: 400;
  margin-left: 16px;
`;

const StyledListItem = styled(List.Item)`
  display: flex;
  height: 71px;
  padding: 12px 16px;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 90%;
`;

const StyledSplitCover = styled.div`
  position: relative;
  width: 63px;
  height: 46px;
  margin-right: 16px;
`;

const ListItem = ({
  onClick,
  image,
  imgSrc,
  cardPreviews,
  name,
  showRightIcon,
  numberOfCards,
  additionalDescription,
}) => {
  let description = typeof numberOfCards === 'number' ? `${numberOfCards} Cards` : '';
  if (additionalDescription) description += additionalDescription;

  const getImage = () => {
    if (image) return image;
    if (imgSrc) return <StyledImage src={imgSrc} alt={name} />;
    if (cardPreviews)
      return (
        <StyledSplitCover>
          <SplitCover cardPreviews={cardPreviews} />
        </StyledSplitCover>
      );
    return null;
  };

  return (
    <StyledListItem
      onClick={onClick}
      actions={showRightIcon ? [<RightOutlined />] : undefined}
    >
      <List.Item.Meta
        title={
          <>
            <Left>
              <Typography.Text ellipsis strong style={{ fontSize: 16, maxWidth: '100%' }}>
                {name}
              </Typography.Text>
            </Left>
          </>
        }
        avatar={getImage()}
        description={description}
      />
    </StyledListItem>
  );
};

const OverviewList = ({ addElementText, onAddElement, elements, onClick, header }) => {
  const deckComponents = elements.map(
    ({ name, imgSrc, id, numberOfCards, additionalDescription, cardPreviews }) => (
      <ListItem
        name={name}
        showRightIcon
        imgSrc={imgSrc}
        cardPreviews={cardPreviews}
        onClick={() => onClick(id)}
        numberOfCards={numberOfCards}
        additionalDescription={additionalDescription}
      />
    )
  );

  const addElementComponent = onAddElement ? (
    <ListItem name={addElementText} onClick={onAddElement} image={<StyledAddIcon />} />
  ) : undefined;

  const dataSource = [addElementComponent, ...deckComponents].filter(Boolean);

  return (
    <List
      header={<StyledHeader>{header}</StyledHeader>}
      dataSource={dataSource}
      style={{ width: '100%' }}
      renderItem={(element) => element}
    />
  );
};

export default withRouter(OverviewList);
