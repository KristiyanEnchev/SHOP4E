import { useState, useMemo } from 'react';

export const useSearch = (items, searchFields = []) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;

    return (
      items?.filter((item) => {
        const searchableValues = searchFields.length
          ? searchFields.map((field) => item[field])
          : Object.values(item);

        return searchableValues
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }) || []
    );
  }, [items, searchTerm, searchFields]);

  return { searchTerm, setSearchTerm, filteredItems };
};
