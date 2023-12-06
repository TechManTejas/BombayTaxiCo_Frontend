export interface City {
    _id: string;
    name: string;
    status: string;
}

export interface CityFormValues {
    name: string;
    status: 'Active' | 'Inactive';
}

