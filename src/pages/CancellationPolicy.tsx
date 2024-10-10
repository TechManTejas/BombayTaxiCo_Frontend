import { useNavigate } from "react-router-dom"
import { Footer } from "../components/Footer"
import HeroImage1 from "../assets/images/hero1.jpg";
import { Container } from "@mui/material";
import { ReadyToBook } from "../components/ReadyToBook";

const BreadCrumb: React.FC = () => {

    const navigate = useNavigate()

    return (
        <>
            <div className='text-gray-700 container py-6 flex space-x-1'>
                <button className='hover:text-[#FDB813] hover:underline' onClick={() => {
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

const Badge: React.FC = () => {
    return (
      <div
        className="rounded-3xl  my-4"
        style={{
          backgroundImage: `url(${HeroImage1})`,
          backgroundSize: "cover",
        }}
      >
        <div className="bg-[#00000099] text-white space-y-1 rounded-3xl p-24">
          <div className="text-center text-6xl font-bold">
            <span className="text-[#FDB813]">Cancellation</span> Policy<span className="text-[#FDB813]">.</span>
          </div>
          <div className="text-center text-sm">
            Reliable, affordable taxi services for safe and comfortable journeys.
          </div>
        </div>
      </div>
    );
  };

const Content: React.FC = () => {
    return (
        <>
            <div className='py-16 flex justify-center w-full'>
                <div className='flex flex-col justify-center items-center
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
            <Container>
                <BreadCrumb />
                <Badge/>
            </Container>
                <Content />
            <ReadyToBook/>
            <Footer />
        </div>
    )
}
