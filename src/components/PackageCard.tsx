import React from 'react'

interface PackageCardProps {
    imageUrl: string;
    title: string;
    destinations: { name: string; distance: string }[];
}

export const PackageCard: React.FC<PackageCardProps> = ({ imageUrl, title, destinations }) => {
    return (
        <div className='m-4 w-[330px] h-[416px] border rounded-xl bg-white shadow hover:shadow-xl transition-all'>
            <div className='h-52 bg-[#FDB813] rounded-t-lg' style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' }} />
            <div className='h-52 p-4 space-y-1'>
                <div className='text-xl font-medium'>{title}</div>
                <div className='text-lg font-light'>
                    {destinations.map((destination, index) => (
                        <div key={index} className='w-full flex justify-between'>
                            <div>{destination.name}</div>
                            <div>{destination.distance}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
