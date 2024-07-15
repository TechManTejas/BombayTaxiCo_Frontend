export interface ICity {
    _id: string;
    name: string;
    status: string;
}

export interface ICityFormValues {
    name: string;
    status: 'Active' | 'Inactive';
}

