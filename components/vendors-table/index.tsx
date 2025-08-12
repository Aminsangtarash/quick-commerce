'use client'
import { CellProps } from "react-table";
import Table, { Data, TableData } from "../table";
import { useEffect, useState } from "react";
import axios from "@/axios-instance";
import { useSearchParams } from "next/navigation";

const tableData: TableData = {
    rows: [],
    columns: [
        { Header: 'شناسه', accessor: 'id', width: '110px', search: true },
        { Header: 'نام غرفه', accessor: 'title', width: '350px', search: true },
        { Header: 'شماره تماس', accessor: 'owner_phone_number', search: true },
        { Header: 'تعداد سفارشات', accessor: 'purchase_count' },
        { Header: 'تعداد محصولات', accessor: 'product_count' },
        { Header: 'تعداد فروش', accessor: 'order_count' },
        {
            Header: 'وضعیت',
            accessor: 'is_active',
            Cell: ({ value }: CellProps<Data, string>) => (
                <span className={`px-2 py-1 rounded-full text-xs ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {value ? "فعال" : "غیر فعال"}
                </span>
            )
        },
    ],
    count: 0
}

export default function VendorsTable() {
    const [data, setData] = useState<TableData>(tableData);
    const [limit, setLimit] = useState<number>(10);
    const searchParams = useSearchParams();
    const currentPage = (parseInt(searchParams.get("page") || "1") -1) * 10;

    useEffect(() => {
        axios.get(`/v1/vendors/?limit=${limit}&offset=${currentPage}`,)
            .then((res) => {
                setData(prev => ({ ...prev, rows: res.data.vendors, ...res.data }));
            })
    }, [currentPage, limit])

    const finalData = data

    return (
        data.rows.length > 0 &&
        <Table data={data} count={data.count} onChangeLimit={setLimit}/>
    );
}
