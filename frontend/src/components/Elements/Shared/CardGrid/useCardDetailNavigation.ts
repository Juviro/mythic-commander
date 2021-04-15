import { useShortcut } from 'components/Hooks';
import { UnifiedCard } from 'types/unifiedTypes';
import { Pagination } from './usePagination';

interface Props {
  detailCardIndex: number | null;
  setDetailCardIndex: (index: number) => void;
  cards: UnifiedCard[];
  pagination: Pagination;
}

interface CardDetailNavigationType {
  onNext: () => void | null;
  onPrevious: () => void | null;
}

const useCardDetailNavigation = ({
  detailCardIndex,
  setDetailCardIndex,
  cards,
  pagination,
}: Props): CardDetailNavigationType => {
  const hasNext = pagination.hasNext || detailCardIndex + 1 < cards.length;
  const hasPrevious = pagination.hasPrevious || detailCardIndex > 0;

  const onNext = () => {
    const nextIndex = detailCardIndex + 1;
    if (nextIndex === cards.length) {
      setDetailCardIndex(0);
      pagination.onChange(pagination.current + 1);
    } else {
      setDetailCardIndex(nextIndex);
    }
  };
  const onPrevious = () => {
    const previousIndex = detailCardIndex - 1;
    if (previousIndex === -1) {
      setDetailCardIndex(pagination.pageSize - 1);
      pagination.onChange(pagination.current - 1);
    } else {
      setDetailCardIndex(previousIndex);
    }
  };

  useShortcut('ARROW_RIGHT', hasNext ? onNext : null, 'modal.cardDetails');
  useShortcut('ARROW_LEFT', hasPrevious ? onPrevious : null, 'modal.cardDetails');

  if (detailCardIndex === null) return null;

  return {
    onNext: hasNext ? onNext : null,
    onPrevious: hasPrevious ? onPrevious : null,
  };
};

export default useCardDetailNavigation;
