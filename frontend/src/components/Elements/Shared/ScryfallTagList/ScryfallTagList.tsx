import { Tooltip } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { UnifiedCard } from 'types/unifiedTypes';
import getDynamicUrl from 'utils/getDynamicUrl';
import CustomSkeleton from '../CustomSkeleton';

// e.g. "hand-positive" => "Hand Positive"
const formatTagName = (name: string) => {
  return name.replace(/-/g, ' ');
};

// replace markdown links with plain text
// e.g. "[is:vanilla](https://scryfall.com/search?q=is%3Avanilla)" => "is:vanilla"
const formatTagDescription = (description: string) => {
  return description?.replace(/\[(.*)\]\(.*\)/, '"$1"');
};

interface ScryfallTagListProps {
  card: UnifiedCard;
  loading: boolean;
}

const ScryfallTagList = ({ card, loading }: ScryfallTagListProps) => {
  if (!card || loading) return <CustomSkeleton.Line />;
  return (
    <div>
      {card.scryfallTags.map((tag, index) => (
        <Tooltip title={formatTagDescription(tag.description)} key={tag.id}>
          <Link
            to={getDynamicUrl(`/search?scryfallTags=${tag.slug}`)}
            style={{ whiteSpace: 'nowrap' }}
          >
            {formatTagName(tag.name)}
          </Link>
          {index !== card.scryfallTags.length - 1 && <span>, </span>}
        </Tooltip>
      ))}
    </div>
  );
};

export default ScryfallTagList;
