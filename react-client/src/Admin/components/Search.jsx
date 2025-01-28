import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

// const Search = ({ onSearch }) => {
//   return (
//     <div className="relative w-[300px]">
//       <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
//       <Input
//         placeholder="Search..."
//         onChange={(e) => onSearch(e.target.value)}
//         className="pl-8 bg-white"
//       />
//     </div>
//   );
// };

const Search = ({ onSearch, placeholder = 'Search...' }) => {
  return (
    <div className="relative w-[300px]">
      <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
      <Input
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className="pl-8 bg-white"
      />
    </div>
  );
};

export default Search;
