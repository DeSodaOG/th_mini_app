import { useSelector } from "react-redux";
import { OrbitProgress } from 'react-loading-indicators';
import { useState } from "react";
import { ShareLinkModal } from "@/components/ShareLinkModal";
import { SparkleText } from "@/components/SparkleText";
import { NeonText } from "@/components/NeonText";
import { selectRankingInfo } from "@/slices/rankingInfoSlice";
import { useInitData } from "@telegram-apps/sdk-react";
import { en_locationText, ru_locationText } from "@/assets/location";
import { TbHandClick } from "react-icons/tb";


export const Leaders = () => {
    const initData = useInitData();
    const rankingInfo = useSelector(selectRankingInfo);
    const [openModal, setOpenModal] = useState(false);
    const local = initData?.user?.languageCode === 'ru' || initData?.user?.languageCode === 'be' || initData?.user?.languageCode === 'uk' ? ru_locationText : en_locationText;

    return rankingInfo.status ? <div className='flex flex-col w-full justify-center items-center text-lg'>
        {/* <div className="flex justify-center h-24 bg-[url('./assets/images/logo_with_text.png')] bg-no-repeat bg-cover"> */}
        <NeonText>
            <div className="flex justify-center items-center my-5 text-xl text-center px-5">
                {local.leader.title}
            </div>
        </NeonText>
        <div className="flex flex-col w-full justify-center">
            <div className="flex justify-start items-center text-sm mx-5">
                {local.leader.detail}
            </div>
            <div className="flex justify-start items-center text-sm mx-5 my-3">
                {local.leader.rule}
            </div>
            <div className="flex justify-start items-center text-sm text-yellow-300 my-2 mx-5">
                {local.leader.reward1}
            </div>
            <div className="flex justify-start items-center text-sm text-yellow-300 my-2 mx-5">
                {local.leader.reward2}
            </div>
            <div className="flex justify-start items-center text-sm text-yellow-300 my-2 mx-5">
                {local.leader.reward3}
            </div>
            <div className="flex justify-start items-center text-sm text-yellow-300 my-2 mx-5 my-3">
                {local.leader.reward4}
            </div>
            <a className="flex justify-start items-center text-sm mx-5" href="https://medium.com/@telehunter/tele-hunter-carnival-king-of-invite-contest-6000-u-prize-money-to-grab-5fddea67b3ae">
                {local.leader.other}
            </a>
        </div>
        
        
        <div className="flex items-center my-2 p-5 w-full">
            {/* <img
                width={120}
                style={{ borderRadius: "50%" }}
                alt="1"
                src="https://avatars.githubusercontent.com/u/84640980?v=4"
            /> */}
            <div className="flex flex-col h-full w-full items-center justify-center p-5 text-sm ">
                <div className='flex justify-center w-full my-1'>
                    {local.leader.ranking}
                </div>
                <SparkleText>
                    {rankingInfo.userRank}
                </SparkleText>
                <NeonText color="turquoise">
                    <div className='flex justify-center w-full my-1'>
                        {local.leader.youearn}
                    </div>
                </NeonText>
            </div>
        </div>
        <button className="glow-on-hover flex justify-between w-5/6 items-center px-8 mx-3" onClick={() => setOpenModal(true)} >
            <div>
                {local.leader.invite}
            </div>
            <div>
                <TbHandClick />
            </div>
        </button>
        <div className="flex flex-col mt-5">
            <div className="m-1 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="border rounded-lg shadow overflow-hidden dark:border-neutral-700 dark:shadow-gray-900">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                            <thead>
                                <tr className="divide-x divide-gray-200 dark:divide-neutral-700">
                                    <th scope="col" className="px-2 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-neutral-500">{local.leader.tableRank}</th>
                                    <th scope="col" className="px-2 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-neutral-500">{local.leader.handle}</th>
                                    <th scope="col" className="px-2 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-neutral-500">$Hunter</th>
                                    <th scope="col" className="px-2 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-neutral-500">{local.leader.table3}</th>
                                    <th scope="col" className="px-2 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-neutral-500">{local.leader.table4}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                {
                                    rankingInfo.rankingInfo.map((x: any) => {
                                            const color = x.ranking === 1 ? "green" : x.ranking > 1 && x.ranking < 3 ? "yellow" : "blue";

                                            return <tr key={x.id}>
                                                <td className={`px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-${color}-500 dark:text-${color}-500`}>{
                                                    "No. " + x.ranking.toString()
                                                }</td>
                                                <td className={`px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-${color}-500 dark:text-${color}-500`}>{x.tghandle}</td>
                                                <td className={`px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-${color}-500 dark:text-${color}-500`}>{x.score}</td>
                                                <td className={`px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-${color}-500 dark:text-${color}-500`}>{x.affiliateamount}</td>
                                                <td className={`px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-${color}-500 dark:text-${color}-500`}>{x.subaffiliateamount}</td>
                                            </tr>
                                        }

                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <ShareLinkModal tgID={initData?.user?.id.toString() ?? ''} openModal={openModal} setOpenModal={setOpenModal} />
    </div> : <div className='flex flex-col items-center justify-center h-96'>
        <OrbitProgress variant="dotted" dense color="#32cd32" size="large" text="Hunter" textColor="" />
    </div>
};
