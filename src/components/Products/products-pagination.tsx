import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import {cn} from "@/lib/utils";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import Link from "next/link";

type PaginationProps = {
    totalPages: number;
    currentPage: number;
    onChangePage: (page: number) => string;
};

export default function Paginations({
                                        totalPages,
                                        currentPage,
                                        onChangePage,
                                    }: PaginationProps) {
    return (
        totalPages > 1 && currentPage < totalPages + 1 && (
            <div className="flex justify-center sm:justify-end p-4 mx-auto">
                <Pagination className="font-text">
                    <PaginationContent className="flex gap-2">
                        <PaginationItem>
                            <Link
                                className={cn(
                                    "rounded-full cursor-pointer text-neutral-700 flex justify-center items-center size-8 transition-all",
                                    currentPage > 1
                                        ? "opacity-100 shadow-none bg-red hover:text-white hover:bg-primary-500"
                                        : "opacity-30 bg-transparent pointer-events-none"
                                )}
                                href={currentPage > 1 ? onChangePage(1) : "#"}
                            >
                                <ChevronsLeft/>
                            </Link>
                        </PaginationItem>

                        <PaginationItem>
                            <Link
                                className={cn(
                                    "rounded-full cursor-pointer text-neutral-700 flex justify-center items-center size-8 transition-all",
                                    currentPage > 1
                                        ? "opacity-100 shadow-none bg-red hover:text-white hover:bg-primary-500"
                                        : "opacity-30 bg-transparent pointer-events-none"
                                )}
                                href={currentPage > 1 ? onChangePage(currentPage - 1) : "#"}
                            >
                                <ChevronLeft/>
                            </Link>
                        </PaginationItem>

                        <PaginationItem>
                            <p className="text-neutral-600 text-sm" aria-live="polite">
                                Page <span className="text-neutral-900">{currentPage}</span> sur{" "}
                                <span className="text-neutral-900">{totalPages}</span>
                            </p>
                        </PaginationItem>

                        <PaginationItem>
                            <Link
                                className={cn(
                                    "rounded-full cursor-pointer text-neutral-700 flex justify-center items-center size-8 transition-all",
                                    currentPage !== totalPages
                                        ? "opacity-100 shadow-none bg-red hover:text-white hover:bg-primary-500"
                                        : "opacity-30 bg-transparent pointer-events-none"
                                )}

                                href={
                                    currentPage !== totalPages
                                        ? onChangePage(currentPage + 1)
                                        : "#"
                                }
                            >
                                <ChevronRight/>
                            </Link>
                        </PaginationItem>

                        <PaginationItem>
                            <Link
                                className={cn(
                                    "rounded-full cursor-pointer text-neutral-700 flex justify-center items-center size-8 transition-all",
                                    currentPage !== totalPages
                                        ? "opacity-100 shadow-none bg-red hover:text-white hover:bg-primary-500"
                                        : "opacity-30 bg-transparent pointer-events-none"
                                )}
                                href={
                                    currentPage !== totalPages
                                        ? onChangePage(totalPages)
                                        : "#"
                                }
                            >
                                <ChevronsRight/>
                            </Link>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        )
    );
}
