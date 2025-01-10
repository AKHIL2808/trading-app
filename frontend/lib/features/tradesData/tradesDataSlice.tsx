
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


type tradeData = {
  price: string,
  quantity: string,
  timestamp: string
}


interface tradeValueType {
  tradeData: tradeData[] | []
  loading: boolean;
  error: string | null;
}



const initialState: tradeValueType = {
  tradeData: [],
  loading: true,
  error: null
}



export const fetchtradesByApi = createAsyncThunk(
  "price/fetchTrades",
  async (path: string) => {
    const response = await axios.get("/api/trades", {
      params: { path: path }
    });
    const relevantData = response.data.map((data, index) => {
      const date = new Date(data.timestamp)
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      const time = `${hours}:${minutes}:${seconds}`;
      return {
        price: data.price,
        quantity: data.quantity,
        timestamp: time
      }
    })
    console.log(relevantData)
    return relevantData
  });



// const tradeDataSlice = createSlice({
//   name: "fetchTrade",
//   initialState,
//   reducers: {
//     setTradesData: (state, action) => {
//       state.tradeData.push(action.payload)
//       state.tradeData.shift()
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchtradesByApi.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchtradesByApi.fulfilled, (state, action) => {
//         state.tradeData = action.payload
//         state.loading = false;
//       })
//       .addCase(fetchtradesByApi.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to fetch price';
//       })
//   },
// })

const tradeDataSlice = createSlice({
  name: "fetchTrade",
  initialState,
  reducers: {
    setTradesData: (state, action) => {
      state.tradeData = [...state.tradeData.slice(1), action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchtradesByApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchtradesByApi.fulfilled, (state, action) => {
        state.tradeData = action.payload;
        state.loading = false;
      })
      .addCase(fetchtradesByApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch price";
      });
  },
});

export const { setTradesData } = tradeDataSlice.actions
export default tradeDataSlice.reducer
