








// "use client";
//
//
// // import generateUpdatedAsksTable from "@/app/utils/generateUpdatedAsksTable";
// import { webSocketManager } from "@/app/utils/webSocketManager";
// import { fetchDepthByApi, setOnlyAskTable, setTheAskTable } from "@/lib/features/fullAskTable/FullAskTableSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import { useEffect, useRef, useState } from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
//
// interface WebSocketDataType {
//   updatedAsks: string[][];
//   updatedBids: string[][];
// }
//
// export default function AsksTable({ path }: { path: string }) {
//   const dispatch = useAppDispatch();
//   const asks = useAppSelector((state) => state.fullAskTable.askTable);
//   const onlyAsks = useAppSelector((state) => state.fullAskTable.onlyAskTable)
//   const globalLoading = useAppSelector((state) => state.fullAskTable.loading)
//   // console.log(loading)
//   // const [isWebSocketInitialized, setIsWebSocketInitialized] = useState(false);
//   const [localLoading, setLocalLoading] = useState(true);
//
//   const workerRef = useRef<Worker>();
//   // Fetch initial data
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       await dispatch(fetchDepthByApi(path));
//       // setIsWebSocketInitialized(true);
//       setLocalLoading(false);
//     };
//
//     fetchInitialData();
//   }, [dispatch, path]);
//
//   // WebSocket logic
//   useEffect(() => {
//     if (globalLoading) return;
//     setLocalLoading(false)
//
//     const webSocket = webSocketManager.getInstance();
//
//     workerRef.current = new Worker(new URL("./generateUpdatedAsksTable.ts", import.meta.url));
//     webSocket.registerCallback("depth", (data: WebSocketDataType) => {
//       // console.log(`asks to update : ${data.updatedAsks}`)
//       // console.log("in websocket")
//       workerRef.current.postMessage({
//         updateValues: data.updatedAsks,
//         askTableFull: onlyAsks,
//       });
//       // const updatedAsks = generateUpdatedAsksTable(data.updatedAsks, onlyAsks);
//       // console.log(`updated asks table from websocket : ${updatedAsks}`)
//
//       workerRef.current.onmessage = (message) => {
//         const { updatedFullAsks, updatedAsks } = message.data;
//         // console.log("updated", message.data)
//         dispatch(setOnlyAskTable(updatedFullAsks))
//         dispatch(setTheAskTable(updatedAsks));
//       }
//       // console.log("generated")
//     }, `DEPTH_${path}`);
//
//     webSocket.sendMessage({ method: "SUBSCRIBE", params: [`depth.200ms.${path}`] });
//
//     return () => {
//       webSocket.deRegisterCallback("depth", `DEPTH_${path}`);
//       webSocket.sendMessage({ method: "UNSUBSCRIBE", params: [`depth.200ms.${path}`] });
//       workerRef.current?.terminate();
//     };
//   }, [globalLoading, dispatch, path, asks]);
//
//   if (localLoading || !asks || asks.length === 0) {
//     // Skeleton loader when data is not yet available
//     return (
//       <div className="w-full h-64">
//         <Skeleton
//           className="w-full h-full animate-pulse rounded-md"
//           baseColor="rgba(32, 33, 39, 0.8)" // Base color for the skeleton background
//           highlightColor="rgba(32, 33, 39, 0.6)" // Highlight color for the shimmer
//           style={{
//             backgroundColor: "rgba(32, 33, 39, 1)", // Ensures the background matches
//             borderRadius: "8px", // Optional: Rounded corners
//           }}
//         />
//       </div>
//     );
//   }
//
//   const maxAsk = asks[0][2];
//
//   return (
//     <div>
//       {asks.map((row, i) => (
//         <div key={i} className="grid relative w-full bg-transparent overflow-hidden">
//           <div
//             className="absolute top-0 right-0 h-full bg-radium-red/15"
//             style={{
//               width: `${(100 * asks[i][2]) / maxAsk}%`,
//               transition: "width 0.3s ease-in-out",
//             }}
//           ></div>
//           <div className="grid grid-cols-3">
//             {row.map((cell, j) => (
//               <div
//                 key={j}
//                 className={`col-span-1 flex justify-center items-center ${j === 0 ? "text-radium-red/100" : "text-white"
//                   }`}
//               >
//                 {cell}
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
//
//
//



"use client";

// import generateUpdatedBidsTable from "@/app/utils/generateUpdatedBidsTable";
import { webSocketManager } from "@/app/utils/webSocketManager";
import { fetchDepthByApi, setOnlyAskTable, setTheAskTable } from "@/lib/features/fullAskTable/FullAskTableSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface WebSocketDataType {
  updatedAsks: string[][];
  updatedBids: string[][];
}

export default function AsksTable({ path }: { path: string }) {
  const dispatch = useAppDispatch();
  const asks = useAppSelector((state) => state.fullAskTable.askTable);
  const onlyAsks = useAppSelector((state) => state.fullAskTable.onlyAskTable);
  const loading = useAppSelector((state) => state.fullBidsTable.loading);

  const [localLoading, setLocalLoading] = useState(true);

  const workerRef = useRef<Worker>();
  useEffect(() => {
    const fetchInitialData = async () => {
      await dispatch(fetchDepthByApi(path));

      setLocalLoading(false);
    };

    fetchInitialData();
  }, [dispatch, path]);

  useEffect(() => {
    if (loading) return;

    setLocalLoading(false)
    const webSocket = webSocketManager.getInstance();

    workerRef.current = new Worker(new URL("./generateUpdatedAsksTable.ts", import.meta.url));
    webSocket.registerCallback("depth", (data: WebSocketDataType) => {
      workerRef.current.postMessage({
        updateValues: data.updatedAsks,
        askTableFull: onlyAsks,
      });

      workerRef.current.onmessage = (message) => {
        const { updatedFullAsks, updatedAsks } = message.data;
        // console.log("updated", message.data)
        dispatch(setOnlyAskTable(updatedFullAsks))
        dispatch(setTheAskTable(updatedAsks));
      }
      // const updatedBids = generateUpdatedBidsTable(data.updatedBids, onlyBids);
    }, `DEPTH_ASKS${path}`);

    webSocket.sendMessage({ method: "SUBSCRIBE", params: [`depth.200ms.${path}`] });

    return () => {
      webSocket.deRegisterCallback("depth", `DEPTH_ASKS${path}`);
      webSocket.sendMessage({ method: "UNSUBSCRIBE", params: [`depth.200ms.${path}`] });
      workerRef.current?.terminate();
    };
  }, [loading, dispatch, path, asks]);

  if (localLoading || !asks || asks.length === 0) {
    // Skeleton loader when data is not yet available
    return (
      <div className="w-full h-56">
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


  const maxAsk = asks[0][2];

  return (
    <div>
      {asks.map((row, i) => (
        <div key={i} className="grid relative w-full bg-transparent overflow-hidden">
          <div
            className="absolute top-0 right-0 h-full bg-radium-red/15"
            style={{
              width: `${(100 * asks[i][2]) / maxAsk}%`,
              transition: "width 0.3s ease-in-out",
            }}
          ></div>
          <div className="grid grid-cols-3">
            {row.map((cell, j) => (
              <div
                key={j}
                className={`col-span-1 flex justify-center items-center ${j === 0 ? "text-radium-red/100" : "text-white"
                  }`}
              >
                {cell}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
