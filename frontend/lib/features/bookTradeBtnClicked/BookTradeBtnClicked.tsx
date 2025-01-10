

import { createSlice } from '@reduxjs/toolkit'

export interface bookTradeBtnClickedState {
  value: string
}

const initialState: bookTradeBtnClickedState = {
  value: "Book",
}

export const bookTradeBtnClickedSlice = createSlice({
  name: 'bookTradeBtnClicked',
  initialState,
  reducers: {
    setBook: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = "Book"
    },
    setTrade: (state) => {
      state.value = "Trade"
    },
  },
})

// Action creators are generated for each case reducer function
export const { setBook, setTrade } = bookTradeBtnClickedSlice.actions

export default bookTradeBtnClickedSlice.reducer
