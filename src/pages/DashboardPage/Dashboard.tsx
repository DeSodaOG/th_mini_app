import { Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { OrbitProgress } from 'react-loading-indicators';
import { useState } from "react";
import { ShareLinkModal } from "@/components/ShareLinkModal";
import { NeonText } from "@/components/NeonText";
import { selectUserInfo } from "@/slices/userInfoSlice";
import { selectUserRanking } from "@/slices/rankingInfoSlice";
import { useInitData } from "@telegram-apps/sdk-react";

export const Dashboard = () => {
    const initData = useInitData();
    const userInfo = useSelector(selectUserInfo);
    const userRanking = useSelector(selectUserRanking);
    const [openModal, setOpenModal] = useState(false);

    return userInfo.status ? <div className='flex flex-col w-full justify-center text-lg'>
        {/* <div className="flex justify-center h-24 bg-[url('./assets/images/logo_with_text.png')] bg-no-repeat bg-cover"> */}
        <NeonText>
            <div className="flex justify-center text-center my-2 p-5 w-full">
                Good Job! {userInfo.tgHandle}. Keep effort!
            </div>
        </NeonText>
        <div className="flex flex-col h-full w-full items-center justify-center p-5 text-sm">
            <div className='flex justify-between w-full my-1'>
                <div>
                    Total Earned Score:
                </div>
                <div>
                    {userInfo.score}
                </div>
            </div>
            <div className='flex justify-between w-full my-1'>
                <div>
                    Your Score Ranking:
                </div>
                <div>
                    {userRanking}
                </div>
            </div>
            <div className='flex justify-between w-full my-1'>
                <div>
                    Your Total Affiliates:
                </div>
                <div>
                    {userInfo.affiliateAmount}
                </div>
            </div>
            <div className='flex justify-between w-full my-1'>
                <div>
                    Your Total Sub-Affiliates:
                </div>
                <div>
                    {userInfo.subAffiliateAmount}
                </div>
            </div>
        </div>
        {/* <CoolButton>Invite More To Earn More</CoolButton> */}
        <Button gradientDuoTone="purpleToPink" className="items-center mx-3" onClick={() => setOpenModal(true)}>Invite More To Earn More</Button>

        <div className="flex justify-center items-center my-5 text-xl">
            Your Affiliate System Details
        </div>
        <div className="flex justify-start items-center text-sm mx-5">
            Scored Rules:
        </div>
        <div className="flex justify-start items-center text-sm mx-5">
            1. If you have a new affiliate, you will get 10000 Hunter Score.
        </div>
        <div className="flex justify-start items-center text-sm text-yellow-300 mx-5">
            2. If you have a sub-affiliate (your affiliate’s affiliate), you will get 20000 Hunter Score. So doing your best to help your affiliates will make you earn more
        </div>
        {
            userInfo.affiliates.length === 0 ? <div className="m-10 overflow-x-auto text-center text-2xl">
                You have no affiliates, share to get more affiliates.
            </div> : <div className="flex flex-col mt-5">
                <div className="m-1 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="border rounded-lg shadow overflow-hidden dark:border-neutral-700 dark:shadow-gray-900">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <thead>
                                    <tr className="divide-x divide-gray-200 dark:divide-neutral-700">
                                        <th scope="col" className="px-2 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-neutral-500">TG-Handle</th>
                                        <th scope="col" className="px-2 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-neutral-500">Sub-Affiliates</th>
                                        <th scope="col" className="px-2 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-neutral-500">Revenue Contribution</th>
                                        <th scope="col" className="px-2 py-3 text-end text-sm font-medium text-gray-500 uppercase dark:text-neutral-500"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                    {
                                        userInfo.affiliates.map((x: any) =>
                                            <tr key={x.id}>
                                                <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-100 dark:text-neutral-200">{x.tghandle}</td>
                                                <td className="px-2 py-4 whitespace-nowrap text-center text-sm text-gray-100 dark:text-neutral-200">{x.affiliateamount}</td>
                                                <td className="px-2 py-4 whitespace-nowrap text-center text-sm text-gray-100 dark:text-neutral-200">{x.affiliateamount} * 40000</td>
                                                <td className="px-2 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                    <Button gradientDuoTone="purpleToPink" className="items-center" size="xs" href={`https://t.me/${x.tghandle}`}>Push Him!</Button>                                                
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        }


        <ShareLinkModal tgID={initData?.user?.id.toString() ?? ''} openModal={openModal} setOpenModal={setOpenModal} />
    </div> : <div className='flex flex-col items-center justify-center h-96'>
        <OrbitProgress variant="dotted" dense color="#32cd32" size="large" text="Hunter" textColor="" />
    </div>
};
