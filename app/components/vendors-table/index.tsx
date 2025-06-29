'use client'
import { CellProps } from "react-table";
import Table, { Data, TableData } from "../table";
import { useEffect, useState } from "react";
import axios from "axios";

const tableData: TableData = {
    rows: [],
    columns: [
        { Header: 'شناسه', accessor: 'vendor_identifier', width: '110px', search: true },
        { Header: 'نام غرفه', accessor: 'vendor_name_persian', width: '350px', search: true },
        { Header: 'شماره تماس', accessor: 'phone_number_of_owner', search: true },
        { Header: 'تعداد سفارشات', accessor: 'the_number_of_purchase' },
        { Header: 'تعداد محصولات', accessor: 'the_number_of_products' },
        { Header: 'تعداد فروش', accessor: 'the_number_of_sold_products' },
        {
            Header: 'وضعیت',
            accessor: 'is_active',
            Cell: ({ value }: CellProps<Data, string>) => (
                <span className={`px-2 py-1 rounded-full text-xs ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {value ? "فعال" : "غیر فعال"}
                </span>
            )
        },
    ]
}

export default function VendorsTable() {
    const [data, setData] = useState<TableData>(tableData);

    useEffect(() => {
        axios.get(
            "https://q-commerce-api.basalam.com/ui/vendors/?limit=10&offset=0",
        )
            .then((res) => {
                setData(prev => ({ ...prev, rows: res.data.vendors }))
            })
    }, [])

    return (
        data.rows.length > 0 &&
        <Table data={data} />
    );
}
