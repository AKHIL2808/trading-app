"use client";

import { webSocketManager } from "@/app/utils/webSocketManager";
import { fetchtradesByApi, setTradesData } from "@/lib/features/tradesData/tradesDataSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function TradesTable({ path }: { path: string }) {
  const tradeData = useAppSelector((state) => state.tradesData.tradeData);
  const loading = useAppSelector((state) => state.tradesData.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchInitialData() {
      await dispatch(fetchtradesByApi(path));
    }
    fetchInitialData();
  }, [path, dispatch]);

  useEffect(() => {
    if (loading) return;
    const webSocket = webSocketManager.getInstance();
    webSocket.registerCallback(
      "trade",
      (data) => {
        dispatch(setTradesData({
          price: data?.price ?? " ",
          quantity: data?.quantity ?? " ",
          timestamp: data?.timestamp ?? " ",
        }));
      },
      `TRADE${path}`
    );

    webSocket.sendMessage({
      method: "SUBSCRIBE",
      params: [`trade.${path}`],
    });

    return () => {
      webSocket.deRegisterCallback("trade", `TRADE${path}`);
      webSocket.sendMessage({
        method: "UNSUBSCRIBE",
        params: [`trade.${path}`],
      });
    };
  }, [path, loading]);

  if (loading) {
    return (
      <div className="w-full h-screen">
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

  if (tradeData.length === 0) {
    return <div>No trade data available.</div>;
  }

  return (
    <div>
      {tradeData
        .slice()
        .reverse()
        .map((data, index, arr) => {
          // Compare with the next element in the reversed array
          const isIncreasing = index < arr.length - 1 && data.price > arr[index + 1]?.price;

          return (
            <div
              key={index}
              className="grid grid-cols-3"
            >
              <div className={`flex justify-center items-center ${isIncreasing ? "text-radium-green/100" : "text-radium-red/100"}`}>{data.price}</div>
              <div className="flex justify-center items-center">{data.quantity}</div>
              <div className="flex justify-center items-center">{data.timestamp}</div>
            </div>
          );
        })}
    </div>
  );
}
