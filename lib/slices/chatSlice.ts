import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Message {
  id: string
  agentId: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

interface ChatState {
  messages: Message[]
  currentAgentId: string | null
  isLoading: boolean
}

const initialState: ChatState = {
  messages: [],
  currentAgentId: null,
  isLoading: false,
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload)
    },
    setCurrentAgentId: (state, action: PayloadAction<string>) => {
      state.currentAgentId = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    clearChat: (state) => {
      state.messages = []
      state.currentAgentId = null
    },
  },
})

export const { setMessages, addMessage, setCurrentAgentId, setIsLoading, clearChat } = chatSlice.actions
export default chatSlice.reducer
