
import { createSlice } from '@reduxjs/toolkit'

export interface limitMarketBtnClickedState {
  value: string
}

const initialState: limitMarketBtnClickedState = {
  value: "Limit",
}

export const limitMarketBtnClickedSlice = createSlice({
  name: 'limitMarketBtnClicked',
  initialState,
  reducers: {
    setLimit: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = "Limit"
    },
    setMarket: (state) => {
      state.value = "Market"
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLimit, setMarket } = limitMarketBtnClickedSlice.actions

export default limitMarketBtnClickedSlice.reducer
