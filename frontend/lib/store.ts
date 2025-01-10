import { configureStore } from '@reduxjs/toolkit'
import buySellBtnClickedReducer from "./features/buySellBtnClicked/buySellBtnClickedSlice";
import limitMarketBtnClickedReducer from "./features/limitMarketBtnClicked/limitMarketBtnClickedSlice";
import calculateInputValueReducer from "./features/calculateInputValue/calculateInputValueSlice"
import tickerReducer from "./features/tickerPrice/tickerPriceSlice"
import fullAskTableReducer from "./features/fullAskTable/FullAskTableSlice"
import fullBidsTableReducer from "./features/fullBidsTable/FullBidsTableSlice"
import klinesDataReducer from "./features/klinesData/klinesDataSlice"
import bookTradeBtnClickedReduer from "./features/bookTradeBtnClicked/BookTradeBtnClicked"
import tradesDataReducer from './features/tradesData/tradesDataSlice';
export const makeStore = () => {
  return configureStore({
    reducer: {
      buySellBtnClicked: buySellBtnClickedReducer,
      limitMarketBtnClicked: limitMarketBtnClickedReducer,
      calculateInputValue: calculateInputValueReducer,
      fetchTickerValue: tickerReducer,
      fullAskTable: fullAskTableReducer,
      fullBidsTable: fullBidsTableReducer,
      klinesData: klinesDataReducer,
      bookTradeBtnClicked: bookTradeBtnClickedReduer,
      tradesData: tradesDataReducer,
    },
    middleware: (getDeaultMiddleware) =>
      getDeaultMiddleware({
        serializableCheck: false,
      })
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
