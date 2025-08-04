

interface Parent {
    id: number;
    title: string;
    placeholder: string | null;
    parent: Parent;
    unit_type_id: UnitTypeIid
}

interface UnitTypeIid {
    name: string;
    value: number;
    description: string | null;
}

export interface Category {
    id: number;
    title: string;
    placeholder: null;
    parent: Parent,
    unit_type_id: UnitTypeIid
}