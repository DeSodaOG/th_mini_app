import { useIntegration } from '@telegram-apps/react-router-integration';
import {
  // bindMiniAppCSSVars,
  // bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initNavigator, 
  // useLaunchParams,
  // useMiniApp,
  // useThemeParams,
  useViewport,
} from '@telegram-apps/sdk-react';
// import { AppRoot } from '@telegram-apps/telegram-ui';
import { type FC, useEffect, useMemo } from 'react';
import {
  // Navigate,
  Route,
  Router,
  Routes,
} from 'react-router-dom';

// import { routes } from '@/navigation/routes.tsx';
import { Page } from '@/components/Page';
import { Home } from '@/pages/HomePage/Home';
import { Leaders } from '@/pages/LeadersPage/Leaders';
import { Dashboard } from '@/pages/DashboardPage/Dashboard';
import { Wiki } from '@/pages/WikiPage/Wiki';
import useFetchUserInfo from '@/hooks/useFetchUserInfo';
import useFetchRankingInfo from '@/hooks/useRankingInfo';
import { useInitData } from '@telegram-apps/sdk-react';
import { clickNewUser } from '@/utils/botUtils';

export const App: FC = () => {
  // const lp = useLaunchParams();
  // const miniApp = useMiniApp();
  const viewport = useViewport();
  // const themeParams = useThemeParams();

  // useEffect(() => {
  //   return bindMiniAppCSSVars(miniApp, themeParams);
  // }, [miniApp, themeParams]);

  // useEffect(() => {
  //   return bindThemeParamsCSSVars(themeParams);
  // }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  useFetchUserInfo()
  useFetchRankingInfo()

  // Create a new application navigator and attach it to the browser history, so it could modify
  // it and listen to its changes.
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);

  // Don't forget to attach the navigator to allow it to control the BackButton state as well
  // as browser history.
  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  const initData = useInitData();
  
  useEffect(() => {
    // declare the data fetching function
    const newClickUser = async () => {
      const newTime = new Date();
      await clickNewUser(initData?.user?.id.toString() ?? '0', newTime.toString(), initData?.startParam ?? '0');
    }
  
    // call the function
    newClickUser()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  return (
    <Router location={location} navigator={reactNavigator}>
        <Routes>
          <Route path="/" element={<Page />}>
            <Route index element={<Home />} />
            <Route path="leaders" element={<Leaders />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="wiki" element={<Wiki />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Router>
  );
};
