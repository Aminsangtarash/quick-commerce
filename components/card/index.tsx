import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type CardProps = {
    imageUrl?: string;
    title: string;
    price: number;
    checked: boolean;
} & ComponentPropsWithoutRef<"div"> 

function Card({ imageUrl, title, price, checked, className, ...props }: CardProps) {
    return (
        <div className={twMerge(className, "overflow-hidden w-full flex flex-col justify-center items-center p-2 shadow-lg rounded-lg cursor-pointer ")} {...props}>
            <div className="flex justiry-center items-center border border-[#f9f2f2] w-full lg:h-[10vw] overflow-hidden rounded-lg relative">
                {
                    checked &&
                    <div className="absolute top-1 right-2">
                        <input type="checkbox" defaultChecked  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                }
                {
                    <div className="absolute top-1 left-2">

                    </div>
                }
                {
                    imageUrl &&
                    <Image className="w-full h-auto" draggable={false} src={imageUrl} width={200} height={300} alt={title} />
                }
            </div>
            <h4 className="w-full overflow-hidden text-ellipsis truncate mt-2 mb-4 text-sm">{title}</h4>
            <div className="w-full flex justify-end items-center">
                <span className="text-xs">{price.toLocaleString()}</span>
                <span className="text-[8px] mr-[1px]">تومان</span>
            </div>
        </div>
    );
}

export default Card;