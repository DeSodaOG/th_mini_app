import {useDispatch, useSelector} from "react-redux";
import {
  clearAccountInfo,
  fetchUserInfo,
} from "../slices/userInfoSlice";
import {useEffect} from "react";
import { useInitData } from '@telegram-apps/sdk-react';
import { selectRefreshNum } from "@/slices/globalInfoSlice";

export default function useFetchUserInfo() {
  const dispatch: any = useDispatch();
  const userInfo = useInitData();
  const refreshNum = useSelector(selectRefreshNum);

  useEffect(() => {
    const refreshInfo = () => {
      dispatch(clearAccountInfo());
      console.log("useFetchUserInfo")

      if (userInfo?.user?.id){
        dispatch(fetchUserInfo(userInfo?.user?.id.toString()));
      }
    };

    refreshInfo();
    const timer = setInterval(refreshInfo, 600000);

    return () => {
      clearInterval(timer);
      console.log("clear useFetchUserInfo")
    };
  }, [userInfo, refreshNum]);
}
