import { useState, useMemo } from 'react';

export const usePagination = (items, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);

    return {
      currentItems,
      totalPages,
      startIndex,
      endIndex,
      totalItems: items.length,
    };
  }, [items, currentPage, itemsPerPage]);

  return {
    ...paginationData,
    currentPage,
    setCurrentPage,
    itemsPerPage,
  };
};
