'use client';
import axios from "@/axios-instance";
import Button from "@/components/button";
import Card from "@/components/card";
import Input from "@/components/input";
import Select from "@/components/select";
import { Product } from "@/types/product";
import { Vendor } from "@/types/vendor";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [checkedProducts, setCheckedProducts] = useState<number[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({ search: "", booth: "", tag: "" });
    const [vendors, setVendors] = useState<Vendor[]>([])

    const fetchProducts = async (reset = false) => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axios.get(`/vendor-products/products`, {
                params: {
                    per_page: 30,
                    page: reset ? 1 : (page + 1),
                    product_title: filters.search,
                    vendor_ids: +filters.booth ? +filters.booth : undefined,
                    tag: filters.tag,
                },
            });
            const newProducts = response.data.data;
            setProducts((prev) => (reset ? newProducts : [...prev, ...newProducts]));
            //   setHasMore(response.data.meta?.has_more || false);
            if (!reset) setPage((prev) => prev + 1);
        } catch (error) {
            console.error("Error fetching products:", error);
            //   fetchProducts()
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(true); // Initial fetch
    }, [filters]); // Refetch when filters change

    const handleClickProduct = (id: number) => {
        setCheckedProducts((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setPage(1); // Reset page on filter change
    };

    useEffect(() => {
        axios.get("/v1/vendors/?limit=10&offset=0")
            .then(res => {
                setVendors(res.data.vendors)
            })
    }, [])

    return (
        <div className="">
            <div className="flex flex-xs-col flex-md-row flex-wrap justify-center gap-5">
                <Input
                    label="جستجو در عنوان"
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                />
                <Select
                    label="غرفه"
                    options={vendors?.map(vendor => ({name: vendor.title, value: vendor.id}))}
                    onChange={(e) => handleFilterChange("booth", e.target.value)}
                />
                <Select
                    label="تگ"
                    options={[
                        { name: "ارسال 2 ساعته به قم", value: 2 },
                        { name: "ارسال 3 ساعته به قم", value: 3 },
                        { name: "ارسال 4 ساعته به قم", value: 4 },
                        { name: "ارسال 5 ساعته به قم", value: 5 },
                        { name: "ارسال امروز به قم", value: 6 },
                    ]}
                    onChange={(e) => handleFilterChange("tag", e.target.value)}
                />
            </div>
            <div className="grid md:grid-cols-[130px_1fr] my-10">
                <div className="hidden md:flex flex-col">
                    <Button className="">افزودن تگ</Button>
                    <Button variant="error" className="mt-2">حذف تگ</Button>
                </div>
                <InfiniteScroll
                    dataLength={products.length}
                    next={() => fetchProducts()}
                    hasMore={hasMore}
                    loader={<div className="text-center py-4">در حال بارگذاری...</div>}
                    endMessage={<div className="text-center py-4">محصولات بیشتری وجود ندارد</div>}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-5">
                        {products.map((product) => (
                            <Card
                                key={product.id}
                                imageUrl={product.photo?.md}
                                title={product.title}
                                price={product.price / 10}
                                checked={checkedProducts.includes(product.id)}
                                onClick={() => handleClickProduct(product.id)}
                            />
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default Products;