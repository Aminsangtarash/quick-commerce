import { Picture } from "./picture";
import { Vendor } from "./vendor";

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
    "category": {
        "id": 188,
        "title": "گوشت مرغ و طیور",
        "placeholder": null,
        "parent": {
            "id": 22,
            "title": "محصولات پروتئینی",
            "placeholder": null,
            "parent": {
                "id": 1,
                "title": "مواد غذایی",
                "placeholder": null,
                "parent": null,
                "unit_type_id": null
            },
            "unit_type_id": null
        },
        "unit_type_id": {
            "name": "گرم",
            "value": 5060,
            "description": null
        }
    },
    "inventory": 0,
    "net_weight": 950,
    "created_at": "2025-07-31T21:14:09+03:30",
    "updated_at": "2025-08-02T10:15:44+03:30",
    "description": "جوجه کباب سینه مرغ زعفرانی شامل سینه مرغ خرد و طعم‌دار شده با ادویه و زعفران است. جوجه کباب یکی دیگر از کباب های اصیل ایرانی است که علاوه بر غذایی رایج و به صرفه در دورهمی‌ها و مهمانی‌ها وقت چندانی از شما نمی‌گیرد. بازار گوشت در تهیه این جوجه کباب از زعفران ناب استفاده می‌کند و از رنگ‌های خوراکی استفاده نمی‌کند. جوجه کباب سینه زعفرانی را در بسته‌بندی بهداشتی از بازار گوشت تهیه و با پیک دریافت کنید.",
    "primary_price": null,
    "packaged_weight": 1000,
    "preparation_day": 1,
    "net_weight_decimal": 950,
    "location_deployment": {
        "name": "ارسال توسط غرفه‌دار",
        "value": 3017,
        "description": null
    },
    "url": "https://basalam.com/goushtbazar/product/24972740",
    "published": null,
    "sales_count": 0,
    "view_count": 0,
    "can_add_to_cart": true,
    "has_variation": false,
    "unit_quantity": 1,
    "unit_type": {
        "name": "کیلو‌گرم",
        "value": 6305,
        "description": null
    },
    "discount": null
}