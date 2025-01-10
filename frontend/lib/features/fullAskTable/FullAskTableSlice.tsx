//
// import { createSlice } from "@reduxjs/toolkit"
//
// interface fullAskTableType {
//   fullAskTable: string[][] | [],
// }
//
// const initialState: fullAskTableType = {
//   fullAskTable: [],
// }
//
//
// const fullAskTableSlice = createSlice({
//   name: "fullAskTable",
//   initialState,
//   reducers: {
//     setFullAsksTable: (state, action) => {
//       state.fullAskTable = action.payload
//     },
//   },
// })
//
//
// export const { setFullAsksTable } = fullAskTableSlice.actions
// export default fullAskTableSlice.reducer



// import { useAppDispatch } from "@/lib/hooks";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { setAsksTable, setBidsTable } from "../depth/depthSlice";
import { generateFirstAsksTable } from "@/app/utils/generateFirstAsksTable";
// import generateFirstBidsTable from "@/app/utils/generateFirstBidsTable";
// import { generateUpdatedAsksTable } from "@/app/utils/generateUpdatedAsksTable";

type depthData = {
  asks: string[][],
  bids: string[][]
}

interface depthValueType {
  depthData: depthData | []
  onlyAskTable: string[][] | number[][] | []
  // onlyBidsTable: string[][] | number[][] | []
  askTable: number[][]
  // bidsTable: number[][]
  loading: boolean;
  error: string | null;
}
const initialState: depthValueType = {
  depthData: [],
  onlyAskTable: [],
  // onlyBidsTable: [],
  askTable: [],
  // bidsTable: [],
  loading: true,
  error: null
}


export const fetchDepthByApi = createAsyncThunk(
  "price/fetchDepth",
  async (path: string) => {
    // console.log("in fetch")
    // console.log(path)
    // console.log("hiii")
    // console.log(symbol)
    const response = await axios.get("/api/depth", {
      params: { path: path }
    });
    // console.log("api response")
    // console.log(response.data)
    // console.log('Requested symbol:', symbol);
    // console.log('API Response:', response.data);
    // const mappedAsksArray: number[][] = new Map(response.data.asks.map(([price, quantity]: string[]) => [Number(price), Number(quantity)]))
    const firstAsk = generateFirstAsksTable(response.data.asks)
    // const firstBid = generateFirstBidsTable(response.data.bids)
    // console.log("first ask")
    // console.log(firstAsk)
    // const dispatch = useAppDispatch()
    // dispatch(setAsksTable(response.data.asks))
    // dispatch(setBidsTable(response.data.bids))
    // console.log("api response")
    // console.log(response.data)
    return ({ asks: firstAsk, fullAsks: response.data })
  });


// export const updateAsksTableWithApi = createAsyncThunk(
//   "price/updateAsksTableWithApi",
//   async ({ updatedAsks, path }: { updatedAsks: string[][], path: string }, { getState }) => {
//     const response = await axios.get("/api/depth", { params: { path } });
//     const { asks } = response.data;
//
//     const state: any = getState(); // Replace `any` with proper RootState type if available
//     const currentAsksTable = state.fullAskTable.askTable;
//     console.log("current ask before generate")
//     console.log(currentAsksTable)
//
//     const updatedTable = generateUpdatedAsksTable(updatedAsks, currentAsksTable);
//     return updatedTable;
//   }
// );
const fullAskTableSlice = createSlice({
  name: "fetchDepth",
  initialState,
  reducers: {
    setTheAskTable: (state, action) => {
      console.log("updated")
      state.askTable = action.payload
    },
    setOnlyAskTable: (state, action) => {
      state.onlyAskTable = action.payload
    },
    // setTheBidsTable: (state, action) => {
    //   state.bidsTable = action.payload
    // },
    // setOnlyBidsTable: (state, action) => {
    //   state.onlyBidsTable = action.payload
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepthByApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepthByApi.fulfilled, (state, action) => {
        state.depthData = action.payload.fullAsks;
        state.askTable = action.payload.asks
        // state.bidsTable = action.payload.bids
        state.onlyAskTable = action.payload.fullAsks.asks
        // state.onlyBidsTable = action.payload.fullAsks.bids
        // console.log(`onlyAskTable : ${state.onlyAskTable.length}`)
        // console.log("depth")
        // console.log(state.depthData)
        state.loading = false;
      })
      .addCase(fetchDepthByApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch price';
      })
    // .addCase(updateAsksTableWithApi.fulfilled, (state, action) => {
    //   state.askTable = action.payload;
    // });
  },

})
export const { setTheAskTable, setOnlyAskTable } = fullAskTableSlice.actions
export default fullAskTableSlice.reducer
