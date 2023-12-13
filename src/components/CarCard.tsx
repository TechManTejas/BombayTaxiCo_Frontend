import React from 'react';
import { Tag } from 'antd';

export interface Feature {
    icon: React.ReactNode;
    text: string;
}

interface CarCardProps {
    category: string;
    description: string;
    features: Feature[];
    originalPrice: string;
    discountedPrice: string;
    discount: string;
}

const CarCard: React.FC<CarCardProps> = ({
    category,
    description,
    features,
    originalPrice,
    discountedPrice,
    discount
}) => {
    return (
        <div className='m-3 bg-white'>
            <div
                className='border w-full flex rounded-lg p-4 gap-2
                flex-col
                lg:flex-row
            '>
                <div
                    className=' bg-gray-300 rounded-lg
                    h-40
                    md:h-60
                    lg:h-40
                    lg:w-40
                '
                />
                <div
                    className='flex justify-between
                    flex-col
                    md:flex-row
                '
                >
                    <div className='space-y-3'>
                        <div>
                            <div className='text-2xl font-semibold'>{category}</div>
                            <div>{description}</div>
                        </div>
                        <div className='space-y-1'>
                            <div className='text-sm font-medium'>FEATURES</div>
                            <div
                                className='flex flex-wrap
                                w-80
                            '
                            >
                                {features.map((feature, index) => (
                                    <div key={index}>
                                        <Tag className='flex items-center gap-1'>
                                            {feature.icon}
                                            <div>{feature.text}</div>
                                        </Tag>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='m-3'></div>
                    <div className='flex flex-col  items-end space-y-3'>
                        <div className='text-end my-1'>
                            <div className='font-bold text-yellow-500'>{discount}% OFF</div>
                            <div className='space-x-3'>
                                <span
                                    className='font-semibold'
                                    style={{ textDecoration: 'line-through', textDecorationColor: '#EAB308' }}
                                >
                                    ₹{originalPrice}
                                </span>
                                <span className='text-2xl font-bold'>₹{discountedPrice}</span>
                            </div>
                            <div className='text-xl font-light'>Inclusive Of Toll & Sate Tax</div>
                        </div>
                        <div className='shadow-xl'>
                            <button className='bg-yellow-500 hover:bg-yellow-400 p-3 rounded-lg w-[180px] h-full flex justify-center items-center text-lg font-medium'>
                                BOOK NOW
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
