import { createSlice } from '@reduxjs/toolkit'

export const globalParamsSlice = createSlice({
  name: 'globalParams',
  initialState: {
    referral: "",
    refreshNum: 0,

  },
  reducers: {
    setReferral: (state, action) => {
      state.referral = action.payload;
    },
    setRefreshNum: (state) => {
        state.refreshNum += 1;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setReferral, setRefreshNum } = globalParamsSlice.actions
export const selectReferral = (state: { globalParams: { referral: any; }; }) => state.globalParams.referral;
export const selectRefreshNum = (state: { globalParams: { refreshNum: any; }; }) => state.globalParams.refreshNum;
export default globalParamsSlice.reducer
