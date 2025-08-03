'use client'
import axios from "@/axios-instance";
import Button from "@/components/button";
import Card from "@/components/card";
import Input from "@/components/input";
import Select from "@/components/select";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";

function Products() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        axios.get("/vendor-products/products?per_page=10&page=1")
            .then(res => {
                setProducts(res.data.data)
            })
    }, [])

    return (
        <div className="">
            <div className="flex gap-5">
                <Input
                    label="جستجو در عنوان"
                />
                <Select
                    label="غرفه"
                    options={[
                        { name: "بلک مارکت", value: 2 },
                        { name: "گوشت بازار", value: 3 },
                        { name: "فروشگاه پردیس جوان", value: 4 },
                        { name: "هایپر فردوس", value: 5 }
                    ]}
                />
                <Select
                    label="تگ"
                    options={[
                        { name: "ارسال 2 ساعته به قم", value: 2 },
                        { name: "ارسال 3 ساعته به قم", value: 3 },
                        { name: "ارسال 4 ساعته به قم", value: 4 },
                        { name: "ارسال 5 ساعته به قم", value: 5 },
                        { name: "ارسال امروز به قم", value: 6 }
                    ]}
                />
            </div>
            <div className="grid my-10">
                <div className="flex flex-col col-2">
                    <Button className="">افزودن تگ</Button>
                    <Button variant="secondary" className="mt-2">حذف تگ</Button>
                </div>
                <div className="flex flex-wrap gap-2 col-10 px-5">
                    {
                        products.map((product) =>
                            <Card
                                key={product.id}
                                imageUrl={product.photo?.md}
                                title={product.title}
                                price={876786}
                                check
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Products;