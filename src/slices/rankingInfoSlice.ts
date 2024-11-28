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
    ranking: number,
}

const initialState = {
  rankingInfo: [] as UserInfo[],
  userRank: "100+",
  status: false,
  error: ''
};

export const userInfoSlice = createSlice({
  name: 'ranking',
  initialState,
  reducers: {
    clearRankingInfo: (state) => {
      state.rankingInfo = [] as UserInfo[];
    }
  },

  extraReducers(builder) {
    builder
      .addCase(fetchRankingInfo.fulfilled, (state, action) => {
        state.status = true;
        state.rankingInfo = action.payload.userInfo;
        state.userRank = action.payload.ranking < 0 ? "100+": action.payload.ranking.toString();
      })
      .addCase(fetchRankingInfo.rejected, (state, action) => {
        state.status = false;
        state.error = action.toString();
      })
  }
})

export const fetchRankingInfo = createAsyncThunk('user/fetchRankingInfo', async (tgID: string) => {
    const backendServer = new BackendServer();
    const userInfo = await backendServer.getAllUsers();

    let index = 0
    let lastRanking = 0;
    let lastScore = 0;
    let userRanking = -1;

    userInfo.map((x: any) => {
      index += 1;
      if (lastScore !== x.score) {
        lastRanking = index;
      }

      lastScore = x.score
      x.ranking = lastRanking;

      if (x.id.toString() === tgID) {
        userRanking = lastRanking
      }
    })
    // console.log(userInfo)
    return {
      ranking: userRanking,
      userInfo
    };
});

export const { clearRankingInfo } = userInfoSlice.actions
export const selectRankingInfo = (state: any) => state.ranking
export const selectUserRanking = (state: any) => state.ranking.userRank
// export const selectWalletsInfoList = (state) => state.account.walletsInfo.list
export default userInfoSlice.reducer
