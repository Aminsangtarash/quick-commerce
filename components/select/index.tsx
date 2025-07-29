function Select({options = []}) {
    return (
        <div className="flex flex-col">
            <div className="flex items-center">
                <span className="ml-1">غرفه</span>
                <div className="border border-width w-full"></div>
            </div>
            <select
                defaultValue={1}
                className="outline-none py-1 pl-2"
            >
                <option value={1}>انتخاب کنید</option>
                <option value={2}>بلک مارکت</option>
                <option value={3}>گوشت بازار</option>
                <option value={4}>فروشگاه پردیس جوان</option>
            </select>
        </div>
    );
}

export default Select;