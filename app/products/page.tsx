import Input from "@/components/input";
import Select from "@/components/select";

function Products() {
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
            <div>

            </div>
        </div>
    );
}

export default Products;