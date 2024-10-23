import { createSlice } from '@reduxjs/toolkit'

export const globalParamsSlice = createSlice({
  name: 'globalParams',
  initialState: {
    referral: "",
    isLoading: true,

  },
  reducers: {
    setReferral: (state, action) => {
      state.referral = action.payload;
    },
    setIsLoading: (state, action) => {
        state.isLoading = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setReferral, setIsLoading } = globalParamsSlice.actions
export const selectReferral = (state: { globalParams: { referral: any; }; }) => state.globalParams.referral;
export const selectIsLoading = (state: { globalParams: { isLoading: any; }; }) => state.globalParams.isLoading;
export default globalParamsSlice.reducer
