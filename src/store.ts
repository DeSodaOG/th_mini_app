import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userInfoSlice'
import globalParamsReducer from './slices/globalInfoSlice'
import rankingReducer from './slices/rankingInfoSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    globalParams: globalParamsReducer,
    ranking: rankingReducer
  },
  
  middleware: (getDefaultMiddleware: (arg0: { serializableCheck: boolean }) => any) => getDefaultMiddleware({ serializableCheck: false }),
});
