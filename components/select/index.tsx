import { ComponentPropsWithoutRef } from "react";


type SelectProps = {
    options: { value: number | string, name: string }[];
    label: string;
} & ComponentPropsWithoutRef<"select">

function Select({ options = [], label, ...props }: SelectProps) {
    return (
        <div className="flex flex-col">
            <div className="flex items-center">
                <span className="ml-1">{label}</span>
                <div className="border-b border-width border-[var(--border)] w-full"></div>
            </div>
            <select
                defaultValue={1}
                className="outline-none py-1 pl-2"
                {...props}
            >
                <option value={1}>انتخاب کنید</option>
                {
                    options.map((option) =>
                        <option key={option.name + "" + option.value} value={option.value}>{option.name}</option>
                    )
                }
            </select>
        </div>
    );
}

export default Select;