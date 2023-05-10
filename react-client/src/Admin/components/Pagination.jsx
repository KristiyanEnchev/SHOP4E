import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// const Pagination = ({ currentPage, totalPages, onPageChange, totalItems }) => {
const Pagination = ({ currentPage, totalPages, onPageChange, totalItems }) => {
  const handlePageInput = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      if (value > totalPages) {
        onPageChange(totalPages);
      } else if (value < 1) {
        onPageChange(1);
      } else {
        onPageChange(value);
      }
    }
  };

  return (
    <div className="flex items-center justify-between py-4 px-4">
      <span className="text-sm text-gray-500">Total entries: {totalItems}</span>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={currentPage}
            onChange={handlePageInput}
            className="w-16 text-center"
            min={1}
            max={totalPages}
          />
          <span className="text-sm text-gray-500">of {totalPages}</span>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
