import { LeftOutlined, CheckCircleOutlined, ClockCircleOutlined, CarOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";


export default function TaxiDetails() {

    const goBack = () => {
        window.history.back();
      };

    return (
        <div className='px-10 py-6 w-full'>
            <div className="space-y-2">
                <Button icon={<LeftOutlined />} className="tracking-tight font-medium" onClick={goBack}>
                    GO BACK
                </Button>
                <div className="text-xl flex space-x-3">
                    <div>
                        MH03 CJ3004
                    </div>
                    <div className="-mt-0.5">
                        <Tag icon={<CheckCircleOutlined />} color="success">
                            Available
                        </Tag>
                    </div>
                </div>
                <div>
                    TAXI TYPE : ECONOMY HATCHBACK
                </div>
            </div>
            <hr className="my-5" />
            <div>
                <div className="text-gray-400 my-3">
                    DETAILS
                </div>
                <div className="overflow-x-auto">
                    <table className="divide-y divide-gray-200">
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">RATE PER</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">120</div>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">CAR FEATURES</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 font-bold">
                                        <Tag icon={<CarOutlined />} color="default">
                                            AC
                                        </Tag>
                                        <Tag icon={<ClockCircleOutlined />} color="default">
                                            4 Seater
                                        </Tag></div>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">FARE DETAILS</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">details</div>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">DRIVING LICENSE</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">ANDH2563</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}
