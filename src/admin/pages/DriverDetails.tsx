import { LeftOutlined, CheckCircleOutlined, CloseCircleOutlined, CarryOutOutlined, CarOutlined } from "@ant-design/icons";
import { Button, Space, Tag } from "antd";
import { useLocation } from "react-router-dom";
import { IDriver } from "../../types/drivers.types";


export default function DriverDetails() {

    const { state } = useLocation()

    const driver: IDriver = state?.driver
    console.log(driver)

    const goBack = () => {
        window.history.back();
    };

    const getStatusTag = (status: string) => {
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
                        {driver.name}
                    </div>
                    <div className="-mt-0.5">
                        {getStatusTag(driver.driver_status)}
                    </div>
                </div>
                <div>
                    DRIVER ID : MH03239FK
                </div>
            </div>
            <hr className="my-5" />
            <div className="grid grid-cols-2">
                <div>
                    <div className="text-gray-400 my-3">
                        DETAILS
                    </div>
                    <div className="overflow-x-auto">
                        <table className="divide-y divide-gray-200">
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">EMAIL ID</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{driver.email_id}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">CONTACT NO.</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{driver.mobile_no}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">ADDRESS</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{driver.address}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">RC Registration Number</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{driver.driving_license}</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <Space className='space-x-4 my-4'>
                        <Button htmlType="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-28 h-10">
                            ASSIGN
                        </Button>
                        {/* <Button className="font-semibold w-28 h-10" onClick={goBack}>
                            DELETE
                        </Button> */}
                    </Space>

                </div>
                <div>
                    <div className="text-gray-400 my-3">
                        ASSIGN TO
                    </div>
                    <div className="overflow-x-auto">
                        <table className="divide-y divide-gray-200">
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">NA</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}
