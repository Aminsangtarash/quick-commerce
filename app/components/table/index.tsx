"use client"
import React, { useState, useMemo, FC, ReactNode, ElementType } from 'react';
import {
  Column,
  useTable,
  useSortBy,
  useFilters,
  TableOptions,
  TableInstance,
  UseFiltersInstanceProps,
  UseSortByInstanceProps,
  HeaderGroup,
  Row,
  CellProps
} from 'react-table';

// تعریف نوع داده‌ای برای رکوردها
export interface Data {
  [key: string]: any;
}

// تعریف نوع برای جدول با فیلترها و سورت
interface TableInstanceWithHooks<D extends object>
  extends TableInstance<D>,
  UseFiltersInstanceProps<D>,
  UseSortByInstanceProps<D> { }

export type TableData = {
  rows: Data[];
  columns: Column<Data>[]
};

type TableProps = {
  data: TableData
}

const Table: FC<TableProps> = ({ data }) => {
  // داده‌های جدول
  const tdata = useMemo<Data[]>(() => data.rows, []);

  // تعریف ستون‌های جدول
  const columns = useMemo<Column<Data | any>[]>(() => data.columns, []);

  // فیلتر جستجو
  const [filterInput, setFilterInput] = useState('');

  // تعریف فیلتر سراسری
  const defaultColumn = useMemo(() => ({
    Filter: ({ column }: { column: any }) => (
      <input
        className="w-full p-1 text-xs border rounded"
        placeholder={`جستجو ${column.Header}...`}
        onChange={e => column.setFilter(e.target.value)}
      />
    ),
  }), []);

  // استفاده از هوک‌های react-table با تایپ صحیح
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setAllFilters
  } = useTable(
    {
      columns,
      data: tdata,
      defaultColumn,
      initialState: {
        sortBy: [{ id: 'id', desc: false }]
      }
    } as TableOptions<Data>,
    useFilters,
    useSortBy
  ) as TableInstanceWithHooks<Data>;

  // اعمال فیلتر جستجوی سراسری
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    setFilterInput(value);

    // استفاده از setAllFilters به جای setFilter
    setAllFilters([
      { id: 'name', value }
    ]);
  };

  return (
    <div className="w-full p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* هدر جدول با جستجو و عنوان */}
          <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <h1 className="text-2xl font-bold">لیست غرفه داران</h1>
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="جستجو بر اساس نام..."
                  value={filterInput}
                  onChange={handleFilterChange}
                  className="w-full p-3 pr-10 rounded-lg bg-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
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

          {/* جدول اصلی */}
          <div className="overflow-x-auto">
            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200 ">
              <thead className="bg-gray-50">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column: any) => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <div className="flex items-center gap-1">
                          <span>{column.render('Header')}</span>
                          {/* آیکون مرتب‌سازی */}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? <span className="text-indigo-600">▼</span>
                                : <span className="text-indigo-600">▲</span>
                              : <span className="opacity-30">↕</span>}
                          </span>
                        </div>
                        {/* فیلتر ستون */}
                        <div className="mt-1">{column.canFilter ? column.render('Filter') : null}</div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                {rows.map((row: Row<Data>) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="hover:bg-blue-50 transition-colors">
                      {row.cells.map(cell => (
                        <td
                          {...cell.getCellProps()}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                        >
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* پانوشت جدول */}
          <div className="bg-gray-50 px-6 py-4 flex flex-col md:flex-row justify-between items-center border-t border-gray-200">
            <div className="text-sm text-gray-500 mb-2 md:mb-0">
              نمایش <span className="font-medium">{rows.length}</span> رکورد از {tdata.length} رکورد
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                خروجی Excel
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                چاپ جدول
              </button>
            </div>
          </div>
        </div>

        {/* راهنمای استفاده */}
        <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">راهنمای استفاده از جدول</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                  <span className="text-indigo-700">1</span>
                </div>
                <h3 className="font-medium">مرتب‌سازی</h3>
              </div>
              <p className="text-sm text-gray-600">
                برای مرتب‌سازی داده‌ها بر اساس هر ستون، روی عنوان ستون کلیک کنید. با هر کلیک جهت مرتب‌سازی تغییر می‌کند.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <span className="text-green-700">2</span>
                </div>
                <h3 className="font-medium">فیلتر کردن</h3>
              </div>
              <p className="text-sm text-gray-600">
                برای فیلتر کردن داده‌ها در هر ستون، از کادر جستجوی بالای هر ستون استفاده کنید.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                  <span className="text-purple-700">3</span>
                </div>
                <h3 className="font-medium">جستجوی سراسری</h3>
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