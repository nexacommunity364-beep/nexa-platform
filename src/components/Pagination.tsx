import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1.5 rounded-lg hover:bg-dark-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronUp size={20} />
      </button>
      <span className="text-gray-400">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1.5 rounded-lg hover:bg-dark-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronDown size={20} />
      </button>
    </div>
  );
};
