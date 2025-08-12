"use client";
import React, { useState, useMemo, FC, ChangeEvent } from "react";
import {
  Column,
  useTable,
  useSortBy,
  useFilters,
  TableOptions,
  TableInstance,
  UseFiltersInstanceProps,
  UseSortByInstanceProps,
  Row,
} from "react-table";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Select from "../select";

export interface Data {
  [key: string]: any;
}

interface TableInstanceWithHooks<D extends object>
  extends TableInstance<D>,
  UseFiltersInstanceProps<D>,
  UseSortByInstanceProps<D> { }

type ExtendedColumn<D extends object> = Column<D> & {
  width?: string;
  search?: boolean;
};

export type TableData = {
  rows: Data[];
  columns: ExtendedColumn<Data>[];
  count?: number;
};

type TableProps = {
  data: TableData;
  count?: number;
  onChangeLimit?: (value: number) => void;
};

const Table: FC<TableProps> = ({ data, count, onChangeLimit = () => {} }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [filterInput, setFilterInput] = useState("");
  const [pageSize, setPageSize] = useState(10); // Number of records per page
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // Calculate paginated data
  const tdata = useMemo<Data[]>(() => {
    const start = (currentPage - 1) * pageSize;
    return data.rows;
  }, [data.rows, currentPage, pageSize]);

  const handleChangeLimit = (event: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(+event.currentTarget.value);
    onChangeLimit(+event.currentTarget.value)
  }

  const columns = useMemo<ExtendedColumn<Data>[]>(() => data.columns, [data.columns]);

  const defaultColumn = useMemo(
    () => ({
      Filter: ({ column }: { column: any }) =>
        column.search ? (
          <input
            className="w-full p-1 text-xs border rounded"
            placeholder="جستجو ..."
            onChange={(e) => column.setFilter(e.target.value)}
          />
        ) : (
          <></>
        ),
    }),
    []
  );

  // Use react-table hooks with proper typing
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setAllFilters,
  } = useTable(
    {
      columns,
      data: tdata,
      defaultColumn,
      initialState: {
        sortBy: [{ id: "id", desc: false }],
      },
    } as TableOptions<Data>,
    useFilters,
    useSortBy
  ) as TableInstanceWithHooks<Data>;

  // Handle global filter change
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || "";
    setFilterInput(value);
    setAllFilters([{ id: "title", value }]);
  };

  // Pagination logic
  const totalPages = Math.ceil((count || data.rows.length) / pageSize);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${currentPage === i
            ? "bg-indigo-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-indigo-100"
            }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-indigo-100"
        >
          قبلی
        </button>
        {pages}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-indigo-100"
        >
          بعدی
        </button>
      </div>
    );
  };

  return (
    <div className="w-full p-4 sm:bg-[var(--background2)] rounded-2xl">
      <div className="max-w-full mx-auto">
        <div className="bg-[var(--background)] rounded-2xl shadow-xl overflow-hidden">
          {/* Table header with search and title */}
          <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <h1 className="text-2xl font-bold">لیست غرفه داران</h1>
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="جستجو بر اساس نام..."
                  value={filterInput}
                  onChange={handleFilterChange}
                  className="w-full p-3 pr-10 rounded-lg bg-[var(--background)]/10 text-[var(--foreground)] placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-white"
                />
                <svg
                  className="absolute right-3 top-3.5 text-blue-200"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
          </div>

          {/* Main table */}
          <div className="overflow-x-auto">
            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[var(--hover-color)]">
                {headerGroups.map((headerGroup, headerGroupIndex) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    key={`header-group-${headerGroupIndex}`}
                  >
                    {headerGroup.headers.map((column: any, columnIndex) => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        key={`header-${headerGroupIndex}-${columnIndex}`}
                        className="px-6 py-3 text-right text-xs font-medium text-[var(--text-color)] uppercase tracking-wider"
                        style={{
                          width: column.width || "auto",
                          minWidth: column.width || "auto",
                          maxWidth: column.width || "none",
                        }}
                      >
                        <div
                          key={`header-content-${headerGroupIndex}-${columnIndex}`}
                          className="flex items-center gap-1"
                        >
                          <span>{column.render("Header")}</span>
                          {/* Sort icon */}
                          <span>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <span className="text-indigo-600">▼</span>
                              ) : (
                                <span className="text-indigo-600">▲</span>
                              )
                            ) : (
                              <span className="opacity-30">↕</span>
                            )}
                          </span>
                        </div>
                        {/* Column filter */}
                        <div
                          key={`filter-${headerGroupIndex}-${columnIndex}`}
                          className="mt-1"
                        >
                          {column.canFilter ? column.render("Filter") : null}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
                {rows.map((row: Row<Data>, rowIndex) => {
                  prepareRow(row);
                  const rowKey = row.id || `row-${rowIndex}`;
                  return (
                    <tr
                      {...row.getRowProps()}
                      key={rowKey}
                      className="hover:bg-[var(--hover-color)] transition-colors"
                    >
                      {row.cells.map((cell, cellIndex) => (
                        <td
                          {...cell.getCellProps()}
                          key={`cell-${rowKey}-${cellIndex}`}
                          className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-color)]"
                          style={{
                            width: cell.column.width || "auto",
                            minWidth: cell.column.width || "auto",
                            maxWidth: cell.column.width || "none",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table footer with pagination */}
          <div className="bg-[var(--hover-color)] px-6 py-4 flex flex-col md:flex-row justify-between items-center border-t border-gray-200">
            <div className="text-sm text-gray-500 mb-2 md:mb-0 flex">
              نمایش
              <Select
                label=""
                defaultValue={10}
                options={[
                  { name: "10", value: 10 },
                  { name: "20", value: 20 },
                  { name: "30", value: 30 },
                  { name: "40", value: 40 },
                  { name: "50", value: 50 },
                  { name: "100", value: 100 },
                ]}
                className="w-10"
                onChange={handleChangeLimit}
              />
              رکورد از {count ?? data.rows.length} رکورد
            </div>
            {totalPages > 1 && (
              <div className="flex items-center gap-4">
                {renderPagination()}
              </div>
            )}
          </div>
        </div>

        {/* Usage guide */}
        <div className="mt-8 p-6 bg-[var(--background)] rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-500 mb-4">راهنمای استفاده از جدول</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center ml-2">
                  <span className="text-indigo-700">1</span>
                </div>
                <h3 className="font-medium text-gray-800">مرتب‌سازی</h3>
              </div>
              <p className="text-sm text-gray-600">
                برای مرتب‌سازی داده‌ها بر اساس هر ستون، روی عنوان ستون کلیک کنید. با هر کلیک جهت مرتب‌سازی تغییر می‌کند.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center ml-2">
                  <span className="text-green-700">2</span>
                </div>
                <h3 className="font-medium text-gray-800">فیلتر کردن</h3>
              </div>
              <p className="text-sm text-gray-600">
                برای فیلتر کردن داده‌ها در هر ستون، از کادر جستجوی بالای هر ستون استفاده کنید.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center ml-2">
                  <span className="text-purple-700">3</span>
                </div>
                <h3 className="font-medium text-gray-800">جستجوی سراسری</h3>
              </div>
              <p className="text-sm text-gray-600">
                برای جستجوی کل داده‌ها، از کادر جستجوی بالای جدول استفاده کنید.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;