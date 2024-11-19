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
import { TbHandClick } from "react-icons/tb";
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
    // const isInDB = userInfo.id === initData?.user?.id.toString();
    // const isInGroup = userInfo.isInGroup;
    const isInGroup = true;
    const isInDB = true;
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

    return userInfo.status ? <div className='flex flex-col w-full justify-center text-base'>
        <NavLink to="/leaders">
            <div className="flex justify-center items-center h-16 bg-gradient-to-r from-purple-500 to-pink-500 text-center px-5">
                {local.home.banner}
            </div>
        </NavLink>
        {/* <NeonText>
            {
                isInGroup ? <div className="flex justify-center items-center my-1 h-16 text-center">
                    {initData?.user?.username}, {local.home.welcome_olduser}
                </div> : <div className="flex justify-center items-center m-5 text-center">
                    {initData?.user?.username}, {local.home.welcome_newuser}
                </div>
            }
        </NeonText> */}
        <div className="flex flex-col items-center justify-center mt-8 mb-3">
            <div className="containerCloud h-48">
                <div className="cloud">
                    <h2>$Hunter</h2>
                </div>
            </div>
        </div>
        <CoolText>
            {
                (isInGroup && isInDB) ? new Intl.NumberFormat().format(userInfo.score) ?? "10,000" : local.home.newJoin
            }
        </CoolText>
        {
            (isInGroup && isInDB) ?
                <div className="flex flex-col justify-center w-full">
                    <NeonText>
                        <div className="flex justify-center items-center my-2 mx-8 text-center text-sm">
                            {local.home.inviteMemo}
                        </div>
                    </NeonText>
                    <div className="flex flex-col h-full items-center text-sm p-5 m-5 justify-center rounded-lg shadow-lg shadow-purple-500/50 bg-gray-950 back border-2 border-purple-950">
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
                        </div>
                </div> :
                <div />
        }

        {
            (isInGroup && isInDB) ?
                <div className='flex flex-col justify-center w-full'>
                    <div className='flex justify-between p-5 text-lg w-full'>
                        <NavLink to="/dashboard" className="w-1/2 mr-4">
                            <button className="glow w-full flex justify-between items-center px-8">
                                <div>
                                    {local.home.earn}
                                </div>
                                <div>
                                    <TbHandClick />
                                </div>
                            </button>
                        </NavLink>
                        <button className="glow-on-hover w-1/2 flex justify-between items-center px-8 " onClick={() => setOpenModal(true)} >
                            <div className="z-20">
                                {local.home.invite}
                            </div>
                            <div className="z-20">
                                <TbHandClick />
                            </div>
                        </button>
                    </div>
                </div>
                : <div className='flex flex-col justify-center w-full'>
                    <NeonText>
                        <div className="flex justify-center items-center my-1 h-8 text-center text-base">
                            {local.home.stepInfo}
                        </div>
                    </NeonText>
                    <div className='flex justify-between p-5 text-lg w-full h-16 mb-10'>
                        <button className={!isInGroup ? "glow-on-hover w-full flex justify-between items-center px-8" :
                            "glow w-full flex justify-between items-center px-8 opacity-50"
                        } disabled={isInGroup} onClick={async () => {
                            const utils = initUtils();
                            utils.openLink(
                                defaultInviteLink
                            );

                            setTimeout(() => dispatch(setRefreshNum()), 5000);
                        }}>
                            <div>
                                Step 1:
                            </div>
                            {
                                isInGroup ? <div>
                                    {local.home.step1Complete}
                                </div> : <div>
                                    {local.home.step1}
                                </div>
                            }

                            <div>
                                <TbHandClick />
                            </div>
                        </button>
                    </div>
                    <div className='flex justify-between px-5 text-lg w-full h-16 mb-5'>
                        <button className={isInGroup ? "glow-on-hover w-full flex justify-between items-center px-8" :
                            "glow w-full flex justify-between items-center px-8 opacity-50"
                        } onClick={async () => {
                            if (!isInGroup) {
                                alert(local.home.alert)
                            } else {
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
                            }

                            // setTimeout(() => dispatch(setRefreshNum()), 5000);
                        }}>
                            <div>
                                Step 2:
                            </div>
                            <div>
                                {local.home.step2}
                            </div>
                            <div>
                                <TbHandClick />
                            </div>
                        </button>
                    </div>
                </div>
        }
        <ShareLinkModal tgID={initData?.user?.id.toString() ?? ''} openModal={openModal} setOpenModal={setOpenModal} />
    </div> : <div className='flex flex-col items-center justify-center h-96'>
        <Loading />
    </div>
};
