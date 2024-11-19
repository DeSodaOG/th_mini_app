import { Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { OrbitProgress } from 'react-loading-indicators';
import { useState } from "react";
import { ShareLinkModal } from "@/components/ShareLinkModal";
import { NeonText } from "@/components/NeonText";
import { selectUserInfo } from "@/slices/userInfoSlice";
import { selectUserRanking } from "@/slices/rankingInfoSlice";
import { useInitData } from "@telegram-apps/sdk-react";
import { en_locationText, ru_locationText } from "@/assets/location";
import affiliates from "@/assets/images/affiliates.png";
import { TbHandClick } from "react-icons/tb";

export const Dashboard = () => {
    const initData = useInitData();
    const userInfo = useSelector(selectUserInfo);
    const userRanking = useSelector(selectUserRanking);
    const [openModal, setOpenModal] = useState(false);
    const local = initData?.user?.languageCode === 'ru' || initData?.user?.languageCode === 'be' || initData?.user?.languageCode === 'uk' ? ru_locationText : en_locationText;

    return userInfo.status ? <div className='flex flex-col w-full justify-center text-lg px-5'>
        {/* <div className="flex justify-center h-24 bg-[url('./assets/images/logo_with_text.png')] bg-no-repeat bg-cover"> */}
        <NeonText>
            <div className="flex justify-center text-center my-2 p-5 w-full">
                {local.dashboard.well} {userInfo.tgHandle}. {local.dashboard.start}
            </div>
        </NeonText>
        <div className="flex flex-col h-full w-full items-center justify-center p-8 text-sm rounded-lg shadow-lg shadow-purple-500/50 bg-gray-950 border-2 border-purple-950">
            <div className='flex justify-between w-full my-1'>
                <div>
                    {local.dashboard.totalPoint}
                </div>
                <div>
                    {userInfo.score}
                </div>
            </div>
            <div className='flex justify-between w-full my-1'>
                <div>
                    {local.dashboard.pointRank}
                </div>
                <div>
                    {userRanking}
                </div>
            </div>
            <div className='flex justify-between w-full my-1'>
                <div>
                    {local.dashboard.tier1}
                </div>
                <div>
                    {userInfo.affiliateAmount}
                </div>
            </div>
            <div className='flex justify-between w-full my-1'>
                <div>
                    {local.dashboard.tier2}
                </div>
                <div>
                    {userInfo.subAffiliateAmount}
                </div>
            </div>
            <button className="glow-on-hover flex justify-between w-full items-center px-8 m-6" onClick={() => setOpenModal(true)} >
                <div>
                    {local.leader.invite}
                </div>
                <div>
                    <TbHandClick />
                </div>
            </button>
        </div>
        {/* <CoolButton>Invite More To Earn More</CoolButton> */}
        {/* <Button gradientDuoTone="purpleToPink" className="items-center mx-3" onClick={() => setOpenModal(true)}>Invite More To Earn More</Button> */}

        <div className="flex justify-center items-center my-5 text-xl mt-10">
            {local.dashboard.descTitle}
        </div>
        <div className="flex justify-start items-center text-sm mx-5 my-2">
            {local.dashboard.rule}
        </div>
        <div className="flex justify-start items-center text-sm mx-5 my-2">
            {local.dashboard.rule1}
        </div>
        <div className="flex justify-start items-center text-sm text-yellow-300 mx-5 my-2">
            {local.dashboard.rule2}
        </div>
        <div className="flex justify-start items-center text-sm text-yellow-300 mx-5 my-2">
            {local.dashboard.rule3}
        </div>
        <div className="w-full px-8 my-5">
            <img src={affiliates} />
        </div>
        {
            userInfo.affiliates.length === 0 ? <div className="m-10 overflow-x-auto text-center text-2xl">
                {local.dashboard.noAffiliate}
            </div> : <div className="flex flex-col mt-5">
                <div className="m-1 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="border rounded-lg shadow overflow-hidden dark:border-neutral-700 dark:shadow-gray-900">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <thead>
                                    <tr className="divide-x divide-gray-200 dark:divide-neutral-700">
                                        <th scope="col" className="px-2 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-neutral-500">{local.dashboard.table1}</th>
                                        <th scope="col" className="px-2 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-neutral-500">{local.dashboard.table2}</th>
                                        <th scope="col" className="px-2 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-neutral-500">{local.dashboard.table3}</th>
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
                                                    <Button gradientDuoTone="purpleToPink" className="items-center" size="xs" href={`https://t.me/${x.tghandle}`}>{local.dashboard.push}</Button>
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
