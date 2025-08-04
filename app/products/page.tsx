'use client'
import axios from "@/axios-instance";
import Button from "@/components/button";
import Card from "@/components/card";
import Input from "@/components/input";
import Select from "@/components/select";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";

function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [checkedProducts, setCheckedProducts] = useState<number[]>([]);

    useEffect(() => {
        axios.get("/vendor-products/products?per_page=30&page=1")
            .then(res => {
                setProducts(res.data.data)
            })
    }, [])

    const handleClickProduct = (id: number) => {
        setCheckedProducts(prev => {
            if(prev.includes(id)) {
                return prev.filter(x => x !== id)
            }
            return ([...prev, id])
        })
    }

    return (
        <div className="">
            <div className="flex flex-xs-col flex-md-row flex-wrap justify-center gap-5 ">
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
            <div className="grid md:grid-cols-[130px_1fr] my-10">
                <div className="hidden md:flex flex-col ">
                    <Button className="">افزودن تگ</Button>
                    <Button variant="error" className="mt-2">حذف تگ</Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-5">
                    {
                        products.map((product) =>
                            <Card
                                key={product.id}
                                imageUrl={product.photo?.md}
                                title={product.title}
                                price={product.price/10}
                                checked={checkedProducts.includes(product.id)}
                                onClick={() => handleClickProduct(product.id)}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Products;