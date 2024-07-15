import React, { useEffect, useState } from 'react';
import { Button, Form, InputNumber, Select, Space, Switch, Table, message } from 'antd';
import axios from "../../api/axios"
import { useLocation } from 'react-router-dom';
import { IRoute, IRouteFormValues } from '../../types/routes.types';
import { ICity } from '../../types/citys.types';
import { ITaxiType } from '../../types/taxiTypes.types';
import { ITaxiTypePrice } from '../../types/price.types';


const RoutesAddEdit: React.FC = () => {
    const { state } = useLocation()

    const [cities, setCities] = useState([]);
    const [taxiTypes, setTaxiTypes] = useState<ITaxiType[]>([]);
    const [oneWayTripKm, setOneWayTripKm] = useState<number>(0);
    const [roundTripKm, setRoundTripKm] = useState<number>(0);

    const goBack = () => {
        window.history.back();
    };

    const [form] = Form.useForm();
    const routeToEdit: IRoute = state?.route;

    // Extract id from editedCoupon or set it to undefined
    const id = routeToEdit?._id || undefined;
    // Set initial values for the form
    const initialValues: IRouteFormValues = {
        from_id: '',
        to_id: '',
        one_way_trip_km: 0,
        round_trip_km: 0,
        route_status: 'Active'
    };

    useEffect(() => {
        // Fetch cities from the API
        const fetchCities = async () => {
            try {
                const response = await axios.get('/citys');
                setCities(response.data.citys);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        // Fetch taxi types from the API
        const fetchTaxiTypes = async () => {
            try {
                const response = await axios.get('/taxitypes');
                setTaxiTypes(response.data.taxitypes);
            } catch (error) {
                console.error('Error fetching taxi types:', error);
            }
        };

        const fetchTaxiTypePrices = async () => {
            try {

                const taxiTypes = await axios.get('/taxitypes')
                const response = await axios.get(`/prices/`, {
                    params: {
                        filter: JSON.stringify({ route_id: id })
                    }
                });

                const fetchedTaxiTypePrices = response.data.taxitypeprices;

                const updatedTaxiTypes = taxiTypes.data.taxitypes.map((taxiType: ITaxiType) => {
                    const matchedPrice = fetchedTaxiTypePrices.find((taxiTypePrice: ITaxiTypePrice) => taxiTypePrice.taxi_type_id.toString() === taxiType._id);

                    if (matchedPrice) {
                        return {
                            ...taxiType,
                            price_km: matchedPrice.price_km,
                            extra_km_charges: matchedPrice.extra_km_charges,
                            status: matchedPrice.status,
                            taxiTypePriceId: matchedPrice._id
                        };
                    }
                    return taxiType;
                });

                setTaxiTypes(updatedTaxiTypes);

            } catch (error) {
                console.error('Error fetching taxi type prices:', error);
            }
        };

        fetchCities();
        fetchTaxiTypes()
        if(id){
            fetchTaxiTypePrices();
        }
    }, []);

    useEffect(() => {
        // If editedCoupon prop exists, set form fields with its details
        if (routeToEdit) {
            console.log(routeToEdit)
            // Set form fields
            form.setFieldsValue({
                ...routeToEdit,
                from_id: routeToEdit.from_id._id,
                to_id: routeToEdit.to_id._id,
            });
            setOneWayTripKm(routeToEdit.one_way_trip_km);
            setRoundTripKm(routeToEdit.round_trip_km);

        } else {
            // Set initial values for new coupons
            form.setFieldsValue(initialValues);
        }
    }, [routeToEdit, form]);


    const handleOneWayTripChange = (value: React.ReactText | null) => {
        if (typeof value === 'number') {
            setOneWayTripKm(value);
        }
    };
    
    const handleRoundTripChange = (value: React.ReactText | null) => {
        if (typeof value === 'number') {
            setRoundTripKm(value);
        }
    };

    const handlePriceKmChange = (value: number | null, record: ITaxiType) => {
        const updatedTaxiTypes = [...taxiTypes];
        const taxiTypeToUpdate = updatedTaxiTypes.find(taxiType => taxiType._id === record._id);
        
        if (taxiTypeToUpdate) {
            Object.assign(taxiTypeToUpdate, {
                price_km: value as number
            });
        }

        setTaxiTypes(updatedTaxiTypes);
    };

    const handleExtraKmChargesChange = (value: number | null, record: ITaxiType) => {
        const updatedTaxiTypes = [...taxiTypes];
        const taxiTypeToUpdate = updatedTaxiTypes.find(taxiType => taxiType._id === record._id);
        
        if (taxiTypeToUpdate) {
            Object.assign(taxiTypeToUpdate, {
                extra_km_charges: value as number
            });
        }

        setTaxiTypes(updatedTaxiTypes);
    };

    const handleStatusChange = (checked: boolean, record: ITaxiType) => {
        const updatedTaxiTypes = [...taxiTypes];
        const taxiTypeToUpdate = updatedTaxiTypes.find(taxiType => taxiType._id === record._id);
        
        if (taxiTypeToUpdate) {
            Object.assign(taxiTypeToUpdate, {
                status: checked as boolean
            });
        }

        setTaxiTypes(updatedTaxiTypes);
    };

    const onFinish = async (values: IRouteFormValues) => {
        let rollbackNeeded = false;
        let rollbackError: any;
    
        try {
            values.route_status = values.route_status ? 'Active' : 'Inactive';
    
            let routeResponse;
            if (id) {
                routeResponse = await axios.put(`/routes/${id}`, values);
                message.success('Route Updated successfully!');
            } else {
                routeResponse = await axios.post('/routes', values);
                message.success('Route Added successfully!');
            }
    
            const routeId = routeResponse.data._id;
            const createdTaxiTypePrices: ITaxiTypePrice[] = [];
    
            for (const taxiType of taxiTypes) {
                try {
                    const taxiTypePriceToUpdateOrCreate = {
                        route_id: routeId,
                        taxi_type_id: taxiType._id,
                        price_km: taxiType.price_km || 0,
                        extra_km_charges: taxiType.extra_km_charges || 0,
                        status: taxiType.status || false,
                    };

                    let taxiTypePriceResponse;
                    if (taxiType.taxiTypePriceId) {
                        taxiTypePriceResponse = await axios.put(`/prices/${taxiType.taxiTypePriceId}`, taxiTypePriceToUpdateOrCreate);
                    } else {
                        taxiTypePriceResponse = await axios.post('/prices', taxiTypePriceToUpdateOrCreate);
                    }
                    createdTaxiTypePrices.push(taxiTypePriceResponse.data);
                } catch (error) {
                    console.error('Error creating/updating TaxiTypePrice:', error);
                    rollbackNeeded = true;
                    rollbackError = error;
                    break;
                }
            }
    
            if (rollbackNeeded) {
                if (routeResponse && routeResponse.data._id) {
                    message.error('Route creation/update failed. Changes reverted.');
                }
            } else {
                message.success('Route and TaxiTypePrices created/updated successfully!');
                goBack();
            }
    
        } catch (error) {
            console.error('Error:', error);
            message.error('Error adding/updating route');
        }
    };

    const columns = [
        {
            title: 'Taxi Type',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price (per KM)',
            dataIndex: 'price_km',
            key: 'price_km',
            render: (text: any, record: ITaxiType) => {
                const taxiTypeObj: ITaxiType | null = taxiTypes.find(taxiType => taxiType._id === record._id) || null;
                return (
                    <InputNumber
                        value={taxiTypeObj?.price_km}
                        onChange={(value) => handlePriceKmChange(value, record)}
                        style={{ width: 120 }}
                    />
                );
            }
        },
        {
            title: 'Extra KM Charges',
            dataIndex: 'extra_km_charges',
            key: 'extra_km_charges',
            render: (text: any, record: ITaxiType) => {
                const taxiTypeObj: ITaxiType | null = taxiTypes.find(taxiType => taxiType._id === record._id) || null;
                return (
                    <InputNumber
                        value={taxiTypeObj?.extra_km_charges}
                        onChange={(value) => handleExtraKmChargesChange(value, record)}
                        style={{ width: 120 }}
                    />
                );
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: boolean, record: ITaxiType) => {
                const taxiTypeObj: ITaxiType | null = taxiTypes.find(taxiType => taxiType._id === record._id) || null;
                return (
                    <Switch
                        checked={taxiTypeObj?.status}
                        onChange={(checked) => handleStatusChange(checked, record)}
                        checkedChildren="Active"
                        unCheckedChildren="Inactive"
                    />
                );
            }
        },
        {
            title: 'ONE WAY PRICE',
            key: 'oneWayPrice',
            render: (record: ITaxiType) => {
                const taxiType: ITaxiType | undefined = taxiTypes.find(taxiType => taxiType._id === record._id);
                return `₹${((taxiType?.price_km || 0) * oneWayTripKm).toLocaleString()}`;
            },
        },
        {
            title: 'ROUND TRIP PRICE',
            key: 'roundTripPrice',
            render: (record: ITaxiType) => {
                const taxiType: ITaxiType | undefined = taxiTypes.find(taxiType => taxiType._id === record._id);
                return `₹${((taxiType?.price_km || 0) * roundTripKm).toLocaleString()}`;
            },
        }
    ];

    return (
        <div className='px-10 py-6'>
            <div className='text-2xl font-light'>
                {id ? 'EDIT ROUTE' : 'ADD NEW ROUTE'}
            </div>
            <div className='flex'>
                <Form form={form} onFinish={onFinish} layout="vertical" className="max-w-md mx-auto mt-8">

                    <Form.Item name="from_id" label="From" rules={[{ required: true, message: 'Please select the from city' }]}>
                        {/* Use Select component to choose from cities */}
                        <Select>
                            {/* Map through the cities to populate the options */}
                            {cities.map((city: ICity) => (
                                <Select.Option key={city._id} value={city._id}>
                                    {city.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="to_id" label="To" rules={[{ required: true, message: 'Please select the to city' }]}>
                        {/* Use Select component to choose to cities */}
                        <Select>
                            {/* Map through the cities to populate the options */}
                            {cities.map((city: ICity) => (
                                <Select.Option key={city._id} value={city._id}>
                                    {city.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Space>
                        <Form.Item name="one_way_trip_km" label="One Way Trip Distance (in km)" rules={[{ required: true, message: 'Please enter the one-way trip distance' }]}>
                            {/* Use InputNumber for numeric input */}
                            <InputNumber className="w-full" onChange={handleOneWayTripChange} />
                        </Form.Item>

                        <Form.Item name="round_trip_km" label="Round Trip Distance (in km)" rules={[{ required: true, message: 'Please enter the round trip distance' }]}>
                            {/* Use InputNumber for numeric input */}
                            <InputNumber className="w-full" onChange={handleRoundTripChange} />
                        </Form.Item>
                    </Space>

                    <Form.Item name="route_status" label="Status" rules={[{ required: true, message: 'Please select the status' }]}>
                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" className='bg-yellow-800' defaultChecked={routeToEdit?.route_status === "Active" || true} />
                    </Form.Item>

                    <Form.Item>
                        <Space className='space-x-4'>
                            <Button htmlType="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-28 h-10">
                                {id ? 'SAVE' : 'ADD'}
                            </Button>
                            <Button className="font-semibold w-28 h-10" onClick={goBack}>
                                CANCEL
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
                <div className='m-12'>
                    <div className='font-light mb-4 text-gray-400 text-center'>PRICING PER CATEGORY</div>
                    <Table
                        className='border'
                        dataSource={taxiTypes}
                        columns={columns}
                        pagination={false}
                        />
                </div>
            </div>
        </div>
    )
};

export default RoutesAddEdit;