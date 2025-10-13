import { LeftOutlined, CheckCircleOutlined, CloseCircleOutlined, CarryOutOutlined, CarOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
import { useLocation } from "react-router-dom";
import { ITaxi } from "../../types/taxi.types";


export default function TaxiDetails() {

    const { state } = useLocation()

    const taxi: ITaxi = state?.taxi
    console.log(taxi)

    const goBack = () => {
        window.history.back();
    };

    const getStatusTag = (status: string | undefined) => {
        switch (status) {
          case 'Available':
            return <Tag icon={<CheckCircleOutlined />} color="success">Available</Tag>;
          case 'Unavailable':
            return <Tag icon={<CloseCircleOutlined />} color="error">Unavailable</Tag>;
          case 'Assigned':
            return <Tag icon={<CarryOutOutlined />} color="warning">Assigned</Tag>;
          case 'On a Trip':
            return <Tag icon={<CarOutlined />} color="processing">On a Trip</Tag>;
          default:
            return null;
        }
      };

    return (
        <div className='px-10 py-6 w-full'>
            <div className="space-y-2">
                <Button icon={<LeftOutlined />} className="tracking-tight font-medium mb-4" onClick={goBack}>
                    GO BACK
                </Button>
                <div className="text-xl flex space-x-3">
                    <div>
                        {taxi.taxi_no}
                    </div>
                    <div className="-mt-0.5">
                        {getStatusTag(taxi.taxi_status)}
                    </div>
                </div>
                <div>
                    TAXI TYPE : {taxi.taxi_type_id.name}
                </div>
            </div>
            <hr className="my-5" />
            <div>
                <div className="text-gray-900 my-3">
                    DETAILS
                </div>
                <div className="overflow-x-auto">
                    <table className="divide-y divide-gray-200">
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-500">RATE PER KM</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{taxi.taxi_type_id.price_km}</div>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-500">RATE PER HOUR</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{taxi.taxi_type_id.price_hour}</div>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-500">CAR FEATURES</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 font-bold">
                                        {taxi.taxi_type_id.car_features.map((feature) => {
                                            return (
                                                <Tag color="default">
                                                    {feature.feature}
                                                </Tag>
                                            )
                                        })
                                        }
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-500">DRIVING LICENSE</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{taxi.driving_license}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}
