import {useDispatch} from "react-redux";
import {
  fetchUserInfo,
} from "../slices/userInfoSlice";
import {useEffect} from "react";
import { useInitData } from '@telegram-apps/sdk-react';

export default function useFetchUserInfo() {
  const dispatch: any = useDispatch();
  const userInfo = useInitData();

  useEffect(() => {
    const refreshInfo = () => {
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
  }, [userInfo]);
}
