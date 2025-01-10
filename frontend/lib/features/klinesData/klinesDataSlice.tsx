
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface klinesResponseType {
  close: string,
  end: string,
  high: string,
  low: string,
  open: string,
  quoteVolume: string,
  start: string,
  trades: string,
  volume: string
}


interface CandleDataType {
  close: number;
  high: number;
  low: number;
  open: number;
  time: number;
}

interface HistogramDataType {
  value: number;
  time: number;
  color?: string;
}

interface candleStickDataType {
  klineData: klinesResponseType[],
  candleData: CandleDataType[],
  histogramData: HistogramDataType[],
  runEffect: boolean,
  lastData: CandleDataType | null,
  loading: boolean,
  error: string | null
}

const initialState: candleStickDataType = {
  klineData: [],
  lastData: null,
  candleData: [],
  histogramData: [],
  runEffect: false,
  loading: true,
  error: ""
}

export const fetchKlinesByApi = createAsyncThunk(
  "klines/fetchKlines",
  async (symbol: string) => {
    const startTime = Math.floor((new Date().getTime() - 1000 * 60 * 60 * 24 * 90) / 1000)
    const response = await axios.get("/api/klines", {
      params: { path: symbol, start: startTime }
    })
    const allKlines = response.data

    const candlestickData: CandleDataType[] = allKlines.map((x, index) => {
      return (
        {
          key: index,
          close: Number(x.close),
          high: Number(x.high),
          low: Number(x.low),
          open: Number(x.open),
          time: x.end.split(" ")[0]
        }
      )
    })
    let volumeValue = 0
    const histogramData: HistogramDataType[] = allKlines.map((data, index) => {
      if (Number(data.volume) > volumeValue) {
        volumeValue = Number(data.volume)
        return (
          {
            key: index,
            value: Number(data.volume),
            time: data.end.split(" ")[0]
          }
        )
      } else {
        volumeValue = Number(data.volume)
        return (
          {
            key: index,
            value: Number(data.volume),
            time: data.end.split(" ")[0],
            color: "#f70505"
          }
        )
      }
    })
    const lastData = candlestickData[candlestickData.length - 1]
    console.log(lastData)
    return ({ allKlines: allKlines, candlestickData: candlestickData, histogramData: histogramData, lastData: lastData })
  }
)


const klinesDataSlice = createSlice({
  name: "fetchKlines",
  initialState,
  reducers: {
    setRenderEffect: (state, action) => {
      state.runEffect = action.payload
    }
  },
  extraReducers(builder) {

    builder
      .addCase(fetchKlinesByApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKlinesByApi.fulfilled, (state, action) => {
        state.klineData = action.payload.allKlines
        state.candleData = action.payload.candlestickData
        state.histogramData = action.payload.histogramData
        state.lastData = action.payload.lastData
        state.loading = false;
      })
      .addCase(fetchKlinesByApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch price';
      })
  },
})
export const { setRenderEffect } = klinesDataSlice.actions
export default klinesDataSlice.reducer 
