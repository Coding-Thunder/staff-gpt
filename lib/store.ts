import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import agentsReducer from "./slices/agentsSlice"
import chatReducer from "./slices/chatSlice"
import marketplaceReducer from "./slices/marketplaceSlice"
import builderReducer from "./slices/builderSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    agents: agentsReducer,
    chat: chatReducer,
    marketplace: marketplaceReducer,
    builder: builderReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
