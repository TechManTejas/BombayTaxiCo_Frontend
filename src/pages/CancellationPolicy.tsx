import { useNavigate } from "react-router-dom"
import { Footer } from "../components/Footer"

const BreadCrumb: React.FC = () => {

    const navigate = useNavigate()

    return (
        <>
            <div className='text-gray-700 container py-6 flex space-x-1'>
                <button className='hover:text-yellow-[#FDB813] hover:underline' onClick={() => {
                    navigate("/")
                }}>
                    Home
                </button>
                <div>
                    {'>'} Cancellation Policy
                </div>
            </div>
        </>
    )
}

const Content: React.FC = () => {
    return (
        <>
            <div className='pb-20 flex justify-center w-full'>
                <div className='flex flex-col justify-center items-center container
                    xl:flex-row
                '>
                    <div className='space-y-6 
                        w-full
                        xl:w-1/2
                    '>
                        <div className="space-y-3">
                            <div className='text-3xl font-medium'>
                            Cancellation and Refund Policy
                            </div>
                            <div className='text-gray-700'>
                                <ul className="">
                                    <li>
                                    • You may cancel or change your booking any time by using online link/ phone/email up-to 24 hours prior to pick up date and time.    You may cancel or change your booking any time by using online link/ phone/email up-to 24 hours prior to pick up date and time.
                                    </li>
                                    <li>
                                    •   In event of cancellation within 24 hours of pick-up time Rs. 250 will be charged for Small Cab Rs. 500 for Family Cab & Tempo Traveller and rest will be refunded.
                                    </li>
                                    <li>
                                    •   The refund will be processed within 5 to 7 working days and will be transferred to the customerxe2x80x99s bank account only after receiving all required information in order to process the refund. No cash refund requests are entertained.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const CancellationPolicy = () => {
    return (
        <div>
            <div className='
                px-4
                sm:px-8
                md:px-16
                lg:px-20
                xl:px-28
                2xl:px-32
            '>
                <BreadCrumb />
                <Content />
            </div>
            <Footer />
        </div>
    )
}
