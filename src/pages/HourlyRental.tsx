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
                    {'>'} Hourly Rental
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
                                Hourly Rental Cab Services
                            </div>
                            <div className="space-y-3 text-gray-700">
                                <div>
                                    is committed to making your city trips more enjoyable and reliable while ensuring value for the money you spend on car hire. What's more, you can trust us for stress-free car rental bookings because we are available to take your calls 24x7.
                                </div>
                                <div>
                                    Our city taxi booking services are tailored-made to your individual needs. Whether it's booking a cab for important business meetings, visiting friends or relatives, visiting a doctor, shopping or sightseeing, has economy hatchbacks, sedans, spacious sedans, large multi utility vehicles, spacious multi utility vehicles and buses to meet every car rental need. Choose a cab from our fleet of Maruti Suzuki Wagon R, Celerio, Dzire, Hyundai Xcent, Etios, Ertiga, Crysta, Force Tempo Traveller, Tata Winger and more.
                                </div>
                                <div>
                                    Only offers cab reservations for airports and train transfers to all major cities in India. Our services include only driver-driven vehicles.
                                </div>
                                <div className="font-medium text-xl">
                                    Largest Fleets
                                </div>
                                <div>
                                    We offer a wide range of vehicles including hatchbacks, sedans, multi utility vehicles and coach buses.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const HourlyRental = () => {
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
