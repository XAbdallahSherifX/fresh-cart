"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export default function PaginationComponent({
  pageCount,
  currentPage,
  onPageChange,
}: {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;
    if (pageCount <= maxPagesToShow + 2) {
      for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > maxPagesToShow) {
        pageNumbers.push("...");
      }
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(pageCount - 1, currentPage + 1);
      if (currentPage <= maxPagesToShow) {
        startPage = 2;
        endPage = maxPagesToShow;
      }
      if (currentPage > pageCount - maxPagesToShow) {
        startPage = pageCount - maxPagesToShow + 1;
        endPage = pageCount - 1;
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      if (currentPage < pageCount - maxPagesToShow + 1) {
        pageNumbers.push("...");
      }
      pageNumbers.push(pageCount);
    }
    return pageNumbers;
  };
  const pageNumbers = generatePageNumbers();
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            aria-disabled={currentPage === 1}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50 text-lg" : "text-lg"
            }
          />
        </PaginationItem>
        {pageNumbers.map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page as number);
                }}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < pageCount) onPageChange(currentPage + 1);
            }}
            aria-disabled={currentPage === pageCount}
            className={
              currentPage === pageCount ? "pointer-events-none opacity-50 text-lg" : "text-lg"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
