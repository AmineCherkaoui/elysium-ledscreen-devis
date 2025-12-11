"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconColumns,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import ContactStatusFilter from "./contact-status-filter";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  searchPlaceholder?: string;
  enableColumnVisibility?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  pageSizeOptions?: number[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  searchPlaceholder = "Rechercher...",
  enableColumnVisibility = true,
  enableFiltering = true,
  enablePagination = true,
  pageSizeOptions = [5, 10, 20, 50],
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = searchParams?.get("page") ? Number(searchParams.get("page")) : 1;

  const per_page = searchParams?.get("limit")
    ? Number(searchParams.get("limit"))
    : 10;

  const search = searchParams?.get("search") ?? "";

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    message: false,
  });

  const [searchTerm, setSearchTerm] = useState(search);

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === "") {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      });

      return newSearchParams.toString();
    },
    [searchParams]
  );

  const handleSearch = () => {
    if (!searchTerm)
      return router.push(
        `${pathname}?${createQueryString({
          search: null,
          page: 1,
        })}`
      );

    router.push(
      `${pathname}?${createQueryString({
        search: searchTerm,
        page: 1,
      })}`
    );
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    router.push(
      `${pathname}?${createQueryString({
        search: null,
        page: 1,
      })}`
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const onPaginationChange = (updaterOrValue: any) => {
    const previousState = {
      pageIndex: page - 1,
      pageSize: per_page,
    };

    const nextState =
      typeof updaterOrValue === "function"
        ? updaterOrValue(previousState)
        : updaterOrValue;

    router.push(
      `${pathname}?${createQueryString({
        page: nextState.pageIndex + 1,
        limit: nextState.pageSize,
      })}`
    );
  };

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: per_page,
      },
      columnVisibility,
    },
    manualPagination: true,
    manualFiltering: true,
    onPaginationChange: onPaginationChange,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full space-y-4">
      <div
        className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between"
        suppressHydrationWarning
      >
        <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
          {enableFiltering && (
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "absolute left-1.5 top-1/2 h-6 w-6 -translate-y-1/2 p-0 text-foreground",
                    {
                      "hover:bg-primary-500 hover:text-white": searchTerm,
                    }
                  )}
                  onClick={handleSearch}
                >
                  <IconSearch className="h-3 w-3" />
                </Button>

                <Input
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  id="search-input"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="pl-9 border border-gray-200"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0 hover:bg-red-100 hover:text-red-700"
                    onClick={handleClearSearch}
                  >
                    <IconX className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {enableColumnVisibility && (
          <div className="flex gap-2 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto h-8 border-gray-200"
                >
                  <IconColumns className="h-4 w-4" />
                  Colonnes
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 border-gray-200">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize font-text"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(value)
                      }
                    >
                      {(column.columnDef.header as string) || column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <ContactStatusFilter />
          </div>
        )}
      </div>

      <div className="rounded-md border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-full text-sm">
            <TableHeader className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-gray-200">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="p-4 text-left text-xs font-bold uppercase tracking-wider text-gray-900 bg-gray-50"
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    className={`border-gray-200 hover:bg-gray-100 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-25"
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          className="p-4 text-sm text-gray-800"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-500"
                  >
                    Aucun résultat trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {enablePagination && (
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
            <div className="flex justify-between lg:justify-end gap-4 items-center ">
              <div className=" items-center gap-2 hidden lg:flex">
                <Label className="text-sm font-medium text-gray-700">
                  Lignes par page
                </Label>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                >
                  <SelectTrigger className="w-20 h-8 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    className="border-gray-200 font-text"
                    side="top"
                  >
                    {pageSizeOptions.map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="text-sm font-medium text-gray-700">
                Page {table.getState().pagination.pageIndex + 1} sur{" "}
                {table.getPageCount() || 1}
              </div>

              <div className=" items-center gap-1 flex">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 hidden lg:flex bg-white border-gray-200"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Aller à la première page</span>
                  <IconChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 border-gray-200 bg-white"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Aller à la page précédente</span>
                  <IconChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 border-gray-200 bg-white "
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Aller à la page suivante</span>
                  <IconChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 hidden lg:flex border-gray-200 bg-white "
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Aller à la dernière page</span>
                  <IconChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
