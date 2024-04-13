import { useNavigate } from "react-router-dom"
import { Footer } from "../components/Footer"

const BreadCrumb: React.FC = () => {

    const navigate = useNavigate()

    return (
        <>
            <div className='text-gray-700 container py-6 flex space-x-1'>
                <button className='hover:text-yellow-500 hover:underline' onClick={() => {
                    navigate("/")
                }}>
                    Home
                </button>
                <div>
                    {'>'} FAQs
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
                                General
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                    1. What is Bombay Taxi Company?
                                </div>
                                <div className='text-gray-700'>
                                    Bombay Taxi Company Is the Experienced & Ready to Ride Premium Car Rental Services in India with Most Affordable & Competing Price. Bombay Taxi Company helps you book cabs online at much lower prices than local vendors. Also, you can use promo codes and offers on the Bombay Taxi Company website for online cab booking to get additional discounts.
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                    2. What are the benefits of InterCity Cab booking?
                                </div>
                                <div className='text-gray-700'>
                                    Bombay Taxi Company booking not only helps you with the best prices but also helps you with the convenience of paying through multiple payment options (like Debit Card, Credit Card, e-wallets, etc.). You can easily compare prices and choose various categories of cabs like Hatchback cars, Sedan and Muv.
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                    3. What kind of cabs you can book from Bombay Taxi Company?
                                </div>
                                <div className='text-gray-700'>
                                    From Bombay Taxi Company you can book the following types of cabs: Local Cab and Airport Transfer Cab, you can book outstation cabs for both one-way transfer and round-trip transfer.
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                    4. What are the vehicle types available in different Bombay Taxi Company categories?
                                </div>
                                <div className='text-gray-700'>
                                    These are the vehicle you can book in different Bombay Taxi Company categories:
                                    <ul>
                                        <li>
                                            •  Economy Hatchback : Wagon r, Celerio or similar
                                        </li>
                                        <li>
                                            •  Comfort Sedan : Dzire, Xcent or similar
                                        </li>
                                        <li>
                                            •  Spacious Sedan+ : Etios or similar
                                        </li>
                                        <li>
                                            •  Large MUV : Ertiga, Xylo or similar
                                        </li>
                                        <li>
                                            •  Spacious MUV+ : Crysta Specific model
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className='text-3xl font-medium'>
                                Booking
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                    1. How can I book a taxi on Bombay Taxi Company?
                                </div>
                                <div className='text-gray-700'>
                                    It's an easy 4 step process:
                                    <ul>
                                        <li>
                                            1. Open www.BombayTaxiCompany.in : Select Source and Destination City, Select Date of your planned Travel and Hit “Find Taxi Rates” Button On next page your will find rates of different cabs
                                        </li>
                                        <li>
                                            2. Select the one which meets your travel requirement
                                        </li>
                                        <li>
                                            3. Spacious Sedan+ : Etios or similar
                                        </li>
                                        <li>
                                            4. After selecting the taxi type - fill in your details
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                    2. Can I do the booking over phone?
                                </div>
                                <div className='text-gray-700'>
                                    If you make an online booking, which is fast, secure and gives instant confirmation on Email and SMS. However, you can call us for assistance in placing the booking online.
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                    3. How can I modify my booking?
                                </div>
                                <div className='text-gray-700'>
                                    You can modify a booking by sending an email to contact@bombaytaxicompany.in or calling us. You can change the pick-up date, time, location, passenger details or vehicle type. However, the confirmation of modification depends upon the availability of taxi on modified time and date.
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                    4. How do I cancel my booking?
                                </div>
                                <div className='text-gray-700'>
                                    You can email us at contact@bombaytaxicompany.in or call our customer care number +91 6262 744 744 for booking cancellation. You will need to provide you’re booking reference number and contact details for the same. Please read our cancellation and modification policy to know about cancellation rules and refund policies.
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                    5. When do I get the driver details?
                                </div>
                                <div className='text-gray-700'>
                                    The taxi and driver details will be sent to you 2 hours prior to the pick-up time.
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                    6. what if the driver is unreachable?
                                </div>
                                <div className='text-gray-700'>
                                    You would receive Driver and Taxi details at least 2 hours prior to your pickup time. We recommend to speak to driver as soon as you get his details. In case driver is not reachable or not answering your call, please contact our customer support.
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                    7. Can I do a last minute booking and still get an assured taxi?
                                </div>
                                <div className='text-gray-700'>
                                    You must make a booking at least 2 hours prior to the pick-up time in order to get a taxi. However, the actual confirmation is given based on the availability of the taxi at the required location and time. Also, for better assistance on your immediate requirement, you are requested to call our customer care.
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                    8. How many days in advance can I book a taxi?
                                </div>
                                <div className='text-gray-700'>
                                    We understand that many a travellers plan their trip way in advance and therefore we accept booking of a taxi as much as 180 days in advance
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className='text-3xl font-medium'>
                                Pricing
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                    1. How is the total fare/price calculated for an intercity car rental service?
                                </div>
                                <div className='text-gray-700'>
                                    Bombay Taxi Company rental fares constitute of various components as below:
                                    <div className="py-1">
                                        <span className="font-bold">Per KM Rate:</span> This is the base rate which will be charged on every km travelled. The rate varies with car model. Bombay Taxi Company does not charge customers for garage to garage distance unlike our competitors. With Bombay Taxi Company, you have to pay only for actual meter reading starting from 0 or as agreed at the time of booking. Minimum KM charged per day: There is a minimum distance which will be charged for every day of usage. In case the actual travelled distance is higher, the latter will be charged. Generally, the minimum distance charged per day is 250 km. Please consider the following example for clarity: If you are using a vehicle for 3 days, you will be charged for a minimum distance of 3x250=750 km. For an extra kms you pay on actual kms travelled.
                                    </div>
                                    <div className="py-1">
                                        <span className="font-bold">Night Charges:</span> For a TAXI used between 10 PM to 06 AM, you are required to pay ₹ 250/ as driver night charges per night. Some cities might also have separate day and night allowances. Toll, Parking and State taxes: These will be charged on actual at the end of the journey. You need to settle this in cash with the driver in return for the relevant receipts. Mostly, State Tax is paid on daily, monthly or quarterly basis by drivers on behalf of customers to the concerned Government department, in which case an actual or equivalent approximate fair amount will be charged. For one-way journey, you will need to pay toll tax for both sides of the journey. You can always call us at our helpline +91 6262 744 744 in case of any discrepancy. Driver allowances: For intercity travel customers need to pay driver allowances. The allowance amount might vary with operator. Some cities might also have separate day and night allowances. Definition of a day: Day is defined as 12 midnight to next day 12 midnight for all the calculation purposes.
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                2. Are there any cancellation charges?
                                </div>
                                <div className='text-gray-700'>
                                Please read our cancellation and modification policy to know about cancellation rules and refund policies.
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                3. Are the price/km same for one-way and return-trip booking?
                                </div>
                                <div className='text-gray-700'>
                                Bombay Taxi Company offer a fixed fare for a one-way trip, which is quite less than the market rate. And in case of a round trip the billing happens on per km basis.
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="text-xl">
                                4. What are the fares for booking of non-AC taxis?
                                </div>
                                <div className='text-gray-700'>
                                We only offer an AC taxi and you may find our rates lesser than a Non AC taxi.
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="text-xl">
                                5. Are there any additional charges?
                                </div>
                                <div className='text-gray-700'>
                                 Customers have the right to a pick and drop. Extra pickup / drop will be charged at ₹ 99 - ₹ 999 per stop. Additional charges of ₹ 299 - ₹ 999 will be charged if you want to take your pet with you.
                                </div>
                            </div>

                        </div>

                        <div className="space-y-3">
                            <div className='text-3xl font-medium'>
                                Pricing
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                1. Do I have to register to avail the service?
                                </div>
                                <div className='text-gray-700'>
                                    You may do the booking without any prior registration just share the requested details while placing the booking online.
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className='text-3xl font-medium'>
                                Payment
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                1. How do I pay for the service?
                                </div>
                                <div className='text-gray-700'>
                                You can pay an advance amount online (₹ 499 for a one-way trip and 30% advance for round trip booking) and the rest you can pay in cash directly to the driver after completion of the trip.
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                2. Can I pay complete amount in advance?
                                </div>
                                <div className='text-gray-700'>
                                Since the final amount is calculated on the actual total distance travelled, it is not possible to pay the complete amount in advance. Further, the driver needs cash for refuelling, toll taxes, states taxes and other expenses and hence we always recommend payment by cash to the driver.
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                3. Is the online payment secure?
                                </div>
                                <div className='text-gray-700'>
                                Yes, the online payment done on Bombay Taxi Company.in is completely safe and secure. We have tied up with PayU (India's leading online payment gateway) which uses Verisign certified security infrastructure to ensure that your online payment is completely safe. We also have PayPal payment option for International Card holders. As a company policy we don't store any card detail.
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                4. What all payment options I have online?
                                </div>
                                <div className='text-gray-700'>
                                We support all major credit and debit cards. We also have online banking payment options. In addition you can use PayU Wallet, PayPal, MobiKwik or PayTm as well.
                                </div>
                            </div>
                        </div>


                        <div className="space-y-3">
                            <div className='text-3xl font-medium'>
                                Other
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                1. Where can I give feedback regarding Bombay Taxi Company?
                                </div>
                                <div className='text-gray-700'>
                                    We value customers' feedback and love to hear about their experience of booking with us, good or bad. You can write to us at contact@bombaytaxicompany.in or call us. You can also reach us through our Facebook or Twitter accounts. We read every feedback that comes from our valued customers. We communicate the necessary Feedback to the concerned operator and take action against them, if necessary.
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                2. Do I have to pay for the driver's boarding & lodging?
                                </div>
                                <div className='text-gray-700'>
                                If you are travelling between 10.00 PM to 06.00 AM, you will have to pay a night charges of ₹ 250/-. For tours that extend over multiple nights, the amount will be charged on per night basis.
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                3. What if I start my journey late, say by an hour?
                                </div>
                                <div className='text-gray-700'>
                                We make sure our driver is ahead of time and you start the journey at the committed time. However, if you start the journey late, then you will have to pay a waiting charge after 45 mins. The charge is ₹ 150/ hr.
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                4. What if the driver turns-up late?
                                </div>
                                <div className='text-gray-700'>
                                Generally, the taxi will reach before the scheduled pick-up time. However, if the driver is late, then we wave off ₹ 150/ hr. The waive off is not provided on situations which are beyond driver’s control such as vehicle breakdown, difficulty to find your pick-up location, unable to reach you on phone, too much of traffic, bad weather, etc.
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                5. What if I need a particular car (for ex. Innova) for my trip? Will I get it?
                                </div>
                                <div className='text-gray-700'>
                                We try our best to provide a vehicle as per customer's requirement. However, for immediate booking, it becomes difficult to manage preferences. If you are looking to book a particular car type, we suggest you to make your booking well in advance.
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                6. How can I check fare for a particular route?
                                </div>
                                <div className='text-gray-700'>
                                You can check fare by logging in to our website www.BombayTaxiCompany.in and entering the travel details.
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xl">
                                7. What should I not bring with me?
                                </div>
                                <div className='text-gray-700'>
                                Any item which is prohibited in Airports, Railway Stations. For instance, Drugs, Liquor or any inflammable item.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const FAQs = () => {
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
