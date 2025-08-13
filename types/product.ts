import { Category } from "./category";
import { Picture } from "./picture";
import { Vendor } from "./vendor";

// interface LocationDeployment {
//     name: string;
//     value: number;
//     description: string | null;
// }

interface UnitType {
    name: string;
    value: number;
    description: string | null;
}

interface ProductExtra {
    link: string;
    photo: {
        id: number;
        lg: string;
        md: string;
        original: string;
        sm: string;
        xs: string;
    };
    quantity: number;
    sales_count: number;
    unit_quantity: number;
    unit_type: UnitType;
    view_count: number;
    weight: number;
    price: number;
}

export interface Product {
    created_at: string;
    deleted_at: string | null;
    id: number;
    name: string;
    product_id: number;
    status: number;
    updated_at: string;
    vendor_id: number;
    extra: ProductExtra
}