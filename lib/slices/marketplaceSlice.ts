import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface MarketplaceAgent {
  id: string
  name: string
  description: string
  category: string
  rating: number
  downloads: number
  price: number
  isPaid: boolean
  avatar?: string
  createdBy: string
}

interface MarketplaceState {
  agents: MarketplaceAgent[]
  filteredAgents: MarketplaceAgent[]
  selectedCategory: string | null
}

const initialState: MarketplaceState = {
  agents: [],
  filteredAgents: [],
  selectedCategory: null,
}

const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {
    setMarketplaceAgents: (state, action: PayloadAction<MarketplaceAgent[]>) => {
      state.agents = action.payload
      state.filteredAgents = action.payload
    },
    filterByCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload
      if (action.payload === null || action.payload === "all") {
        state.filteredAgents = state.agents
      } else {
        state.filteredAgents = state.agents.filter((a) => a.category.toLowerCase() === action.payload?.toLowerCase())
      }
    },
    searchAgents: (state, action: PayloadAction<string>) => {
      const query = action.payload.toLowerCase()
      state.filteredAgents = state.agents.filter(
        (a) => a.name.toLowerCase().includes(query) || a.description.toLowerCase().includes(query),
      )
    },
  },
})

export const { setMarketplaceAgents, filterByCategory, searchAgents } = marketplaceSlice.actions
export default marketplaceSlice.reducer
