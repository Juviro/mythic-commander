import { useToggle } from 'components/Hooks';
import { useEffect } from 'react';
import { useQueryParam, NumberParam } from 'use-query-params';

export const CARD_WIDTH = 240;

export default (numberOfCards) => {
  const [currentPage = 1, setPageParam] = useQueryParam('page', NumberParam);
  const [pageSize, setPageSizeParam] = useQueryParam('pageSize', NumberParam);
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

  const setCurrentPage = (newPage, shouldReplace) =>
    setPageParam(newPage, shouldReplace ? 'replaceIn' : 'pushIn');
  const setPageSize = (newPageSize) => setPageSizeParam(newPageSize, 'replaceIn');

  const onChange = (newVal) => {
    setCurrentPage(newVal);
  };

  const pagination = {
    pageSize: pageSize || 10,
    current: currentPage,
    total: numberOfCards,
    onShowSizeChange: (_, newPageSize) => setPageSize(newPageSize),
    pageSizeOptions: ['10', '20', '50'],
    onChange,
  };

  return pagination;
};
