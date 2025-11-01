import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UserState {
  id: string | null
  email: string | null
  name: string | null
  jwt: string | null
  apiKey: string | null
  plan: "free" | "pro" | "enterprise"
  isAuthenticated: boolean
  theme: "light" | "dark" | "system"
}

const initialState: UserState = {
  id: null,
  email: null,
  name: null,
  jwt: null,
  apiKey: null,
  plan: "free",
  isAuthenticated: false,
  theme: "system",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload)
      state.isAuthenticated = !!action.payload.jwt
    },
    logout: (state) => {
      state.id = null
      state.email = null
      state.name = null
      state.jwt = null
      state.isAuthenticated = false
    },
    setTheme: (state, action: PayloadAction<"light" | "dark" | "system">) => {
      state.theme = action.payload
    },
    setApiKey: (state, action: PayloadAction<string>) => {
      state.apiKey = action.payload
    },
  },
})

export const { setUser, logout, setTheme, setApiKey } = userSlice.actions
export default userSlice.reducer
