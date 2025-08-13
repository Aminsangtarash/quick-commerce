import { useState, useEffect, useRef } from 'react';

interface MultiSelectComboboxProps {
    id: string;
    options: any[];
    value: (string | number)[];
    onChange: (value: (string | number)[]) => void;
    onSearch: (query: string) => void;
    labelKey?: string;
    valueKey?: string;
    placeholder?: string;
}

export default function MultiSelectCombobox({
    id,
    options,
    value,
    onChange,
    onSearch,
    labelKey = 'name',
    valueKey = 'id',
    placeholder = 'Search...',
}: MultiSelectComboboxProps) {
    const [query, setQuery] = useState('');
    const [cache, setCache] = useState<Map<string, string>>(new Map());
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setError(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!isNumberOrNumericString(query)) {
            const timer = setTimeout(() => {
                if (query !== '') {
                    onSearch(query);
                    setIsOpen(true);
                } else {
                    setIsOpen(false);
                }
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [query, onSearch]);

    const isNumberOrNumericString = (input: string): boolean => {
        return /^\d+$/.test(input.trim());
    };

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && query !== '') {
            event.preventDefault();
            if (isNumberOrNumericString(query)) {
                const id = query.trim();
                if (value.includes(id)) {
                    setError('ID already selected');
                    return;
                }

                try {
                    onChange([...value, id]);
                    setQuery('');
                    setError(null);
                    setIsOpen(false);
                } catch (error) {
                    setError('Invalid ID or failed to fetch');
                }
            } else {
                setError('Please enter a valid numeric ID');
            }
        }
    };

    const handleSelect = (id: (string | number)) => {
        if (!value.includes(id)) {
            onChange([...value, id]);
        }
        setQuery('');
        setIsOpen(false);
        setError(null);
    };

    const removeItem = (id: (string | number)) => {
        onChange(value.filter((v) => v !== id));
        setError(null);
    };

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <div className="flex items-center border border-gray-300 rounded-md bg-white">
                <div className="flex flex-wrap flex-1 p-2 gap-1">
                    {value.map((id) => (
                        <span
                            key={id}
                            className="flex items-center bg-gray-200 text-gray-800 text-sm font-medium px-2 py-1 rounded-md"
                        >
                            {id || 'Loading...'}
                            <button
                                type="button"
                                className="mr-2 text-gray-500 hover:text-gray-700"
                                onClick={() => removeItem(id)}
                            >
                                ×
                            </button>
                        </span>
                    ))}
                    <input
                        id={id}
                        name={id}
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setError(null);
                        }}
                        onKeyDown={handleKeyDown}
                        onFocus={() => query && setIsOpen(true)}
                        placeholder={placeholder}
                        className="flex-1 outline-none bg-transparent min-w-[100px]"
                    />
                </div>
                <button
                    type="button"
                    className="px-2 text-gray-500"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    ▼
                </button>
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
            {isOpen && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {options.length === 0 && query !== '' ? (
                        <li className="p-2 text-gray-500">No results found</li>
                    ) : (
                        options.map((item) => (
                            <li
                                key={item[valueKey]}
                                onClick={() => handleSelect(item[valueKey])}
                                className="cursor-pointer p-2 hover:bg-blue-100 hover:text-blue-900"
                            >
                                {item[labelKey]}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}