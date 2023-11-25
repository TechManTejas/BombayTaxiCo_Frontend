import { LeftOutlined, CheckCircleOutlined} from "@ant-design/icons";
import { Button, Tag } from "antd";


export default function DriverDetails() {

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
                        Amit Singh
                    </div>
                    <div className="-mt-0.5">
                        <Tag icon={<CheckCircleOutlined />} color="success">
                            Available
                        </Tag>
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
                                        <div className="text-sm text-gray-500">amit8225@gmail.com</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">CONTACT NO.</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">9004701229</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">ADDRESS</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">address</div>
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
