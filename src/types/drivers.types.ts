export interface Driver {
    _id: string;
    name: string;
    mobile_no: string;
    email_id: string;
    address: string;
    driving_license: string;
    driver_status: string;
}

export interface DriverFormValues {
    name: string;
    mobile_no: string;
    email_id: string;
    address: string;
    driving_license: string;
    driver_status: 'Available' | 'Unavailable' | 'Assigned' | 'On a Trip';
}
