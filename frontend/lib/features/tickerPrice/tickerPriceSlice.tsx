import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface apiResponseType {
  firstPrice: string;
  high: string;
  lastPrice: string;
  low: string;
  priceChange: string;
  priceChangePercent: string;
  quoteVolume: string;
  symbol: string;
  trades: string;
  volume: string;
}
interface tickerValueType {
  tickerData: apiResponseType | null
  loading: boolean;
  error: string | null;
}
const initialState: tickerValueType = {
  tickerData: null,
  loading: false,
  error: null
}

// export const fetchPriceByApi = createAsyncThunk(
//   "price/fetchPrice",
//   async (symbol: string) => {
//     const response = await axios.get("/api/proxy")
//     console.log(response.data)
//     const coinValue: apiResponseType = response.data.find((coin) => coin.symbol === symbol)
//     console.log(coinValue)
//     return coinValue
//   }
// )


export const fetchPriceByApi = createAsyncThunk(
  "price/fetchPrice",
  async (symbol: string) => {
    // console.log("hiii")
    // console.log(symbol)
    console.log("in ticker fetch")
    const response = await axios.get("/api/ticker");
    // console.log('Requested symbol:', symbol);
    // console.log('API Response:', response.data);
    console.log("response from api of ticker")
    console.log(response.data)
    const coinValue: apiResponseType = response.data.find(
      (coin: apiResponseType) => coin.symbol.toLowerCase() === symbol.toLowerCase()
    );
    console.log("action performed in ticker")
    console.log(coinValue)
    if (!coinValue) {
      throw new Error(`Coin with symbol '${symbol}' not found`);
    }

    return coinValue;
  }
);


const tickerSlice = createSlice({
  name: "fetchTicker",
  initialState,
  reducers: {
    setTickerData: (state, action) => {
      state.tickerData = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriceByApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPriceByApi.fulfilled, (state, action) => {
        state.loading = false;
        state.tickerData = action.payload;
      })
      .addCase(fetchPriceByApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch price';
      });
  },

})

export const { setTickerData } = tickerSlice.actions
export default tickerSlice.reducer
