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
                King-Of-Invite Contest: $6000 to grab
            </div>
        </NeonText>
        <div className="flex justify-start items-center text-sm mx-5">
            Detail Rules:
        </div>
        <div className="flex justify-start items-center text-sm mx-5 my-3">
            To celebrate the milestone, Tele Hunter presents, $6000 USDT prize pool to grab lasting 6 weeks starting from Nov, 11th. Zero threshold, free to participate, everyone is equal. Invite more, improve your Ranking, Higher Chance to win.
        </div>
        <div className="flex justify-start items-center text-sm text-yellow-300 my-2 mx-5">
            * No. 1: $1000 USDT
        </div>
        <div className="flex justify-start items-center text-sm text-yellow-300 my-2 mx-5">
            * No. 2 ~ 3: $500 USDT
        </div>
        <div className="flex justify-start items-center text-sm text-yellow-300 my-2 mx-5">
            * No. 4 ~ 10: $200 USDT
        </div>
        <div className="flex justify-start items-center text-sm text-yellow-300 my-2 mx-5 my-3">
            * No. 11 ~ 80: $35 USDT
        </div>
        <a className="flex justify-start items-center text-sm mx-5" href="https://medium.com/@telehunter/tele-hunter-carnival-king-of-invite-contest-6000-u-prize-money-to-grab-5fddea67b3ae">
            Extra giveaway campaigns, totaling $1000.
        </a>
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
                        (You can win $1000 at most)
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
                                    <th scope="col" className="px-2 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-neutral-500">$Hunter</th>
                                    <th scope="col" className="px-2 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-neutral-500">Tier-1 Affiliates</th>
                                    <th scope="col" className="px-2 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-neutral-500">Tier-2 Affiliates</th>
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
