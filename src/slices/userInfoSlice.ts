import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { BackendServer } from '@/servers/BackendServer';

interface UserInfo {
    id: string,
    tghandle: string,
    referrerid: string,
    parentreferrerid: string,
    affiliateamount: number,
    subaffiliateamount: number,
    createdat: string,
    updateat: string,
    score: number,
}

const initialState = {
  userInfo: {
    status: false,
    error: '',
    id: '',
    tgHandle: '',
    referrerID: '',
    parentReferrerID: '',
    affiliateAmount: 0,
    subAffiliateAmount: 0,
    score: 0,
    affiliates: [] as UserInfo[],
  },
  status: false
};

export const userInfoSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearAccountInfo: (state) => {
      state.userInfo.status = false;
      state.userInfo.id = '';
      state.userInfo.tgHandle = '';
      state.userInfo.referrerID = '';
      state.userInfo.parentReferrerID = '';
      state.userInfo.affiliateAmount = 0;
      state.userInfo.subAffiliateAmount = 0;
      state.userInfo.score = 0;
      state.userInfo.affiliates = [] as UserInfo[];
    }
  },

  extraReducers(builder) {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {

        state.status = true;
        state.userInfo.status = true;
        state.userInfo.id = action.payload.id;
        state.userInfo.tgHandle = action.payload.tgHandle;
        state.userInfo.referrerID = action.payload.referrerID;
        state.userInfo.parentReferrerID = action.payload.parentReferrerID;
        state.userInfo.affiliateAmount = action.payload.affiliateAmount;
        state.userInfo.subAffiliateAmount = action.payload.subAffiliateAmount;
        state.userInfo.score = action.payload.score;
        state.userInfo.affiliates = action.payload.affiliatesInfo;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.userInfo.status = false;
        state.userInfo.error = action.toString();
      })
  }
})

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async (tgID: string) => {
    const backendServer = new BackendServer();
    const baseInfo = await backendServer.getUserInfo(tgID);
    const affiliatesInfo = await backendServer.getUserAffiliatesInfo(tgID);
    
    return {
      id: baseInfo.id,
      tgHandle: baseInfo.tghandle,
      referrerID: baseInfo.referrerid,
      parentReferrerID: baseInfo.parentreferrerid,
      affiliateAmount: baseInfo.affiliateamount,
      subAffiliateAmount: baseInfo.subaffiliateamount,
      score: baseInfo.score,
      affiliatesInfo: affiliatesInfo
    }
});

export const { clearAccountInfo } = userInfoSlice.actions
export const selectUserInfo = (state: any) => state.user.userInfo

// export const selectWalletsInfoList = (state) => state.account.walletsInfo.list
export default userInfoSlice.reducer
