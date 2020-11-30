import { FilterTypeEnum } from '../enums/filter-type.enum';

export interface FilterConfig {
    type: FilterTypeEnum;
    name: string;
    min: number;
    max: number;
    values: number[];
}

export interface Filter {
    priceRange: number;
    selectedRooms: number[];
}
