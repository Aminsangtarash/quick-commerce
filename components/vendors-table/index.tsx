'use client'
import { CellProps } from "react-table";
import Table, { Data, TableData } from "../table";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "@/axios-instance";
import { useSearchParams } from "next/navigation";
import CloseIcon from "@/icons/close";
import Select from "../select";
import { Tag } from "@/types/tag";


const TagTableCell = ({ data }: { data: CellProps<Data, string> }) => {
    const [tag, setTag] = useState<any>(data.value);
    const [tags, setTags] = useState<Tag[] | null>(null);

    const handleRemoveTag = (row: any, value: any) => {
        if (row.original?.id) {
            axios.delete("/tags/delete-tag-from-vendors", {
                data: {
                    vendor_ids: [+row.original?.id],
                    tag_id: +(value.tag_id)
                }
            })
                .then((res) => {
                    if (res.status === 200)
                        setTag(null);
                })
        }
    }

    const handleAddTagToVendor = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value) {
            axios.post("/tags/add-tag-on-vendors", {
                vendor_ids: [+data.row.original?.id],
                tag_id: +(event.target.value)
            })
                .then(res => {
                    if (res.status === 200) {
                        const addedTag = tags?.find(x => x.tag_id === +(event.target.value))
                        setTag(addedTag)
                    }
                })
        }
    }

    useEffect(() => {
        setTag(data.value)
    }, [])

    const handleGetTags = () => {
        if (!tags)
            axios.get("/tags/tag-list")
                .then(res => {
                    setTags(res.data.tags)
                })
    }

    return (
        <div className="flex items-center">
            {
                tag ?
                    <>
                        <span className={`px-2 py-1 rounded-full text-xs`}>
                            {(tag)?.tag_name ?? tag?.title}
                        </span>
                        <CloseIcon width={10} color="red" className="cursor-pointer" onClick={() => handleRemoveTag(data.row, data.value)} />
                    </>
                    :
                    <>
                        <Select
                            label="انتخاب تگ"
                            options={tags?.map(item => ({ name: item.title, value: item.tag_id })) ?? []}
                            onChange={handleAddTagToVendor}
                            onClick={handleGetTags}
                        />
                    </>
            }
        </div>
    )
}

const tableData: TableData = ({
    rows: [],
    columns: [
        { Header: 'شناسه', accessor: 'id', width: '110px', search: true },
        { Header: 'نام غرفه', accessor: 'title', width: '350px', search: true },
        { Header: 'شماره تماس', accessor: 'owner_phone_number', search: true },
        { Header: 'تعداد سفارشات', accessor: 'purchase_count' },
        { Header: 'تعداد محصولات', accessor: 'product_count' },
        { Header: 'تعداد فروش', accessor: 'order_count' },
        {
            Header: 'تگ',
            accessor: 'tag',
            Cell: (data: CellProps<Data, string>) => (
                <TagTableCell data={data} />
            )
        },
        {
            Header: 'وضعیت',
            accessor: 'is_active',
            Cell: ({ value }: CellProps<Data, string>) => (
                <span className={`px - 2 py - 1 rounded - full text - xs ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {value ? "فعال" : "غیر فعال"}
                </span>
            )
        },
    ],
    count: 0
})

export default function VendorsTable() {
    const [data, setData] = useState<TableData>(tableData);
    const [limit, setLimit] = useState<number>(10);
    const searchParams = useSearchParams();
    const currentPage = (parseInt(searchParams.get("page") || "1") - 1) * 10;

    useEffect(() => {
        axios.get(`/v1/vendors/?limit=${limit}&offset=${currentPage}`,)
            .then((res) => {
                setData(prev => ({ ...prev, rows: res.data.vendors, count: res.data.count }));
            })
    }, [currentPage, limit])

    return (
        data && data.rows?.length > 0 &&
        <Table data={data} count={data.count} onChangeLimit={setLimit} />
    );
}
