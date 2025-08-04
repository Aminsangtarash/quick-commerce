import Image from "next/image";

type CardProps = {
    imageUrl?: string;
    title: string;
    subtitle?: string | null;
    price: number;
    check: boolean;
}

function Card({ imageUrl, title, subtitle, price, check }: CardProps) {
    return (
        <div className="overflow-hidden w-50 flex flex-col justify-center items-center p-2 shadow-lg rounded-lg cursor-pointer">
            <div className="flex justiry-center items-center border border-[#f9f2f2] w-full h-40 overflow-hidden rounded-lg relative">
                {
                    check &&
                    <div className="absolute top-1 right-2">
                        <input type="checkbox" className="" />
                    </div>
                }
                {
                    <div className="absolute top-1 left-2">
                        
                    </div>
                }
                {
                    imageUrl &&
                    <Image className="w-full h-auto" src={imageUrl} width={200} height={300} alt={title} />
                }
            </div>
            <h4 className="w-full overflow-hidden text-ellipsis truncate my-1">{title}</h4>
            <span>{subtitle}</span>
            <span>{price}</span>
        </div>
    );
}

export default Card;