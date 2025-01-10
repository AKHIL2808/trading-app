
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import generateFirstBidsTable from "@/app/utils/generateFirstBidsTable";

type depthData = {
  asks: string[][],
  bids: string[][]
}


interface depthValueType {
  depthData: depthData | []
  onlyBidsTable: string[][] | number[][] | []
  bidsTable: number[][]
  loading: boolean;
  error: string | null;
}



const initialState: depthValueType = {
  depthData: [],
  onlyBidsTable: [],
  bidsTable: [],
  loading: true,
  error: null
}



export const fetchDepthByApi = createAsyncThunk(
  "price/fetchDepth",
  async (path: string) => {
    const response = await axios.get("/api/depth", {
      params: { path: path }
    });
    const firstBid = generateFirstBidsTable(response.data.bids)
    return ({ bids: firstBid, fullAsks: response.data })
  });



const fullBidsTableSlice = createSlice({
  name: "fetchDepth",
  initialState,
  reducers: {
    setTheBidsTable: (state, action) => {
      state.bidsTable = action.payload
    },
    setOnlyBidsTable: (state, action) => {
      state.onlyBidsTable = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepthByApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepthByApi.fulfilled, (state, action) => {
        state.depthData = action.payload.fullAsks;
        state.bidsTable = action.payload.bids
        state.onlyBidsTable = action.payload.fullAsks.bids
        state.loading = false;
      })
      .addCase(fetchDepthByApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch price';
      })


  },

})


export const { setOnlyBidsTable, setTheBidsTable } = fullBidsTableSlice.actions
export default fullBidsTableSlice.reducer
