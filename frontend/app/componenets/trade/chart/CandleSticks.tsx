




"use client";

import { useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchKlinesByApi, setRenderEffect } from "@/lib/features/klinesData/klinesDataSlice";
import { webSocketManager } from "@/app/utils/webSocketManager";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function CandleSticks({ path }: { path: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const histogramRef = useRef<HTMLDivElement>(null);

  const loading = useAppSelector((state) => state.klinesData.loading);
  const candlestickData = useAppSelector((state) => state.klinesData.candleData);
  const histogramData = useAppSelector((state) => state.klinesData.histogramData);
  const renderEffect = useAppSelector((state) => state.klinesData.runEffect);

  const candlestickSeriesRef = useRef<any>(null);
  const histogramSeriesRef = useRef<any>(null);

  const dispatch = useAppDispatch();

  // Fetch initial data on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      await dispatch(fetchKlinesByApi(path));
    };
    fetchInitialData();
  }, [path, dispatch]);

  // Initialize charts
  useEffect(() => {
    if (loading || !containerRef.current || !histogramRef.current) return;

    const candleChart = createChart(containerRef.current, {
      layout: {
        textColor: "white",
        background: { color: "#0e0f14" },
      },
      grid: {
        horzLines: { visible: false },
        vertLines: { visible: false },
      },
      crosshair: { mode: CrosshairMode.Normal },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    candlestickSeriesRef.current = candleChart.addCandlestickSeries({
      upColor: "#00FF0D",
      downColor: "#f70505",
      wickUpColor: "#00FF0D",
      wickDownColor: "#f70505",
    });
    candlestickSeriesRef.current.setData(candlestickData);
    candleChart.timeScale().fitContent();

    const histogramChart = createChart(histogramRef.current, {
      layout: {
        textColor: "white",
        background: { color: "#0e0f14" },
      },
      grid: {
        horzLines: { visible: false },
        vertLines: { visible: false },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    histogramSeriesRef.current = histogramChart.addHistogramSeries({
      color: "#00FF0D",
    });
    histogramSeriesRef.current.setData(histogramData);
    histogramChart.timeScale().fitContent();

    dispatch(setRenderEffect(true));

    // Cleanup on unmount
    return () => {
      candleChart.remove();
      histogramChart.remove();
    };
  }, [loading, candlestickData, histogramData, dispatch]);

  // Handle WebSocket updates
  useEffect(() => {
    if (!renderEffect || !candlestickSeriesRef.current || !histogramSeriesRef.current) return;

    const webSocket = webSocketManager.getInstance();
    // console.log("WebSocket initialized");

    webSocket.registerCallback(
      "kline",
      (data) => {
        // console.log("WebSocket data received:", data);
        candlestickSeriesRef.current.update(data.newCandle);
        histogramSeriesRef.current.update(data.newHistogram);
      },
      `KLINE${path}`
    );

    webSocket.sendMessage({
      method: "SUBSCRIBE",
      params: [`kline.1d.${path}`],
    });

    return () => {
      webSocket.deRegisterCallback("kline", `KLINE${path}`);
      webSocket.sendMessage({
        method: "UNSUBSCRIBE",
        params: [`kline.1d.${path}`],
      });
    };
  }, [renderEffect, path]);

  if (candlestickData.length === 0) {
    return (
      <div className="w-full h-full">
        <Skeleton
          className="w-full h-full animate-pulse rounded-md"
          baseColor="rgba(32, 33, 39, 0.8)" // Base color for the skeleton background
          highlightColor="rgba(32, 33, 39, 0.4)" // Highlight color for the shimmer
          style={{
            backgroundColor: "rgba(32, 33, 39, 1)", // Ensures the background matches
            borderRadius: "8px", // Optional: Rounded corners
          }}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-rows-3">
      <div ref={containerRef} className="row-span-2"></div>
      <div ref={histogramRef} className="row-span-1"></div>
    </div>
  );
}
