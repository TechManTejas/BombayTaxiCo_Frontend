import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import HeroImage1 from "../assets/images/hero1.jpg";
import { Container } from "@mui/material";

const BreadCrumb: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="text-gray-700 container py-6 flex space-x-1">
        <button
          className="hover:text-[#FDB813] hover:underline"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
        <div>{">"} Terms & Conditions</div>
      </div>
    </>
  );
};

const Badge: React.FC = () => {
  return (
    <div
      className="rounded-3xl  my-4"
      style={{
        backgroundImage: `url(${HeroImage1})`,
        backgroundSize: "cover",
      }}
    >
      <div className="bg-[#00000099] text-white space-y-1 rounded-3xl p-16">
        <div className="text-center text-6xl font-bold">
          <span className="text-[#FDB813]">Terms &</span> Conditions
        </div>
        <div className="text-center text-sm">
          Reliable, affordable taxi services for safe and comfortable journeys.
        </div>
      </div>
    </div>
  );
};

const TnCBombayTaxiCompany: React.FC = () => {
  return (
    <>
      <div className="pb-20 flex justify-center w-full">
        <div
          className="flex flex-col justify-center items-center container
                    xl:flex-row
                "
        >
          <div
            className="space-y-6 
                        w-full
                        xl:w-1/2
                    "
          >
            <div className="space-y-3">
              <div className="text-3xl font-medium">General</div>
              <div className="text-gray-700">
                Welcome to the Bombay Taxi Company (“Bombay Taxi Company `”,
                “we”, “our”, “us”, “Company”) website (collectively, the
                “Site”). This Site is provided by us solely to assist customers
                in gathering travel information, determining the availability of
                travel-related goods and services, making legitimate
                reservations or otherwise transacting business with travel
                suppliers, and for no other purposes. Use of the Site is
                governed by the following Terms & Conditions. By using the Site,
                whether to review information or to book travel reservations
                (through this Site or telephone with our call centre), or for
                any other purpose, you agree to these Terms & Conditions and
                agree they control any travel reservations made with us. If you
                do not agree with any part of these Terms & Conditions, you must
                not use the Site or book travel reservations with us. We reserve
                the right to amend these Terms & Conditions at any time without
                prior notice. All amended terms automatically take effect when
                these Terms & Conditions are updated. Your continued use of the
                Site following the posting of changes to the Terms & Conditions
                will mean you accept those changes. Please return to this page
                periodically to review any changes. Any and all statements made
                in these Terms & Conditions related to Bombay Taxi Company are
                also made on behalf of our subsidiaries, parent companies and
                affiliates including all disclaimers.
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-medium">Disclaimer</div>
              <div className="text-gray-700">
                Bombay Taxi Company does not act as principal but makes
                arrangements with third-party vendors, such as, but not limited
                to hotels, car rental agencies, tour operators, activities
                suppliers. Bombay Taxi Company acts as a service provider that
                provides value added services to third-party vendors and
                consumers. Bombay Taxi Company has no control over and assumes
                no liability for the actions of the third-party vendors from
                whom it obtains travel products or services. Except as expressly
                stated herein, Bombay Taxi Company assumes no responsibility for
                actions relating to travel services beyond the control of Bombay
                Taxi Company or its employees. Bombay Taxi Company is not
                responsible or liable for any act, error, omission, injury,
                loss, accident, damage, delay, non-performance, irregularity, or
                any consequence thereof, which may be occasioned through
                neglect, or default or any other act or inaction of any vendor
                of travel products and services. The information, products and
                services offered on or through the site and by Bombay Taxi
                Company.in and any third-party sites are provided as is and
                without warranties of any kind either express or implied. To the
                fullest extent permissible pursuant to applicable law, we
                disclaim all warranties, express or implied, including, but not
                limited to, implied warranties of merchantability and fitness
                for a particular purpose. We do not warrant that the site or any
                of its functions will be uninterrupted or error-free, that
                defects will be corrected, or that any part of this site. We do
                not warrant or make any representations regarding the use or the
                results of the use of the site or materials on this site or on
                third-party sites in terms of their correctness, accuracy,
                timeliness, reliability or otherwise. Your use of this website
                is entirely at your own risk. You agree at all times to defend,
                indemnify and hold harmless Bombay Taxi Company its affiliates,
                their successors, transferees, assignees and licensees and their
                respective parent and subsidiary companies, agents, associates,
                officers, directors, shareholders and employees of each from and
                against any and all claims, causes of action, damages,
                liabilities, costs and expenses, including legal fees and
                expenses, arising out of or related to your breach of any
                obligation, warranty, representation or covenant set forth
                herein. Accuracy of Information. Although we strive to ensure
                the accuracy of the information found on this website, neither
                we, nor our affiliates, licensees, suppliers, or agents, can be
                held responsible by you for the accuracy of such information. It
                is solely your responsibility to evaluate the accuracy,
                completeness, and usefulness of all information provided on this
                website.
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-medium">
                Intellectual Property Rights
              </div>
              <div className="text-gray-700">
                This Site and all the materials available on the Site are the
                property of us and/or our affiliates or licensors, and are
                protected by copyright, trademark, and other intellectual
                property laws. You may not use the Site or the materials
                available on the Site in a manner that constitutes an
                infringement of our rights or that has not been authorized by
                us. More specifically, unless explicitly authorized in these
                Terms of Service or by the owner of the materials, you may not
                modify, copy, reproduce, republish, upload, post, transmit,
                translate, sell, create derivative works, exploit, or distribute
                in any manner or medium (including by email or other electronic
                means) any material from the Site. You may, however, from time
                to time, download and/or print one copy of individual pages of
                the Site for your personal, non-commercial use, provided that
                you keep intact all copyright and other proprietary notices.
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-medium">
                Limitation of Liability
              </div>
              <div className="text-gray-700">
                Under no circumstances, including, but not limited to,
                negligence, shall we, our subsidiary and parent companies or
                affiliates be liable for any direct, indirect, incidental,
                special or consequential damages that result from the use of, or
                the inability to use, the site, including its materials,
                products, or services, or third-party materials, products, or
                services made available through the site, even if we are advised
                beforehand of the possibility of such damages. (because some
                states do not allow the exclusion or limitation of certain
                categories of damages, the above limitation may not apply to
                you. In such states, our liability and the liability of our
                subsidiary and parent companies or affiliates is limited to the
                fullest extent permitted by such state law.) you specifically
                acknowledge and agree that we are not liable for any defamatory,
                offensive or illegal conduct of any user. If you are
                dissatisfied with the site, any materials, products, or services
                on the site, or with any of the site’s terms and conditions,
                your sole and exclusive remedy is to discontinue using the site
                and the products, services and/or materials. This site is
                continually under development and company makes no warranty of
                any kind, implied or express, as to its accuracy, completeness
                or appropriateness for any purpose.
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-medium">Privacy</div>
              <div className="text-gray-700">
                Any personally identifiable data about you which we collect from
                you on this website, including without limitation, personally
                identifiable data about you collected during any registration
                process as described below, is subject to the privacy policy
                that is applicable to this website. For more information, please
                carefully review the applicable privacy policy, which is
                accessible via a link provided at the bottom of the homepage of
                this website- Privacy Policy. Links. This website may contain
                links to other Internet websites and online resources. Links on
                this website to other websites or resources shall not be
                construed as an endorsement, control, review or approval of such
                other websites by us. You acknowledge and agree that we shall
                not be held responsible for the legality, accuracy, or
                inappropriate nature of any content, advertising, products,
                services, or information located on or through any other
                websites, nor for any loss or damages caused or alleged to have
                been caused by the use of or reliance on any such website or
                content. Further, the treatment of user data by the operators of
                third party websites may be different from our treatment of user
                data. For details regarding such operators’ treatment of data
                about users, you must review their privacy policies or terms and
                conditions of use or contact them for this information. Use of
                “Cookies” and Other Tracking Technologies. We may use cookies
                and other technologies to facilitate and track your use of
                services offered on this website and in connection with our
                e-mail communications & Advertisement. For more information on
                our use of such technology, please see the privacy policy
                accessible via a link provided at the bottom of the homepage of
                this website.
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-medium">Disclosure</div>
              <div className="text-gray-700">
                We may disclose your personally identifiable information not
                limited to the email address if we reasonably believe we are
                required to do so by law, regulation or other government
                authority. We will not sell your personally identifiable
                information not limited to the email address to any other
                company or organization except we may transfer your personally
                identifiable information to a successor entity upon a merger,
                consolidation or other corporate reorganization in which Bombay
                Taxi Company participates or to a purchaser of all or
                substantially all of Bombay Taxi Company’s assets. Such
                successor entity shall be bound by the terms and conditions of
                this Privacy Policy. Availability of this Website. This website
                is usually available 24 hours a day, 7 days a week. However, we
                retain the right to make this website unavailable from time to
                time for any reason or no reason. We shall not be liable for any
                damages arising from any interruption, suspension, or
                termination of this website. We hold the authority not to serve
                you at any time of the day/night. Void Where Prohibited.
                Although this website is accessible worldwide, not all products
                or services discussed or referenced in this website are
                available to all persons or in all geographic locations or
                jurisdictions. In addition, restrictions may apply to use of
                products or services obtained in one jurisdiction in other
                jurisdictions. Those who choose to access this website do so on
                their own initiative and at their own risk, and are responsible
                for compliance with their local laws, if and to the extent such
                local laws are applicable. You may not use or export the Site
                Materials or products and services available through this
                website in violation of applicable export laws and regulations.
                We, and our affiliates, licensees, suppliers and agents, reserve
                the right to limit the availability of this website and/or the
                provision of any product or service to any person, geographic
                area or jurisdiction we or they so desire, at any time and in
                our or their sole discretion. Applicable Law. Bombay Taxi
                Company hereby expressly disclaims any implied warranties
                imputed by the laws of any jurisdiction or country other than
                those where it is operating its offices. Bombay Taxi Company
                considers itself and intends to be subject to the jurisdiction
                only of the courts of Bombay (Mumbai), Maharashtra 400032,
                India.
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-medium">User(s) Eligibility</div>
              <div className="text-gray-700">
                User(s) means any individual or business entity/organization
                that legally operates in India or in other countries, uses and
                has the right to use the Services provided by Bombay Taxi
                Company. Our Services are available only in India and to those
                individuals or companies who can form legally binding contracts
                under the applicable law. Therefore, the user(s) must not be
                minor as per Indian Law; i.e. user(s) must be at least 18 years
                of age to be eligible to use our Services. Booking Acceptance
                Please note that there may be certain booking that we are unable
                to accept and must cancel. We reserve the right, at our sole
                discretion, to refuse or cancel any bookings for any reason.
                Some situations that may result in your booking being cancelled
                include limitations of available cabs/services providers,
                inaccuracies or errors in product or pricing information, or
                problems identified by our credit and fraud avoidance
                department. We may also require additional verifications or
                information before accepting any booking. We will contact you if
                all or any portion of your booking is cancelled or if additional
                information is required to accept your booking. If your booking
                is cancelled after your credit card has been charged, we will
                issue a full refund of all charges.
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-medium">
                Cancellation and Refund Policy
              </div>
              <div className="text-gray-700">
                <ul className="">
                  <li>
                    • You may cancel or change your booking any time by using
                    online link/ phone/email up-to 24 hours prior to pick up
                    date and time. You may cancel or change your booking any
                    time by using online link/ phone/email up-to 24 hours prior
                    to pick up date and time.
                  </li>
                  <li>
                    • In event of cancellation within 24 hours of pick-up time
                    Rs. 250 will be charged for Small Cab Rs. 500 for Family Cab
                    & Tempo Traveller and rest will be refunded.
                  </li>
                  <li>
                    • The refund will be processed within 5 to 7 working days
                    and will be transferred to the customerxe2x80x99s bank
                    account only after receiving all required information in
                    order to process the refund. No cash refund requests are
                    entertained.
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-medium">Special instructions</div>
              <div className="text-gray-700">
                <ul className="">
                  <li>
                    • Driver & car details will be sent to you by us
                    approximately before an hour from the pickup time by SMS,
                    and email, In some cases the driver or an associate of
                    Bombay Taxi Company may also call in advance to reconfirm
                    with you.
                  </li>
                  <li>
                    • Reservation confirmation email clearly indicates the items
                    included on your reservation. Any amount over and above this
                    both in terms for distance and duration and other items such
                    as night charges, driver allowance, toll, taxes, state
                    taxes, charges on for extra Kms consumed if applicable,
                    charges for extra hours consumed if applicable parking
                    charges etc. which are not included in the reservation
                    amount have to be paid directly to the driver as mentioned
                    in confirmation email. In case of any dispute with the
                    driver you should reach out to us via phone/email and
                    provide reservation number mention the subject of dispute.
                  </li>
                  <li>
                    • Any extra charges applicable have to be paid directly in
                    cash to the driver.
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-medium">Use of Cabs</div>
              <div className="text-gray-700">
                The following Terms & Conditions shall apply to customers /
                passengers utilizing the Services offered by the Bombay Taxi
                Company for the hiring of cabs:
                <ul className="">
                  <li>
                    • The customer shall pay the cab fare, parking charges, toll
                    charges, state taxes, additional night surcharge (where
                    applicable) and any fee or levy presently payable or
                    hereinafter imposed by the law or required to be paid for
                    availing of the cab Services.
                  </li>
                  <li>
                    • The customer agrees and accepts that the use of the
                    Services provided by the Bombay Taxi Company is at the sole
                    risk of the Customer, and further acknowledges that the
                    Company disclaims all representations and warranties of any
                    kind, whether express or implied.
                  </li>
                  <li>
                    • The customer also agrees to that:
                    <ul className="ml-8">
                      <li>
                        1. The cab will not be used for wedding, reception or
                        party purposes where the cab needs to be decorated.
                        Please call our call centre for such services.
                      </li>
                      <li>
                        2. Extra charge may be levied for certain destinations
                        and / or routes especially through hilly or mountainous
                        areas.
                      </li>
                      <li>
                        3. Extra night driving charges may be levied if the
                        driver is asked to drive between 10PM to 6AM.
                      </li>
                      <li>
                        4. Air conditioner may be switched off during cab is
                        traveling through hilly or mountainous areas.
                      </li>
                      <li>
                        5. The cab engine may be switched off while waiting.
                      </li>
                    </ul>
                  </li>
                  <li>
                    • The customer shall ensure that he/she will not indulge in
                    any of the following activities while in a cab:
                    <ul className="ml-8">
                      <li>
                        1. Smoking or consuming any kind of intoxicants inside
                        the cab. The driver has the right to refuse the pick-up
                        or ask the customer to alight the cab if the customer is
                        found to be in an intoxicated state or is found
                        misbehaving with other passengers or the driver, or is
                        causing a nuisance.
                      </li>
                      <li>2. Littering the cab</li>
                      <li>
                        3. Soiling or damaging the seats and/or any other
                        interiors of the cab.
                      </li>
                      <li>
                        4. Misusing, soiling or damaging any of the devices
                        (technical/non-technical) in the cab.
                      </li>
                      <li>
                        5. Asking the driver to break any Traffic/RTO/City
                        Police and/or government rules for any purpose. The
                        driver has the right to refuse such a request from the
                        customer. The driver also has the right to refuse such a
                        pick-up or ask such customer(s) to alight from the cab.
                      </li>
                      <li>
                        6. Pressurizing the driver to overload the boot space of
                        the cab with luggage. The customer shall not be
                        generally allowed to use the seating area of the cab for
                        placing any kind of luggage.
                      </li>
                    </ul>
                  </li>
                  <li>
                    • The customer agrees and acknowledges that the use of the
                    Services offered by Bombay Taxi Company is at the sole risk
                    of the customer and that Company disclaims all
                    representations and warranties of any kind, whether express
                    or implied as to condition, suitability, quality,
                    merchantability and fitness for any purposes are excluded to
                    the fullest extent permitted by law.
                  </li>
                  <li>
                    • Without prejudice to the above, the Bombay Taxi Company
                    makes no representation or warranty that:
                    <ul className="ml-8">
                      <li>
                        1. The services will meet the customer's requirements;
                      </li>
                      <li>
                        2. The services will be uninterrupted, timely, secure,
                        or error-free.
                      </li>
                    </ul>
                  </li>
                  <li>
                    • The Bombay Taxi Company shall not be responsible or liable
                    for any loss or damage, howsoever caused or suffered by the
                    Customer arising out of the use of cab service offered by
                    Company or due to the failure of Bombay Taxi Company to
                    provide Services to the Customer for any reason whatsoever
                    including but not limited to the Customer’s non-compliance
                    with the Services’ recorded voice instructions, malfunction,
                    partial or total failure of any network terminal, data
                    processing system, computer or telecommunications system or
                    other circumstances whether or not beyond the control of
                    Bombay Taxi Company or any person or any organization
                    involved in the above mentioned systems. Bombay Taxi Company
                    will not be liable for any damages of any kind arising from
                    the use of the Service offered by the Bombay Taxi Company,
                    including, but not limited to direct, indirect, incidental,
                    punitive, and consequential damages.
                  </li>
                  <li>
                    • If any passenger if misses the train or flight or bus,
                    Bombay Taxi Company will not be liable for any compensation.
                    The customer shall make an alternate arrangement if the cab
                    has not reached due to any reason.
                  </li>
                  <li>
                    • The Bombay Taxi Company is hereby authorized to use the
                    location-based information provided by any of the
                    telecommunication companies when the Customer uses the
                    mobile phone to make a cab booking. The location-based
                    information will be used only to facilitate and improve the
                    probability of locating a cab for the Customer.
                  </li>
                  <li>
                    • The Bombay Taxi Company shall be entitled at any time
                    without giving any reason to terminate the booking of cabs
                    done by the Customer.
                  </li>
                  <li>
                    • The Company encourages all its customers to take full
                    responsibility for his/her items. In case of lost items
                    inside the cab during the journey, Company will try to
                    locate the items on a “best-effort” basis but is not
                    responsible for the same in case of loss or damage to the
                    same.
                  </li>
                  <li>
                    • If the Customer leaves any goods in the cab or has any
                    complaint in respect of the Services or the use of the cab,
                    the Customer has to inform Bombay Taxi Company of the same
                    in writing within 4 hours of using the cab or the Services
                    of Bombay Taxi Company.
                  </li>
                  <li>
                    • The Bombay Taxi Company shall not be liable for any
                    conduct of the drivers of the cabs. However, the Bombay Taxi
                    Company encourages you to notify it of any complaints that
                    you may have against the driver of any cab that you may have
                    hired using the Bombay Taxi Company’s Services.
                  </li>
                  <li>
                    • All the calls made to the Bombay Taxi Company call centre
                    are recorded by the Bombay Taxi Company for quality and
                    training purposes.
                  </li>
                  <li>
                    • Many vehicles registered with the Bombay Taxi Company are
                    continuously tracked using GPS for security reasons only.
                  </li>
                  <li>
                    • It is expressly made clear to you hereby that the Bombay
                    Taxi Company does not own any cabs nor does it directly or
                    indirectly employ any drivers for the cabs. Cabs and drivers
                    are all supplied by third parties and the Bombay Taxi
                    Company disclaims any and all liability in respect of the
                    drivers and the cabs alike.
                  </li>
                  <li>
                    • The Bombay Taxi Company have right to use the customer
                    contact information for its own marketing purposes. The
                    Bombay Taxi Company may send regular SMS updates to the
                    mobile numbers registered with it.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const TermsAndConditions = () => {
  return (
    <div>
      <Container>
        <BreadCrumb />
        <Badge />
      </Container>
        <TnCBombayTaxiCompany />
      <Footer />
    </div>
  );
};
