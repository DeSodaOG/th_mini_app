import { useEffect } from 'react';
import { AppRoot } from '@telegram-apps/telegram-ui';

import { Outlet } from "react-router-dom";
import { TopNav } from './TopNav';
import { Footer } from './Footer';
import {
    // bindMiniAppCSSVars,
    // bindThemeParamsCSSVars,
    bindViewportCSSVars,
    useLaunchParams,
    // useMiniApp,
    // useThemeParams,
    useViewport,
} from '@telegram-apps/sdk-react';
import {useSelector} from "react-redux";
import { selectUserInfo } from '../slices/userInfoSlice';
import { selectRankingInfo } from '../slices/rankingInfoSlice';
import { Loading } from './Loading';

export const Page = () => {
    const lp = useLaunchParams();
    // const miniApp = useMiniApp();
    // const themeParams = useThemeParams();
    const viewport = useViewport();
    const userInfo = useSelector(selectUserInfo);
    const rankingInfo = useSelector(selectRankingInfo);

    // useEffect(() => {
    //     return bindMiniAppCSSVars(miniApp, themeParams);
    // }, [miniApp, themeParams]);

    // useEffect(() => {
    //     return bindThemeParamsCSSVars(themeParams);
    // }, [themeParams]);

    useEffect(() => {
        return viewport && bindViewportCSSVars(viewport);
    }, [viewport]);

    // console.log(miniApp.isDark)
    return <AppRoot
        appearance={'dark'}
        platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
        className='w-screen'
    >
        <TopNav />
        {
            userInfo.status && rankingInfo.status ? <Outlet /> : <div className='flex flex-col items-center justify-center h-96'>
                {/* <OrbitProgress variant="dotted" dense color="#32cd32" size="large" text="Hunter" textColor="" /> */}
                <Loading />
            </div>
        }
        
        <Footer />
    </AppRoot>
};
