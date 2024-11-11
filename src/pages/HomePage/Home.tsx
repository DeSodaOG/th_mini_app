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
import { initUtils } from '@telegram-apps/sdk-react';
import { setRefreshNum } from "@/slices/globalInfoSlice";
import './home.css';
import { en_locationText, ru_locationText } from "@/assets/location";

export const Home = () => {
    const dispatch: any = useDispatch();
    const client = useTonClient();
    const initData = useInitData();
    console.log(initData);
    const userInfo = useSelector(selectUserInfo);
    const [openModal, setOpenModal] = useState(false);

    let referralID = initData?.startParam ?? defaultReferral;
    const isInDB = userInfo.id === initData?.user?.id.toString();
    const isInGroup = userInfo.isInGroup && isInDB;
    const local = initData?.user?.languageCode === 'ru' || initData?.user?.languageCode === 'be' || initData?.user?.languageCode === 'uk' ? ru_locationText : en_locationText;
    
    useEffect(() => {
        const tgBot = new TelegramBot();
        const backendServer = new BackendServer()
        async function init() {
            console.log("Referral ID: ", initData?.startParam);
            if (initData?.startParam) {
                if (Number(initData?.startParam) > 1000) {
                    const result = await tgBot.isJoinedGroup(initData?.startParam);
                    const referralInfo = await backendServer.getUserInfo(initData?.startParam);
                    if (!result || referralInfo.id == '') {
                        console.log("Not valid referral.")
                        referralID = defaultReferral;
                    }
                }
            }
        }

        init();
    }, [client, initData, userInfo]);

    return userInfo.status ? <div className='flex flex-col w-full justify-center text-lg'>
        <NavLink to="/leaders">
            <div className="flex justify-center items-center h-24 bg-gradient-to-r from-purple-500 to-pink-500 text-center px-5">
                {local.home.banner}
            </div>
        </NavLink>
        <NeonText>
            {
                isInGroup ? <div className="flex justify-center items-center my-1 h-16 text-center">
                    {initData?.user?.username}, {local.home.welcome_olduser}
                </div> : <div className="flex justify-center items-center m-5 text-center">
                    {initData?.user?.username}, {local.home.welcome_newuser}
                </div>
            }
        </NeonText>
        <div className="flex flex-col items-center justify-center mb-3">
            <div className="containerCloud h-48">
                <div className="cloud">
                    <h2>$Hunter</h2>
                </div>
            </div>
        </div>
        <CoolText>
            {
                isInGroup ? new Intl.NumberFormat().format(userInfo.score) ?? "10,000" : local.home.newJoin
            }
        </CoolText>
        <div className="rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-sm p-0.5 m-5">
            <div className="flex flex-col h-full w-full items-center justify-center bg-gray-900 back p-3">
                <div className='flex justify-between w-full'>
                    <div>
                        {local.home.tier1}
                    </div>
                    <div>
                        {userInfo.affiliateAmount} ( * 20000 $Hunter)
                    </div>
                </div>
                <div className='flex justify-between w-full'>
                    <NeonText color="turquoise">
                        {local.home.tier2}
                    </NeonText>
                    <NeonText color="turquoise">
                        {userInfo.subAffiliateAmount} ( * 40000 $Hunter)
                    </NeonText>
                </div>
                {/* <div>
                    {testLog}
                </div> */}
            </div>
        </div>
        {
            isInGroup ? <div className='flex justify-between p-5 text-xl w-full'>
                <NavLink to="/dashboard" className="w-1/2 mr-2">
                    <Button gradientDuoTone="purpleToPink" className="items-center w-full inline-flex">
                        {local.home.earn}
                    </Button>
                </NavLink>
                <Button gradientDuoTone="pinkToOrange" className="items-center w-1/2 ml-2 inline-flex" onClick={() => setOpenModal(true)}>{local.home.invite}</Button>
            </div> : <div className='flex justify-between p-5 text-xl w-full'>
                <Button gradientDuoTone="pinkToOrange" className="items-center w-full m-2 animate-bounce focus:animate-none hover:animate-none inline-flex" onClick={async () => {

                    if (!isInDB) {
                        const backendServer = new BackendServer();
                        
                        const result = await backendServer.createNewUser(
                            initData?.user?.id.toString() ?? '',
                            initData?.user?.username ?? '',
                            referralID
                        );

                        if (!result) {
                            // alert("Join The Affiliate System Failed, please refresh the mini app or contact with Official.")
                            dispatch(setRefreshNum());
                            return;
                        }
                    }
                    
                    const utils = initUtils();
                    utils.openTelegramLink(
                        defaultInviteLink
                    );
                    
                    setTimeout(() => dispatch(setRefreshNum()), 5000);
                }}>{local.home.join}</Button>
            </div>
        }
        <ShareLinkModal tgID={initData?.user?.id.toString() ?? ''} openModal={openModal} setOpenModal={setOpenModal} />
    </div> : <div className='flex flex-col items-center justify-center h-96'>
        <Loading />
    </div>
};
