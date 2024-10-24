import { Button } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShareLinkModal } from "@/components/ShareLinkModal";
import { CoolText } from "@/components/CoolText";
import { NeonText } from "@/components/NeonText";
import { useTonClient } from "@/hooks/useTonClient";
import { useInitData } from '@telegram-apps/sdk-react';
import { TelegramBot } from "@/servers/TelegramBot";
import { Loading } from "@/components/Loading";
import { selectUserInfo } from "@/slices/userInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import { BackendServer } from "@/servers/BackendServer";
import { defaultInviteLink, defaultReferral } from "@/utils/constant";
import { setRefreshNum } from "@/slices/globalInfoSlice";
import './home.css';

export const Home = () => {
    const dispatch: any = useDispatch();
    const client = useTonClient();
    const initData = useInitData();
    const userInfo = useSelector(selectUserInfo);
    const [openModal, setOpenModal] = useState(false);
    console.log(userInfo.id, initData?.user?.id)
    let referralID = initData?.startParam ?? defaultReferral;
    const joinStatus = userInfo.isInGroup ? ((userInfo.id === initData?.user?.id) ? 3 : 2) : 1
    
    useEffect(() => {
        const tgBot = new TelegramBot();
        const backendServer = new BackendServer()
        async function init() {
            console.log("Referral ID: ", initData?.startParam);
            if (initData?.startParam) {
                const result = await tgBot.isJoinedGroup(initData?.startParam);
                const referralInfo = await backendServer.getUserInfo(initData?.startParam);
                if (!result || referralInfo.id == '') {
                    console.log("Not valid referral.")
                    referralID = defaultReferral;
                }
            }
        }

        init();
    }, [client, initData, userInfo]);

    return userInfo.status ? <div className='flex flex-col w-full justify-center text-lg'>
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
            joinStatus === 3 ? <div className='flex justify-between p-5 text-xl w-full'>
                <NavLink to="/dashboard" className="w-1/2 mr-2">
                    <Button gradientDuoTone="purpleToPink" className="items-center w-full">
                        Check Details
                    </Button>
                </NavLink>
                <Button gradientDuoTone="pinkToOrange" className="items-center w-1/2 ml-2" onClick={() => setOpenModal(true)}>Invite More</Button>
            </div> : joinStatus === 2 ? <Button gradientDuoTone="pinkToOrange" className="items-center w-full m-2" onClick={async () => {
                const backendServer = new BackendServer();

                const result = await backendServer.createNewUser(
                    initData?.user?.id.toString() ?? '',
                    initData?.user?.username ?? '',
                    referralID
                );

                if (result) {
                    dispatch(setRefreshNum());
                }
            }}>Claim The Init Rewards</Button> : <div className='flex justify-between p-5 text-xl w-full'>
                <Button gradientDuoTone="pinkToOrange" className="items-center w-full m-2" href={defaultInviteLink}>Join The Yielded Group And Create Your Affiliates system</Button>
            </div>
        }

        <ShareLinkModal tgID={initData?.user?.id.toString() ?? ''} openModal={openModal} setOpenModal={setOpenModal} />
    </div> : <div className='flex flex-col items-center justify-center h-96'>
        <Loading />
    </div>
};
