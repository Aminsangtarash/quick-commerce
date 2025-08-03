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
        <div className="overflow-hidden w-50 flex flex-col justify-center items-center">
            <div className="flex justiry-center items-center border w-50 h-50 overflow-hidden rounded-lg">
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