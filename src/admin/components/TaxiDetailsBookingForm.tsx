import { Tag } from "antd";
import { Taxi } from "../../types/taxi.types";
import { TaxiType } from "../../types/taxiTypes.types";
import { IBooking } from "../../types/bookings.types";
import dayjs from "dayjs";

interface TaxiDetailsProps {
    taxi: Taxi;
    taxiType: TaxiType;
}

export const TaxiDetailsBookingForm: React.FC<TaxiDetailsProps> = ({ taxi, taxiType }) => {
    return (
        <div className="p-2">
            <div className="flex justify-between space-x-2">
                <div className="font-bold">{taxi.taxi_no}</div>
                <div className="text-gray-400">{taxiType.name}</div>
                <div>
                    <Tag color={getColorForTaxiStatus(taxi.taxi_status)}>{taxi.taxi_status}</Tag>
                </div>
            </div>
            {/* <div>
                {taxiType.car_features.map((feature) => (
                    <Tag key={feature._id}>{feature.feature}</Tag>
                ))}
            </div> */}
            <div>
                <div className="text-xs mt-2">
                    ASSIGNED TRIPS
                </div>
                <div>
                    {taxi.assigned_trips?.map((booking: IBooking, index: number) => (
                        <>
                            <div key={booking._id} className="flex space-x-2 my-0.5">
                                <div>{index + 1}.</div>
                                <div>
                                    {booking.route_id.from_id.name}-{booking.route_id.to_id.name}
                                </div>
                                <Tag>{booking.trip_type}</Tag>
                                <div className="font-bold">{dayjs(booking.pick_up_date).format('DD MMM YYYY')}</div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Helper function to get color based on taxi status
const getColorForTaxiStatus = (status: string) => {
    switch (status) {
        case 'Available':
            return 'green';
        case 'Unavailable':
            return 'volcano';
        case 'Assigned':
            return 'geekblue';
        case 'On a Trip':
            return 'blue';
        default:
            return 'default';
    }
};
