type SelectProps = {
    label: string;
}

function Input({ label }: SelectProps) {
    return (
        <div className="flex flex-col">
            <div className="flex items-center">
                <span className="ml-1 text-nowrap">{label}</span>
                <div className="border-b border-width w-full"></div>
            </div>
            <input
                className="outline-none border border-[#cccccc] rounded-sm my-1 px-1"
            />
        </div>
    );
}

export default Input;