import { User } from "./user";

interface Province {
    name: string;
    value: number;
    description: string | null;
}

interface City {
    name: string;
    value: number;
    province: Partial<Province>
}

interface Status {
    name: string;
    value: number;
    description: string;
}

interface CategoryType {
    name: string;
    value: number;
    description: string | null;
}

interface ShippingMethod {
    name: string;
    value: number;
    description: string | null;
}

interface HomeTabSetting {
    "name": "banners",
    "order": 1,
    "is_active": true,
    "extra_data": null
}

export interface Vendor {
    id: number;
    identifier: string;
    title: string;
    logo: string | null;
    available_cities: City[];
    summary: string,
    status: Partial<Status>,
    city: City;
    category_type: CategoryType[];
    user: User;
    is_active: boolean;
    notice: string;
    product_count: number;
    free_shipping_to_iran: number | null;
    free_shipping_to_same_city: number | null;
    about_your_life: string | null;
    about_your_place: string | null;
    worth_buy: string | null;
    telegram_id: string | null;
    telegram_channel: string | null;
    instagram: string | null;
    eitaa: string | null;
    order_count: number;
    last_activity: string;
    created_at: string;
    elapsed_time_from_creation: string;
    score: number | null;
    video: string | null;
    shipping_methods: ShippingMethod[];
    product_sort_type: number | null;
    home_tab_settings: HomeTabSetting[];
    shipping_version: number;
}