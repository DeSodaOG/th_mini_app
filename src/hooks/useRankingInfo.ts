import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import { useInitData } from '@telegram-apps/sdk-react';
import { fetchRankingInfo } from "@/slices/rankingInfoSlice";
import { selectRefreshNum } from "@/slices/globalInfoSlice";

export default function useFetchRankingInfo() {
  const dispatch: any = useDispatch();
  const userInfo = useInitData();
  const refreshNum = useSelector(selectRefreshNum);

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
  }, [userInfo, refreshNum]);
}
