import React from 'react'

export const PackageCard: React.FC = () => {
    return (
        <div className='w-96 h-[416px] border rounded-xl m-6'>
            <div className='h-52 bg-yellow-500 rounded-t-lg'>

            </div>
            <div className='h-52 p-4 space-y-1'>
                <div className='text-xl font-medium'>Cabs From Agra To</div>
                <div className='text-lg font-light'>
                    <div className='w-full flex justify-between'>
                        <div>New Delhi</div>
                        <div>552km (6hr 53min)</div>
                    </div>
                    <div className='w-full flex justify-between'>
                        <div>Gurgoan</div>
                        <div>552km (6hr 53min)</div>
                    </div>
                    <div className='w-full flex justify-between'>
                        <div>Noida</div>
                        <div>552km (6hr 53min)</div>
                    </div>
                    <div className='w-full flex justify-between'>
                        <div>Faridabad</div>
                        <div>552km (6hr 53min)</div>
                    </div>
                    <div className='w-full flex justify-between'>
                        <div>Ghaziabad</div>
                        <div>552km (6hr 53min)</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
