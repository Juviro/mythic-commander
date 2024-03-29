import { useToggle } from 'components/Hooks';
import { useEffect } from 'react';
import { useQueryParam, NumberParam } from 'use-query-params';
import scrollIntoView from 'utils/scrollIntoView';

export interface Pagination {
  pageSize: number;
  current: number;
  total: number;
  onShowSizeChange: (_: any, newPageSize: number) => void;
  pageSizeOptions: string[];
  onChange: (page: number) => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export default (
  numberOfCards: number,
  wrapperRef: { current: HTMLDivElement | null },
  hidePagination
) => {
  const [currentPage = 1, setPageParam] = useQueryParam('page', NumberParam);
  const [pageSize = 10, setPageSizeParam] = useQueryParam('pageSize', NumberParam);
  const [addedWithin] = useQueryParam('addedWithin', NumberParam);
  const [isInitialRender, toggleIsInitialRender] = useToggle(true);

  useEffect(() => {
    if (isInitialRender) {
      toggleIsInitialRender(false);
      return;
    }
    setPageParam(1);
    // eslint-disable-next-line
  }, [addedWithin]);

  const setCurrentPage = (newPage: number, shouldReplace = false) =>
    setPageParam(newPage, shouldReplace ? 'replaceIn' : 'pushIn');
  const setPageSize = (newPageSize: number) => setPageSizeParam(newPageSize, 'replaceIn');

  const onChange = (newVal: number) => {
    if (wrapperRef.current) {
      scrollIntoView(wrapperRef.current);
    }
    setCurrentPage(newVal);
  };

  const hasPrevious = currentPage > 1;
  const hasNext = !hidePagination && currentPage * pageSize < numberOfCards;

  const pagination = {
    pageSize,
    current: currentPage,
    total: numberOfCards,
    onShowSizeChange: (_: any, newPageSize: number) => setPageSize(newPageSize),
    pageSizeOptions: ['10', '20', '50'],
    onChange,
    hasPrevious,
    hasNext,
  };

  return pagination;
};
