

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface calculateInputValueState {
  price: number
  quantity: number
  orderValue: string
}


const initialState: calculateInputValueState = {
  price: 0,
  quantity: 0,
  orderValue: ""
}

export const calculateInputValueSlice = createSlice({
  name: 'calculateInputValue',
  initialState,
  reducers: {
    setOrderValue: (state, action: PayloadAction<number | undefined>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if (action.payload !== undefined) {
        state.orderValue = String(action.payload)
        state.quantity = Math.round((Number(state.orderValue) / state.price) * 100) / 100
      } else {
        const value = Math.round((state.price * state.quantity) * 100) / 100
        state.orderValue = String(value)
      }
      console.log("order")
    },
    setPrice: (state, action) => {
      const newPrice = action.payload
      console.log(newPrice)
      state.price = newPrice
    },
    setQuantity: (state, action) => {
      const newQuantity = action.payload
      console.log(newQuantity)
      state.quantity = newQuantity
    }
  },
})

// Action creators are generated for each case reducer function
export const { setOrderValue, setPrice, setQuantity } = calculateInputValueSlice.actions

export default calculateInputValueSlice.reducer
