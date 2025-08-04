import { Picture } from "./picture";

interface Gender {
    name: string;
    value: number;
    description?: string | null;
}

interface Province {
    name: string;
    value: number;
    description?: string | null;
}

interface City {
    name: string;
    value: number;
    province: Province;
}
export interface User {
    id: number;
    hash_id: string;
    username: string | null;
    name: string;
    avatar: Picture;
    marked_type: number | null;
    user_follower_count: number;
    user_following_count: number;
    gender: Gender;
    bio: string;
    city: City;
    created_at: string;
    last_activity: string;
    referral_journey_enum: string | null;
    is_banned_in_social: boolean;
    ban_user: object;
    vendor: any | null;
}