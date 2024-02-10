import React from 'react';
import { Tag } from 'antd';
import Car from "../assets/images/car.png"

export interface Feature {
    icon?: React.ReactNode;
    feature: string;
}

interface CarCardProps {
    category: string;
    description: string;
    features: Feature[];
    originalPrice: string;
    discountedPrice: string;
    discount: string;
    preview?: boolean;
    carImage?: string;
    onBook?: () => void;
}

const CarCard: React.FC<CarCardProps> = ({
    category,
    description,
    features,
    originalPrice,
    discountedPrice,
    discount,
    preview,
    carImage,
    onBook
}) => {

    return (
        <div className='my-1 bg-white' onClick={() => {
            if (window.innerWidth < 1024) {
                if (onBook) {
                    onBook()
                }
            }
        }}>
            <div
                className='border w-full flex rounded-lg  gap-2
                flex-row
                p-1
                lg:p-4
            '>
                <div
                    className=' bg-white rounded-lg flex justify-center items-center
                    h-16 lg:h-40
                    w-20 lg:w-40
                '>
                    <img src={carImage || Car} className='object-fit
                    h-16 lg:h-32
                    w-20 lg:w-40
                    '/>
                </div>
                <div
                    className='flex justify-between
                    flex-row
                '>
                    <div className='space-y-3'>
                        <div className='
                            
                        '>
                            <div className='font-semibold
                                text-base
                                lg:text-2xl 
                            '>
                                {category}
                            </div>
                            <div className='
                                text-sm
                                lg:text-base
                            '>
                                {description}
                            </div>
                        </div>
                        {
                            features &&
                            <div className='space-y-1'>
                                <div className='text-sm font-medium
                                hidden
                                lg:block
                            '>FEATURES</div>
                                <div className='flex-wrap
                                hidden
                                lg:flex
                                lg:w-80
                            '>
                                    {features.map((feature, index) => (
                                        <div key={index}>
                                            <Tag className='flex items-center gap-1'>
                                                {feature?.icon}
                                                <div className=''>{feature.feature}</div>
                                            </Tag>
                                        </div>
                                    ))}
                                </div>
                                <div className='flex-wrap
                                flex w-44
                                lg:hidden
                                lg:w-80
                            '>
                                    {features.map((feature, index) => (
                                        <div key={index} className='flex items-center'>
                                            <div>•</div><div className='text-xs'>{feature.feature}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                    <div className='m-3'></div>
                    <div className='flex flex-col items-end space-y-3'>
                        <div className='text-end my-1'>
                            <div className='font-bold text-yellow-500
                                text-sm
                                lg:text-base
                            '>
                                {discount}% OFF
                            </div>
                            <div className='space-x-3'>
                                <span
                                    className='font-semibold
                                        text-sm
                                        lg:text-base
                                    '
                                    style={{ textDecoration: 'line-through', textDecorationColor: '#EAB308' }}
                                >
                                    ₹ {originalPrice?.toLocaleString()}
                                </span>
                                <span className='font-bold
                                    text-lg
                                    lg:text-2xl
                                '>
                                    ₹ {discountedPrice?.toLocaleString()}
                                </span>
                            </div>
                            {
                                !preview ?
                                    <div className='font-light text-zinc-500
                                        text-xs
                                        lg:text-xl
                                    '>
                                        Inclusive Of Toll & Sate Tax
                                    </div>
                                    :
                                    <div className='lg:w-60'></div>
                            }
                        </div>
                        {!preview &&
                            <div className='shadow-lg
                                hidden
                                lg:block
                            '>
                                <button className='bg-yellow-500 hover:bg-yellow-400 p-3 rounded-lg w-[180px] h-full flex justify-center items-center text-lg font-medium' onClick={onBook}>
                                    BOOK NOW
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
