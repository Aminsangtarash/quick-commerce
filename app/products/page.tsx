'use client';
import axios from "@/axios-instance";
import Button from "@/components/button";
import Card from "@/components/card";
import MultiSelectCombobox from "@/components/combobox";
import Dialog from "@/components/dialog";
import Input from "@/components/input";
import Select from "@/components/select";
import { Product } from "@/types/product";
import { Tag } from "@/types/tag";
import { Vendor } from "@/types/vendor";
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type DialogData = {
    open: boolean;
    productIds?: (string | number)[];
}

type AddTagDialogProps = {
    onClose?: () => void;
    tags: Tag[]
} & DialogData;

const AddTagDialog: FC<AddTagDialogProps> = ({ open, onClose = () => { }, productIds = [], tags }) => {
    const [selected, setSelected] = useState<(string | number)[]>([]);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [options, setOptions] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSelectTag = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedTag(event.target.value)
    }

    useEffect(() => {
        setSelected(productIds)
    }, [productIds])

    useEffect(() => {
        if (searchQuery === '') {
            setOptions([]);
            return;
        }

        const fetchOptions = async () => {
            try {
                const res = await axios.get(`/vendor-products/products-new?product_title=${searchQuery}&per_page=30&page=1`);
                if (!res) throw new Error('Failed to fetch');
                const data = res.data.data.products;
                setOptions(data);
            } catch (error) {
                console.error('Error fetching options:', error);
                setOptions([]);
            }
        };

        fetchOptions();
    }, [searchQuery]);


    const handleAddTagToProducts = () => {
        if (selected && selectedTag) {
            axios.post("/tags/add-tag-on-products", {
                product_ids: selected.map(item => (+item)),
                tag_id: +(selectedTag)
            })
                .then(res => {
                    setSelected([]);
                })
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <div>
                <div>
                    <h4>افزودن تگ به محصولات</h4>
                </div>
                <div className="p-4 max-w-md mx-auto">
                    <MultiSelectCombobox
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        onSearch={setSearchQuery}
                        labelKey="name"
                        valueKey="product_id"
                        placeholder="جستجو..."
                    />
                    {/* {
                        selected.length > 0 &&
                        <p>آیدی های انتخاب شده: {selected.join(', ')}</p>
                    } */}
                    <Select
                        label="تگ"
                        options={tags?.map(tag => ({ name: tag.title, value: tag.tag_id }))}
                        onChange={handleSelectTag}
                        wrapperProps={{
                            className: "mt-2"
                        }}
                    />
                </div>
                <Button className="w-full mt-4" onClick={handleAddTagToProducts}>
                    تگ گزاری
                </Button>
            </div>
        </Dialog>
    )
}

function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [checkedProducts, setCheckedProducts] = useState<number[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({ search: null, booth: 0, tag: null });
    const [vendors, setVendors] = useState<Vendor[]>([])
    const [tags, setTags] = useState<Tag[]>([]);
    const [dialogData, setDialogData] = useState<DialogData>({ open: false })

    const fetchProducts = async (reset = false) => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axios.get(`/vendor-products/products-new`, {
                params: {
                    per_page: 30,
                    page: reset ? 1 : (page + 1),
                    product_title: filters.search,
                    vendor_ids: +filters.booth ? +filters.booth : undefined,
                    tag_id: filters.tag ? filters.tag : undefined,
                },
            });
            const newProducts = response.data.data.products;
            if (newProducts) {
                setProducts((prev) => (reset ? newProducts : [...prev, ...newProducts]));
            } else {
                setHasMore(response.data.meta?.has_more || false);
            }
            if (!reset) setPage((prev) => prev + 1);
        } catch (error) {
            console.error("Error fetching products:", error);
            //   fetchProducts()
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(true);
    }, [filters]);

    const handleClickProduct = (id: number) => {
        setCheckedProducts((prev) =>
            prev.includes(id) ? prev?.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setPage(1);
    };

    const handleOpenTagDialog = (ids?: (string | number)[]) => {
        setDialogData({ open: true, productIds: ids })
    }

    const handleCloseDialog = useCallback(() => {
        setDialogData({ open: false })
    }, [])

    useEffect(() => {
        axios.get("/v1/vendors/?limit=10&offset=0")
            .then(res => {
                setVendors(res.data.vendors)
            })
    }, [])

    useEffect(() => {
        axios.get("/tags/tag-list")
            .then(res => {
                setTags(res.data.tags)
            })
    }, [])

    return (
        <div className="">
            <AddTagDialog open={dialogData.open} onClose={handleCloseDialog} productIds={checkedProducts} tags={tags} />
            <div className="flex flex-xs-col flex-md-row flex-wrap justify-center gap-5">
                <Input
                    label="جستجو در عنوان"
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                />
                <Select
                    label="غرفه"
                    options={vendors?.map(vendor => ({ name: vendor.title, value: vendor.id }))}
                    onChange={(e) => handleFilterChange("booth", e.target.value)}
                />
                <Select
                    label="تگ"
                    options={tags?.map(tag => ({ name: tag.title, value: tag.tag_id }))}
                    onChange={(e) => handleFilterChange("tag", e.target.value)}
                />
            </div>
            <div className="grid md:grid-cols-[130px_1fr] my-10">
                <div className="hidden md:flex flex-col">
                    <Button className="" onClick={() => handleOpenTagDialog(checkedProducts)}>افزودن تگ</Button>
                    <Button variant="error" className="mt-2">حذف تگ</Button>
                </div>
                <InfiniteScroll
                    dataLength={products?.length ?? 0}
                    next={() => fetchProducts()}
                    hasMore={hasMore}
                    loader={products?.length === 0 ? <div className="text-center py-4">محصولی وجود ندارد</div> : <div className="py-4"></div> }
                    endMessage={<div className="text-center py-4">محصولات بیشتری وجود ندارد</div>}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-5">
                        {products.map((product) => (
                            <Card
                                key={product.product_id}
                                imageUrl={product.extra?.photo?.md}
                                title={product.name}
                                price={product.extra?.price / 10}
                                checked={checkedProducts.includes(product.product_id)}
                                onClick={() => handleClickProduct(product.product_id)}
                            />
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default Products;