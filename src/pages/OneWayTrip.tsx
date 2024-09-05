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
                    {'>'} One Way Car Rental Services
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
                                One Way Car Rental Services
                            </div>
                            <div className="space-y-3 text-gray-700">
                                <div>
                                    Traveling one way, but worried about the return journey fare that cab operators make your shell out needlessly? Now stop worrying about return fares as we at Bombay Taxi Company have exclusive one-way taxi fares for you. Our one-way taxi booking service lets you enjoy all the conveniences of our signature car rental services.
                                </div>
                                <div>
                                    Enjoy the best value for your money with our one-way taxi booking services. Added to this, you can assure yourself a stress-free car rental booking because we are available to take your calls 24×7. Our professional staff and experienced and well-mannered chauffeurs will leave you with pleasant experiences throughout the taxi hiring process right from the point of enquiry till the point you arrive safely at your destination.
                                </div>
                                <div>
                                    Our one-way taxi rental services are tailor-made to suit your individual needs. Whether booking a one-way cab for business or vacation, Bombay Taxi Company has a wide range of economy, spacious, large vehicles to meet every car rental need. Our fleet gives you a wide range of options from hatchbacks and sedans to Multi utility vehicles, sport utility vehicles and luxury cars. Choose any vehicle from our multi-brand fleet featuring a variety of options from Maruti Suzuki, Hyundai, Toyota, Mahindra to Tata, wagon r, celerio, dzire, xcent, etios, ertiga, crysta, tempo traveller, winger and more.
                                </div>
                                <div>
                                    Bombay Taxi Company also offers car reservations exclusively for airport and rail transfers in all major cities across India. Our services include self-drive and chauffeur-drive cars.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const OneWayTrip = () => {
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
