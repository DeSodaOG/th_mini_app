import { Button } from "flowbite-react";
import { NavLink, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShareLinkModal } from "@/components/ShareLinkModal";
import { CoolText } from "@/components/CoolText";
import { NeonText } from "@/components/NeonText";
import { useTonClient } from "@/hooks/useTonClient";
import { useInitData } from '@telegram-apps/sdk-react';

import './home.css';
import { TelegramBot } from "@/servers/TelegramBot";
import { Loading } from "@/components/Loading";
import { selectUserInfo } from "@/slices/userInfoSlice";
import { useSelector } from "react-redux";
import { BackendServer } from "@/servers/BackendServer";
import { defaultReferral } from "@/utils/constant";

export const Home = () => {
    const client = useTonClient();
    const initData = useInitData();
    const [queryParameters] = useSearchParams();
    const userInfo = useSelector(selectUserInfo);
    const newReferral = queryParameters.get("referral");
    const referralLink = newReferral ? "?referral=" + newReferral : '';

    // const [testLog, setTestLog] = useState<any>("");

    const [openModal, setOpenModal] = useState(false);
    const [joinStatus, setJoinStatus] = useState(1);    // 1: not join, 2: check in group, 3: success joined
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const tgBot = new TelegramBot();
        async function init() {
            if (client && initData?.user?.id) {
                const result = await tgBot.isJoinedGroup(initData?.user?.id.toString());
                if (result) {
                    const backendServer = new BackendServer()
                    const userInfo = await backendServer.getUserInfo(initData?.user?.id.toString());
                    if (userInfo.id !== '') {
                        setJoinStatus(3);
                    } else {
                        setJoinStatus(2)
                    }
                }

                setIsLoading(false);
            }
        }

        init();
    }, [client, initData]);

    return userInfo.status && !isLoading ? <div className='flex flex-col w-full justify-center text-lg'>
        {/* <div className="flex justify-center h-24 bg-[url('./assets/images/logo_with_text.png')] bg-no-repeat bg-cover"> */}
        <NavLink to="/leaders">
            <div className="flex justify-center items-center h-24 bg-gradient-to-r from-purple-500 to-pink-500">
                Join and earn the 500 TON Rewards!
            </div>
        </NavLink>
        <NeonText>
            {
                joinStatus === 3 ? <div className="flex justify-center items-center my-1 h-16">
                    Welcome {initData?.user?.username}, Golden Hunter!
                </div> : <div className="flex justify-center items-center m-5 text-center">
                    Welcome {initData?.user?.username}, New Hunter! Join and build your own affiliates system to earn more rewards.
                </div>
            }

        </NeonText>
        <div className="flex flex-col items-center justify-center mb-3">
            <div className="containerCloud h-48">
                <div className="cloud">
                    <h2>Hunter Score</h2>
                </div>
            </div>
        </div>
        <CoolText>
            {
                joinStatus === 3 ? userInfo.score ?? "10,000" : "Join To Earn 10,000"
            }
        </CoolText>

        <div className="rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-sm p-0.5 m-5">
            <div className="flex flex-col h-full w-full items-center justify-center bg-gray-900 back p-3">
                <div className='flex justify-between w-full'>
                    <div>
                        Your Affiliates:
                    </div>
                    <div>
                        {userInfo.affiliateAmount} ( * 20000 Hunter Score)
                    </div>
                </div>
                <div className='flex justify-between w-full'>
                    <NeonText color="turquoise">
                        Your Sub-Affiliates:
                    </NeonText>
                    <NeonText color="turquoise">
                        {userInfo.subAffiliateAmount} ( * 40000 Hunter Score)
                    </NeonText>
                </div>
                {/* <div>
                    {testLog}
                </div> */}
            </div>
        </div>
        {
            joinStatus === 1 ? <div className='flex justify-between p-5 text-xl w-full'>
                <Button gradientDuoTone="pinkToOrange" className="items-center w-full m-2" href="https://t.me/+pa0l-kBHkRcwZGFl">Join The Yielded Group And Create Your Affiliates system</Button>
            </div> : joinStatus === 2 ? <Button gradientDuoTone="pinkToOrange" className="items-center w-full m-2" onClick={async () => {
                const backendServer = new BackendServer();

                const result = await backendServer.createNewUser(
                    initData?.user?.id.toString() ?? '',
                    initData?.user?.username ?? '',
                    newReferral ?? defaultReferral
                );
                if (result) {
                    setJoinStatus(3);
                }

            }}>Claim The Init Rewards</Button> : <div className='flex justify-between p-5 text-xl w-full'>
                <NavLink to={"/dashboard" + referralLink} className="w-1/2 mr-2">
                    <Button gradientDuoTone="purpleToPink" className="items-center w-full">
                        Check Details
                    </Button>
                </NavLink>
                <Button gradientDuoTone="pinkToOrange" className="items-center w-1/2 ml-2" onClick={() => setOpenModal(true)}>Invite More</Button>
            </div>
        }

        <ShareLinkModal tgID={initData?.user?.id.toString() ?? ''} openModal={openModal} setOpenModal={setOpenModal} />
    </div> : <div className='flex flex-col items-center justify-center h-96'>
        <Loading />
    </div>
};
