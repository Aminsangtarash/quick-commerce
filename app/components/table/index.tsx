"use client"
import React, { useState, useMemo, useEffect } from 'react';
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
  Row
} from 'react-table';

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
};

type TableProps = {
  data: TableData
};

const Table = ({ data }: TableProps) => {
  const tdata = useMemo<Data[]>(() => data.rows, [data.rows]);
  const columns = useMemo<ExtendedColumn<Data>[]>(() => data.columns, [data.columns]);
  const [filterInput, setFilterInput] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const defaultColumn = useMemo(() => ({
    Filter: ({ column }: { column: any }) => (
      column.search && !isMobile ? (
        <input
          className="w-full p-1 text-xs border rounded bg-white/90"
          placeholder={`جستجو ${column.Header}...`}
          onChange={e => column.setFilter(e.target.value)}
        />
      ) : null
    ),
  }), [isMobile]);

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    setFilterInput(value);
    setAllFilters([
      { id: 'name', value }
    ]);
  };

  const toggleColumnFilter = (columnId: string) => {
    setActiveColumn(activeColumn === columnId ? null : columnId);
  };

  return (
    <div className="w-full p-4 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with search */}
          <div className="p-4 md:p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <h1 className="text-xl md:text-2xl font-bold">لیست غرفه داران</h1>
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="جستجو بر اساس نام..."
                  value={filterInput}
                  onChange={handleFilterChange}
                  className="w-full p-2 md:p-3 pr-10 rounded-lg bg-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <svg
                  className="absolute right-3 top-3 md:top-3.5 text-blue-200"
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

          {/* Mobile column filter dropdown */}
          {isMobile && (
            <div className="p-3 bg-indigo-50 border-b">
              <div className="relative">
                <select 
                  className="w-full p-2 rounded-lg bg-white border border-indigo-300"
                  value={activeColumn || ''}
                  onChange={(e) => toggleColumnFilter(e.target.value)}
                >
                  <option value="">انتخاب ستون برای فیلتر</option>
                  {columns.filter(col => col.search).map(column => (
                    <option key={column.id} value={column.id}>
                      {column.Header as React.ReactNode}
                    </option>
                  ))}
                </select>
                <div className="absolute left-5 top-3 text-indigo-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                </div>
              </div>
              
              {activeColumn && (
                <div className="mt-2">
                  <input
                    className="w-full p-2 border rounded-lg"
                    placeholder={`جستجو...`}
                    onChange={e => {
                      const column = columns.find(c => c.id === activeColumn);
                      if (column) {
                        // @ts-ignore
                        column.setFilter(e.target.value);
                      }
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-50">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column: any) => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        className={`px-4 py-3 text-right text-xs font-medium text-indigo-800 uppercase tracking-wider ${isMobile ? 'hidden' : ''}`}
                        style={{ 
                          width: column.width || 'auto', 
                          minWidth: column.width || 'auto',
                          maxWidth: column.width || 'none'
                        }}
                      >
                        <div className="flex items-center gap-1">
                          <span>{column.render('Header')}</span>
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? <span className="text-indigo-600">▼</span>
                                : <span className="text-indigo-600">▲</span>
                              : <span className="opacity-30">↕</span>}
                          </span>
                        </div>
                        <div className="mt-1">{column.canFilter ? column.render('Filter') : null}</div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              
              <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="mt-4 text-lg">هیچ داده‌ای یافت نشد</p>
                        <p className="mt-1 text-sm">لطفاً عبارت جستجو را تغییر دهید</p>
                      </div>
                    </td>
                  </tr>
                ) : isMobile ? (
                  // Mobile card view
                  rows.map((row: Row<Data>) => {
                    prepareRow(row);
                    return (
                      <div key={row.id} className="p-4 border-b">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                          {row.cells.map(cell => {
                            const column = columns.find(col => col.id === cell.column.id);
                            return (
                              <div key={cell.column.id} className="px-4 py-3 flex justify-between border-b border-gray-100 last:border-b-0">
                                <div className="font-medium text-gray-600">{column?.Header as React.ReactNode}</div>
                                <div className="text-gray-800">{cell.render('Cell')}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  // Desktop table view
                  rows.map((row: Row<Data>) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} className="hover:bg-indigo-50/50 transition-colors">
                        {row.cells.map(cell => (
                          <td
                            {...cell.getCellProps()}
                            className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                            style={{ 
                              width: cell.column.width || 'auto', 
                              minWidth: cell.column.width || 'auto',
                              maxWidth: cell.column.width || 'none',
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {cell.render('Cell')}
                          </td>
                        ))}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          <div className="bg-indigo-50 px-4 py-3 flex flex-col md:flex-row justify-between items-center border-t border-gray-200">
            <div className="text-sm text-indigo-800 mb-2 md:mb-0">
              نمایش <span className="font-medium">{rows.length}</span> رکورد از {tdata.length} رکورد
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1.5 text-xs md:text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                خروجی Excel
              </button>
              <button className="px-3 py-1.5 text-xs md:text-sm border border-indigo-300 text-indigo-700 rounded-lg hover:bg-indigo-50 transition flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                چاپ جدول
              </button>
            </div>
          </div>
        </div>

        {/* Usage guide - hidden on mobile */}
        {!isMobile && (
          <div className="mt-6 p-5 bg-white rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-700 mb-4">راهنمای استفاده از جدول</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center ml-2">
                    <span className="text-blue-700 font-bold">1</span>
                  </div>
                  <h3 className="font-medium text-gray-800">مرتب‌سازی</h3>
                </div>
                <p className="text-sm text-gray-600">
                  برای مرتب‌سازی داده‌ها بر اساس هر ستون، روی عنوان ستون کلیک کنید. با هر کلیک جهت مرتب‌سازی تغییر می‌کند.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center ml-2">
                    <span className="text-green-700 font-bold">2</span>
                  </div>
                  <h3 className="font-medium text-gray-800">فیلتر کردن</h3>
                </div>
                <p className="text-sm text-gray-600">
                  برای فیلتر کردن داده‌ها در هر ستون، از کادر جستجوی بالای هر ستون استفاده کنید.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center ml-2">
                    <span className="text-purple-700 font-bold">3</span>
                  </div>
                  <h3 className="font-medium text-gray-800">جستجوی سراسری</h3>
                </div>
                <p className="text-sm text-gray-600">
                  برای جستجوی کل داده‌ها، از کادر جستجوی بالای جدول استفاده کنید.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Mobile tips */}
        {isMobile && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow">
            <h3 className="font-medium text-gray-700 mb-2">نکات استفاده در موبایل</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-start">
                <span className="text-indigo-600 ml-1">•</span>
                برای فیلتر ستون‌ها از منوی بالای جدول استفاده کنید
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 ml-1">•</span>
                هر ردیف به صورت یک کارت نمایش داده می‌شود
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 ml-1">•</span>
                برای مشاهده همه ستون‌ها به چپ و راست اسکرول کنید
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;