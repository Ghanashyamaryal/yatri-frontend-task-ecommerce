import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  return (
    <nav
      className="flex justify-center items-center gap-2"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md cursor-pointer font-medium transition-colors 
          ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-brand-700 text-white"
          }`}
        aria-label="Previous Page"
      >
        ‹
      </button>

      {getPages().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md cursor-pointer font-medium transition-colors 
            ${
              page === currentPage
                ? "bg-brand-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-brand-700 hover:text-white"
            }`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md font-medium cursor-pointer transition-colors 
          ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-brand-700 text-white"
          }`}
        aria-label="Next Page"
      >
        ›
      </button>
    </nav>
  );
};

export default Pagination;
