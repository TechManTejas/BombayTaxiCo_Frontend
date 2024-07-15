import React, { useEffect, useState } from 'react';
import { Button, Table, Tag, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import axios from "../../api/axios"
import Search from 'antd/es/input/Search';
import { confirmation } from '../components/Confirmation';
import { useNavigate } from 'react-router-dom';
import { ICarFeature, ITaxiType } from '../../types/taxiTypes.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faGasPump, faSnowflake, faUsers, faTachometerAlt, faCar, faLeaf, faWrench, faSuitcase, faBoxes } from '@fortawesome/free-solid-svg-icons';

type FeatureIconMap = {
    [key: string]: IconDefinition;
};

const featureIconMap: FeatureIconMap = {
    'CNG': faGasPump,
    'MANUAL': faWrench,
    'AC': faSnowflake,
    'PASSENGERS': faUsers,
    'BAGS': faSuitcase,
    'CARRIER': faBoxes,
    'DIESEL': faTachometerAlt,
    'BOOT SPACE': faCar,
    'PETROL & HYBRID': faLeaf,
    'AUTOMATIC': faTachometerAlt,
};


const TaxiTypes: React.FC = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(false);
    const [taxiTypes, setTaxiTypes] = useState<ITaxiType[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [totalTaxiTypes, setTotalTaxiTypes] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    interface DataType {
        _id: string;
        name?: string;
        description?: string;
        price_km?: number;
        price_hour?: number;
        discount_percentage?: number;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'TYPE',
            dataIndex: 'name',
            key: 'name',
            width: 100
        },
        {
            title: 'DESCRIPTION',
            dataIndex: 'description',
            key: 'description',
            width: 150
        },
        {
            title: 'PRICE PER KM',
            dataIndex: 'price_km',
            key: 'price_km',
            width: 50
        },
        {
            title: 'PRICE PER HOUR',
            dataIndex: 'price_hour',
            key: 'price_hour',
            width: 50
        },
        {
            title: 'DISCOUNT PERCENTAGE',
            dataIndex: 'discount_percentage',
            key: 'discount_percentage',
            width: 50,
            render: (discountPercentage: number) => (
                <div>{discountPercentage ? `${discountPercentage}%` : 'N/A'}</div>
            ),
        },
        {
            title: 'CAR FEATURES',
            dataIndex: 'car_features',
            key: 'car_features',
            render: (carFeatures: ICarFeature[]) => (
                <>
                    {carFeatures.map((feature, index) => (
                        <Tag key={index}>
                            {feature.icon && featureIconMap[feature.icon] ? (
                                <FontAwesomeIcon icon={featureIconMap[feature.icon]} />
                            ) : null}
                            {feature.feature && 
                                <span className='pl-1'>
                                    {feature.feature}
                                </span>
                            }
                        </Tag>
                    ))}
                </>
            ),
            width: 200,
        },

        {
            title: 'ACTIONS',
            dataIndex: 'actions',
            key: 'actions',
            fixed: 'right',
            width: 100,
            render: (_, taxiType) => (
                <div className='text-amber-500 font-bold flex flex-wrap space-x-1'>
                    <a onClick={() => {
                        const taxiTypeToEdit = taxiTypes.find((t) => t._id === taxiType._id)
                        console.log(taxiTypeToEdit)
                        navigate('/admin/taxitypes/add-edit', { state: { taxiType: taxiTypeToEdit } })
                    }}>EDIT</a>
                    <div>|</div>
                    <a onClick={() => handleDeleteConfirmation(taxiType._id)}>DELETE</a>
                </div>
            ),
        },
    ];

    const fetchData = async (page: number = 1) => {
        try {
            setLoading(true);

            const response = await axios.get('/taxitypes', {
                params: {
                    page: page,
                    pageSize: 10,
                    filter: undefined,
                    search: searchQuery,
                },
            });
            console.log(response.data)

            setTaxiTypes(response.data.taxitypes);
            setTotalTaxiTypes(response.data.total);
            setCurrentPage(page)

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [searchQuery]);

    const handlePageChange = (page: number) => {
        fetchData(page);
    };

    const handleDeleteCity = async (taxiTypeId: string) => {
        try {
            // Make axios call to delete the coupon
            await axios.delete(`/taxitypes/${taxiTypeId}`);
            // Update the list after successful deletion
            setTaxiTypes((prevTaxiTypes) => prevTaxiTypes.filter((taxiType) => taxiType._id !== taxiTypeId));
            // Fetch data for the current page to reflect the deletion
            // fetchData(currentPage); 
            console.log(currentPage)

            // Show a success message to the user
            message.success('Taxi Type deleted successfully!');
        } catch (error) {
            console.error('Error deleting taxi types:', error);
            // Handle error (e.g., show an error message to the user)
            message.error('Error deleting taxi type. Please try again.');
        }
    };

    const handleDeleteConfirmation = async (taxiTypeId: string) => {
        const shouldDelete = await confirmation("Are you sure you want to delete this Taxi type?");
        if (shouldDelete) {
            // User confirmed the deletion, call the delete function
            handleDeleteCity(taxiTypeId);
        }
    };

    const mapDataToTableFormat = (data: ITaxiType[]): Array<{
        _id: string;
        name: string;
        description: string;
        price_km: number;
        price_hour: number;
        car_features: ICarFeature[];
        discount_percentage: number;
    }> => {
        return data.map(taxiType => ({
            _id: taxiType?._id,
            name: taxiType?.name,
            description: taxiType?.description,
            price_km: taxiType?.price_km,
            price_hour: taxiType?.price_hour,
            car_features: taxiType?.car_features || [],
            discount_percentage: taxiType?.discount_percentage
        }));
    };

    const formattedData = mapDataToTableFormat(taxiTypes);

    return (
        <div className='px-10 py-6'>
            <div className=''>
                <div className='flex justify-between items-center w-full gap-x-4'>
                    <div className='text-2xl font-light'>
                        TAXI TYPES
                    </div>
                    <div className='flex space-x-3'>
                        <Search
                            size={'large'}
                            placeholder="Search..."
                            onChange={(e) => setSearchQuery(e.target.value)}
                        // onSearch={fetchData} // Trigger fetchData on search
                        />
                        <div>
                            <Button icon={<PlusOutlined />} size={'large'} className='bg-yellow-500 font-bold text-md' onClick={() => {
                                navigate('/admin/taxitypes/add-edit')
                            }}>
                                ADD NEW
                            </Button>
                        </div>
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={formattedData}
                    pagination={{
                        position: ['bottomRight'],
                        pageSize: 10,
                        total: totalTaxiTypes,
                        onChange: handlePageChange,
                    }}
                    scroll={{
                        y: 600
                    }}
                    loading={loading}
                />
            </div>
        </div>
    )
};

export default TaxiTypes;