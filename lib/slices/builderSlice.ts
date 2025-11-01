import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface DraftAgent {
  id: string
  name: string
  role: string
  personality: string
  goals: string[]
  rules: string[]
  description: string
}

interface BuilderState {
  draft: DraftAgent | null
  savedDrafts: DraftAgent[]
}

const initialState: BuilderState = {
  draft: null,
  savedDrafts: [],
}

const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    createDraft: (state, action: PayloadAction<Partial<DraftAgent>>) => {
      state.draft = {
        id: Date.now().toString(),
        name: "",
        role: "",
        personality: "",
        goals: [],
        rules: [],
        description: "",
        ...action.payload,
      }
    },
    updateDraft: (state, action: PayloadAction<Partial<DraftAgent>>) => {
      if (state.draft) {
        Object.assign(state.draft, action.payload)
      }
    },
    saveDraft: (state) => {
      if (state.draft) {
        const exists = state.savedDrafts.findIndex((d) => d.id === state.draft?.id)
        if (exists !== -1) {
          state.savedDrafts[exists] = state.draft
        } else {
          state.savedDrafts.push(state.draft)
        }
      }
    },
    loadDraft: (state, action: PayloadAction<string>) => {
      state.draft = state.savedDrafts.find((d) => d.id === action.payload) || null
    },
    clearDraft: (state) => {
      state.draft = null
    },
  },
})

export const { createDraft, updateDraft, saveDraft, loadDraft, clearDraft } = builderSlice.actions
export default builderSlice.reducer
