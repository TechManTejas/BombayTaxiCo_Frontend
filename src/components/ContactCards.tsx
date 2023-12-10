import React from 'react'

export const ContactCards: React.FC = () => {
    return (
        <>
            <div className='p-4 rounded-3xl bg-white m-8 w-[272px] h-[232px]'>
                <div className='p-3 border-t-[3px] border-r-[3px] rounded-r-3xl border-yellow-500'>
                    <div className='flex flex-col justify-center items-center space-y-3'>
                        <div className='absolute -mt-48 w-[236px] h-[10px]' style={{
                            borderTop: "3px solid",
                            borderImage: "linear-gradient(to right, #fff 70%, transparent 30%) 100% 0"
                        }} />
                        <div className='h-20 w-20 bg-yellow-500 rounded-full'></div>
                        <div className='font-black text-2xl'>Office Address</div>
                        <div className='font-medium '>25/B Milford, New York, USA</div>
                    </div>
                </div>
            </div >
        </>
    )
}
