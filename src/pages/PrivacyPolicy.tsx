import { useNavigate } from "react-router-dom"
import { Footer } from "../components/Footer"
import HeroImage1 from "../assets/images/hero1.jpg";
import { Container } from "@mui/material"
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
                    {'>'} Privacy Policy
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
        <div className="bg-[#00000099] text-white space-y-1 rounded-3xl p-4 lg:p-24">
          <div className="text-center text-6xl font-bold">
            <span className="text-[#FDB813]">Privacy</span> Policy<span className="text-[#FDB813]">.</span>
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
            <div className='pb-20 flex justify-center w-full px-4'>
                <div className='flex flex-col justify-center items-center container
                    xl:flex-row
                '>
                    <div className='space-y-6 
                        w-full
                        xl:w-1/2
                    '>
                        <div className="space-y-3">
                            <div className="space-y-3 text-gray-700">
                                <div className=''>
                                    Privacy is a hot topic these days, and we want you to feel totally comfortable using our service, so our privacy policy is very simple
                                </div>
                                <div>
                                    <span className="font-bold pr-1">
                                        Personal identification information
                                    </span>
                                    We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, subscribe to the newsletter, fill out a form, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, phone number. Users may, however, visit our Site anonymously. We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Site related activities.
                                </div>
                                <div>
                                    <span className="font-bold pr-1">
                                        Non-personal identification information
                                    </span>
                                    We may collect non-personal identification information about Users whenever they interact with our Site. The non-personal identification information may include the browser name, the type of computer and technical information about Users means of connection to our Sites, such as the operating system and the Internet service providers utilized and other similar information. We use IP addresses to analyse trends, administer the site, track users’ movement, and gather broad information for aggregate use. IP addresses are not linked to personally identifiable information.
                                </div>
                                <div>
                                    <span className="font-bold pr-1">
                                        Email:
                                    </span>
                                    If you chose to opt-in to receive promotional or information email from Bombay Taxi Company, we will occasionally send advertisements, marketing material or other offers on behalf of other businesses that we think might be of interest to you. This material is sent by Bombay Taxi Company, and we do not give the other businesses your email address. If you do not want to receive these advertisements, marketing material or other offers, please opt out of these communications by clicking the unsubscribe link provided in each email.
                                </div>
                                <div>
                                    <span className="font-bold pr-1">
                                        Future Business Transfers:
                                    </span>
                                    In the event Bombay Taxi Company goes through a business transition, such as a merger, acquisition by another company, or sale of all or a portion of its assets, your personally identifiable information will likely be among the assets transferred. You will be notified via email or prominent notice in our website before 30 days of any such change in ownership or control of your personal information.
                                </div>
                                <div>
                                    <span className="font-bold pr-1">
                                        Disclosure:
                                    </span>
                                    We may disclose your personally identifiable information not limited to the email address if we reasonably believe we are required to do so by law, regulation or other government authority. We will not sell your personally identifiable information not limited to the email address to any other company or organization except we may transfer your personally identifiable information to a successor entity upon a merger, consolidation or other corporate reorganization in which Bombay Taxi Company participates or to a purchaser of all or substantially all of Bombay Taxi Company ‘s assets. Such successor entity shall be bound by the terms and conditions of this Privacy Policy.
                                </div>
                                <div>
                                    <span className="font-bold pr-1">
                                        Web Browser Cookies
                                    </span>
                                    Our Site may use “cookies” to enhance User experience. User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. A user may choose to set their web browser to refuse cookies or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not function properly.
                                </div>
                                <div>
                                    <span className="font-bold pr-1">
                                        Testimonials
                                    </span>
                                    We may post customer testimonials/comments/reviews on our websites which may contain personally identifiable information. We will obtain your consent via email prior to posting the testimonial. To request the removal of your testimonial, please contact us through one of the methods listed below.
                                </div>
                                <div>
                                    <span className="font-bold pr-1">
                                        Other Sites
                                    </span>
                                    Our Website may contain links to other Web sites (such as those of our marketing partners or advertisers), which may have privacy policies that differ from our own. We are not responsible for the activities and practices that take place on these Web sites. Accordingly, we recommend that you review the privacy policy posted on any Web site that you may access through our Website.
                                </div>
                                <div>
                                    <span className="font-bold pr-1">
                                        Children's Privacy
                                    </span>
                                    This Website is not directed to, and Bombay Taxi Company.in does not knowingly collect personal information from, children under the age of 13. We recommend that parents actively participate in their children's use of the Internet.
                                </div>
                                <div>
                                    <span className="font-bold pr-1">
                                        Correction/Updating/Deleting Personally Identifiable Information:
                                    </span>
                                    Bombay Taxi Company provides you with the ability to review, correct and delete any of the personally identifiable information that you have provided to us. If you wish to review, correct or delete any information you have provided to us, you may contact us at care@bombaytaxico.com
                                </div>
                                <div>
                                    <span className="font-bold pr-1">
                                        Changes to This Privacy Policy
                                    </span>
                                    we decide to change our privacy policy, we will post those changes to this privacy statement page, so that you are aware of what information we collect, how we use it, and under what circumstances if any, we disclose it. We reserve the right to modify this privacy statement at any time, so please review it frequently. If we make material changes to this policy, we will notify you by email or by means of a notice on our homepage. Questions or Concerns if you have any questions or concerns regarding privacy at Bombay Taxi Company, please send us a detailed message to care@bombaytaxico.com
                                </div>
                                <div>
                                    <span className="font-bold pr-1">
                                        Corporate Office
                                    </span>
                                    <div>
                                        Mumbai
                                    </div>
                                    <div>
                                        care@bombaytaxico.com
                                    </div>
                                    <div>
                                        effort to resolve your concerns.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const PrivacyPolicy = () => {
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
