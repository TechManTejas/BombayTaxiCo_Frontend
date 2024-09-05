import React from 'react';
import Car from "../assets/images/car.png"
import AirConditioning from '../icons/Air Conditioning.svg'
import AutomaticTransmission from "../icons/Automatic Transmission.svg"
import Bags from "../icons/Bags.svg"
import CabBootSpace from "../icons/Cab Boot space.svg"
import CNG from "../icons/CNG.svg"
import ComfortSeat from "../icons/Comfort Seat.svg"
import Disel from "../icons/Disel.svg"
import Passanger from "../icons/Passanger.svg"
import RoofTopCarrier from "../icons/Roof Top Carrier.svg"
import StandardSeat from "../icons/Standard Seat.svg"

const featureIconMap = {
    'Air Conditioning': AirConditioning,
    'Automatic Transmission': AutomaticTransmission,
    'Bags': Bags,
    'Cab Boot Space': CabBootSpace,
    'CNG': CNG,
    'Comfort Seat': ComfortSeat,
    'Diesel': Disel,
    'Passenger': Passanger,
    'Roof Top Carrier': RoofTopCarrier,
    'Standard Seat': StandardSeat,
};

export interface Feature {
    icon?: string;
    feature: string;
}

interface DetailsCarCardProps {
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

const DetailsCarCard: React.FC<DetailsCarCardProps> = ({
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
        <div className='bg-white' onClick={() => {
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
                    className='flex-shrink-0 bg-white rounded-lg flex justify-center items-center
                    h-16 lg:h-40
                    w-20 lg:w-40
                '>
                    {
                        carImage !== 'undefined' ?
                            <img src={import.meta.env.VITE_BASE_URL + '/' + carImage || Car} className='object-fit
                                h-16 lg:h-32
                                w-20 lg:w-40
                            '/>
                            :
                            <img src={Car} className='object-fit
                                h-16 lg:h-32
                                w-20 lg:w-40
                            '/>
                    }
                </div>
                <div
                    className='flex justify-between  w-full
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
                            '>AMENITIES</div>
                                <div className='flex-wrap
                                
                                lg:flex
                                lg:w-80
                            '>
                                    {features.map((feature, index) => (
                                        <div className='text-xs rounded p-1.5 px-3 m-1 bg-zinc-100 text-zinc-700' key={index}>
                                           <div className='flex items-center gap-1'>
                                            {feature.icon && featureIconMap[feature.icon] ? (
                                                <img src={featureIconMap[feature.icon]} className='w-4 h-4'/>
                                                ) : null}
                                            {feature.feature && 
                                                <span className='pl-1 font-bold'>
                                                    {feature.feature}
                                                </span>
                                            }
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* <div className='flex-wrap
                                flex w-44
                                lg:hidden
                                lg:w-80
                            '>
                                    {features.map((feature, index) => (
                                        <div key={index} className='flex items-center'>
                                            <div>•</div><div className='text-xs'>{feature.feature}</div>
                                        </div>
                                    ))}
                                </div> */}
                            </div>
                        }
                    </div>
                    <div className='m-3'></div>
                    <div className='flex-shrink-0 flex flex-col items-end space-y-3'>
                        <div className='text-end my-1'>
                            {parseInt(discount) > 0 &&
                                <div className='font-bold text-[#FDB813]
                                text-sm
                                lg:text-base
                                '>
                                    {discount}% OFF
                                </div>
                            }
                            <div className='space-x-3'>
                                {parseInt(discount) > 0 &&
                                    <span
                                        className='font-semibold
                                text-sm
                                lg:text-base
                                '
                                        style={{ textDecoration: 'line-through', textDecorationColor: '#EAB308' }}
                                    >
                                        ₹ {originalPrice?.toLocaleString()}
                                    </span>
                                }
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
                                <button className='bg-[#FDB813] hover:bg-yellow-400 p-3 rounded-lg w-[180px] h-full flex justify-center items-center text-lg font-medium' onClick={onBook}>
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

export default DetailsCarCard;
