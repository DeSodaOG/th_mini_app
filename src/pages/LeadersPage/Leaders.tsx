import { Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { OrbitProgress } from 'react-loading-indicators';
import { useState } from "react";
import { ShareLinkModal } from "@/components/ShareLinkModal";
import { SparkleText } from "@/components/SparkleText";
import { NeonText } from "@/components/NeonText";
import { selectRankingInfo } from "@/slices/rankingInfoSlice";
import { useInitData } from "@telegram-apps/sdk-react";


export const Leaders = () => {
    const initData = useInitData();
    const rankingInfo = useSelector(selectRankingInfo);
    const [openModal, setOpenModal] = useState(false);

    return rankingInfo.status ? <div className='flex flex-col w-full justify-center text-lg'>
        {/* <div className="flex justify-center h-24 bg-[url('./assets/images/logo_with_text.png')] bg-no-repeat bg-cover"> */}
        <NeonText>
            <div className="flex justify-center items-center my-5 text-xl">
                Tele-Hunter Championship
            </div>
        </NeonText>
        <div className="flex justify-start items-center text-sm mx-5">
            Detail Rules:
        </div>
        <div className="flex justify-start items-center text-sm mx-5">
            In order to achieve a cold launch of the product and reward early bird users, we designed a 30-day tournament event. At the end of the event, 500 TON rewards will be divided according to your score ranking.
        </div>
        <div className="flex justify-start items-center text-sm text-yellow-300 mx-5">
            * Top 1: 100 TON
        </div>
        <div className="flex items-center my-2 p-5 w-full">
            {/* <img
                width={120}
                style={{ borderRadius: "50%" }}
                alt="1"
                src="https://avatars.githubusercontent.com/u/84640980?v=4"
            /> */}
            <div className="flex flex-col h-full w-full items-center justify-center p-5 text-sm">
                <div className='flex justify-center w-full my-1'>
                    Your Ranking
                </div>
                <SparkleText>
                    {rankingInfo.userRank}
                </SparkleText>
                <NeonText color="turquoise">
                    <div className='flex justify-center w-full my-1'>
                        (Estimated Rewards: 0 TON)
                    </div>
                </NeonText>
            </div>
        </div>
        <Button gradientDuoTone="purpleToPink" className="items-center mx-3" onClick={() => setOpenModal(true)}>Invite More To Improve Your Ranking</Button>

        <div className="flex flex-col mt-5">
            <div className="m-1 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="border rounded-lg shadow overflow-hidden dark:border-neutral-700 dark:shadow-gray-900">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                            <thead>
                                <tr className="divide-x divide-gray-200 dark:divide-neutral-700">
                                    <th scope="col" className="px-2 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-neutral-500">Ranking</th>
                                    <th scope="col" className="px-2 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-neutral-500">TG-Handle</th>
                                    <th scope="col" className="px-2 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-neutral-500">Score</th>
                                    <th scope="col" className="px-2 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-neutral-500">Affiliates</th>
                                    <th scope="col" className="px-2 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-neutral-500">Sub-Affiliates</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                {
                                    rankingInfo.rankingInfo.map((x: any, index: number) => {
                                            const color = index === 0 ? "green" : index > 0 && index < 4 ? "yellow" : "blue";

                                            return <tr key={x.id}>
                                                <td className={`px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-${color}-500 dark:text-${color}-500`}>{
                                                    "No. " + (index + 1).toString()
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
