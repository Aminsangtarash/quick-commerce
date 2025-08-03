import { Picture } from "./picture";

export interface User {
    id: number;
    hash_id: string;
    username: string | null;
    name: string;
    avatar: Picture,
    "marked_type": null,
    "user_follower_count": 258,
    "user_following_count": 1,
    "gender": {
        "name": "مرد",
        "value": 3265,
        "description": null
    },
    "bio": "سلام و عرض ادب\n🚧🛑 توجه\nوزن محصولات حدودی است و امکان مقداری اختلاف وزن با چیزی که در غرفه ثبت شده است وجود دارد.",
    "city": {
        "name": "قم",
        "value": 2531,
        "province": {
            "name": "قم",
            "value": 21,
            "description": null
        }
    },
    "created_at": "2025-01-07T10:47:31+03:30",
    "last_activity": "2025-08-03T14:22:46+03:30",
    "referral_journey_enum": null,
    "is_banned_in_social": false,
    "ban_user": {},
    "vendor": null
}