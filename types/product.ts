import { Category } from "./category";
import { Picture } from "./picture";
import { Vendor } from "./vendor";

interface LocationDeployment {
    name: string;
    value: number;
    description: string | null;
}

interface UnitType {
    name: string;
    value: number;
    description: string | null;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    photo?: Picture;
    status: {
        name: string;
        value: number;
        description: string | null
    };
    vendor: Vendor;
    summary: string | null;
    category: Category;
    inventory: number;
    net_weight: number;
    created_at: string;
    updated_at: string;
    description: string;
    primary_price: number | null;
    packaged_weight: number;
    preparation_day: number;
    net_weight_decimal: number;
    location_deployment: LocationDeployment;
    url: string;
    published: boolean | null;
    sales_count: number;
    view_count: number;
    can_add_to_cart: boolean;
    has_variation: boolean;
    unit_quantity: number;
    unit_type: UnitType;
    discount: number | null;
}