import { createSlice } from '@reduxjs/toolkit'

export interface BuysellBtnClickedState {
  value: boolean
}

const initialState: BuysellBtnClickedState = {
  value: true,
}

export const buySellBtnClickedSlice = createSlice({
  name: 'buySellBtnClicked',
  initialState,
  reducers: {
    setTrue: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true
    },
    setFalse: (state) => {
      state.value = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTrue, setFalse } = buySellBtnClickedSlice.actions

export default buySellBtnClickedSlice.reducer
