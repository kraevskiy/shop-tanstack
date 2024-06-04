import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Pagination as SPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { buttonVariants } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";

const Pagination = ({ total, limit, skip }: { total: number; limit: number; skip: number }) => {
  const activePage = Math.ceil(skip / limit);
  const countPages = Math.floor(total / limit);
  const isEllipsisStart = activePage > 1;
  const isEllipsisEnd = countPages - 1 > activePage;

  return (
    <SPagination>
      <PaginationContent>
        {activePage > 0 && (
          <PaginationItem>
            <Link
              search={{
                limit,
                skip: (activePage - 1) * limit,
              }}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "gap-1 pl-2.5",
              )}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Link>
          </PaginationItem>
        )}
        { isEllipsisStart && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {activePage > 0 && (
          <PaginationItem>
            <Link
              search={{
                limit,
                skip: (activePage - 1) * limit,
              }}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
              )}
            >
              {activePage}
            </Link>
          </PaginationItem>
        )}
        <PaginationItem>
          <Link
            search={{
              limit,
              skip: activePage * limit,
            }}
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
            )}
          >
            {activePage + 1}
          </Link>
        </PaginationItem>

        {activePage < countPages && (
          <PaginationItem>
            <Link
              search={{
                limit,
                skip: (activePage + 1) * limit,
              }}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
              )}
            >
              {activePage + 2}
            </Link>
          </PaginationItem>
        )}
        {isEllipsisEnd && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {activePage < countPages && (
          <PaginationItem>
            <Link
              search={{
                limit,
                skip: (activePage + 1) * limit,
              }}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "gap-1 pl-2.5",
              )}
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </PaginationItem>
        )}
      </PaginationContent>
    </SPagination>
  );
};

export default Pagination;
