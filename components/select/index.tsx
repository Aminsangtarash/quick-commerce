

type SelectProps = {
    options: {value: number | string, name: string}[];
    label: string;
}

function Select({ options = [], label }: SelectProps) {
    return (
        <div className="flex flex-col">
            <div className="flex items-center">
                <span className="ml-1">{label}</span>
                <div className="border-b border-width w-full"></div>
            </div>
            <select
                defaultValue={1}
                className="outline-none py-1 pl-2"
            >
                <option value={1}>انتخاب کنید</option>
                {
                    options.map((option) =>
                        <option value={option.value}>{option.name}</option>
                    )
                }
            </select>
        </div>
    );
}

export default Select;