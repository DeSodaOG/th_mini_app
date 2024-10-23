import {useDispatch} from "react-redux";
import {useEffect} from "react";
import { useInitData } from '@telegram-apps/sdk-react';
import { fetchRankingInfo } from "@/slices/rankingInfoSlice";

export default function useFetchRankingInfo() {
  const dispatch: any = useDispatch();
  const userInfo = useInitData();

  useEffect(() => {
    const refreshInfo = () => {
      console.log("useFetchRankingInfo")
      dispatch(fetchRankingInfo(userInfo?.user?.id.toString() ?? ''));
    };

    refreshInfo();
    const timer = setInterval(refreshInfo, 600000);

    return () => {
      clearInterval(timer);
      console.log("clear useFetchRankingInfo")
    };
  }, [userInfo]);
}
