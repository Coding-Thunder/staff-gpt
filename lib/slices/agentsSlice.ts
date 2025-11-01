import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Agent {
  id: string
  name: string
  role: string
  description: string
  personality: string
  status: "active" | "inactive" | "pending"
  lastActive: string
  conversationCount: number
  tasksCompleted: number
  avatar?: string
}

interface AgentsState {
  list: Agent[]
  selectedAgent: Agent | null
  loading: boolean
}

const initialState: AgentsState = {
  list: [],
  selectedAgent: null,
  loading: false,
}

const agentsSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    setAgents: (state, action: PayloadAction<Agent[]>) => {
      state.list = action.payload
    },
    addAgent: (state, action: PayloadAction<Agent>) => {
      state.list.push(action.payload)
    },
    updateAgent: (state, action: PayloadAction<Agent>) => {
      const index = state.list.findIndex((a) => a.id === action.payload.id)
      if (index !== -1) {
        state.list[index] = action.payload
      }
    },
    deleteAgent: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((a) => a.id !== action.payload)
    },
    selectAgent: (state, action: PayloadAction<Agent>) => {
      state.selectedAgent = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setAgents, addAgent, updateAgent, deleteAgent, selectAgent, setLoading } = agentsSlice.actions
export default agentsSlice.reducer
