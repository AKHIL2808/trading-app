// "use client";
//
// import generateUpdatedBidsTable from "@/app/utils/generateUpdatedBidsTable";
// import { webSocketManager } from "@/app/utils/webSocketManager";
// import { fetchDepthByApi, setOnlyBidsTable, setTheBidsTable } from "@/lib/features/fullBidsTable/FullBidsTableSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import { useEffect, useState } from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
//
// interface WebSocketDataType {
//   updatedAsks: string[][];
//   updatedBids: string[][];
// }
//
// export default function BidsTable({ path }: { path: string }) {
//   const dispatch = useAppDispatch();
//   const bids = useAppSelector((state) => state.fullBidsTable.bidsTable);
//   const onlyBids = useAppSelector((state) => state.fullBidsTable.onlyBidsTable);
//   const loading = useAppSelector((state) => state.fullBidsTable.loading);
//
//   const [localLoading, setLocalLoading] = useState(true);
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       await dispatch(fetchDepthByApi(path));
//
//       setLocalLoading(false);
//     };
//
//     fetchInitialData();
//   }, [dispatch, path]);
//
//   useEffect(() => {
//     if (loading) return;
//
//     setLocalLoading(false)
//     const webSocket = webSocketManager.getInstance();
//
//     webSocket.registerCallback("depth", (data: WebSocketDataType) => {
//       const updatedBids = generateUpdatedBidsTable(data.updatedBids, onlyBids);
//       dispatch(setOnlyBidsTable(updatedBids.updatedFullBids));
//       dispatch(setTheBidsTable(updatedBids.updatedBids));
//     }, `DEPTH_BIDS${path}`);
//
//     webSocket.sendMessage({ method: "SUBSCRIBE", params: [`depth.200ms.${path}`] });
//
//     return () => {
//       webSocket.deRegisterCallback("depth", `DEPTH_${path}`);
//       webSocket.sendMessage({ method: "UNSUBSCRIBE", params: [`depth.200ms.${path}`] });
//     };
//   }, [loading, dispatch, path, bids]);
//
//   if (localLoading || !bids || bids.length === 0) {
//     // Skeleton loader when data is not yet available
//     return (
//       <div className="w-full h-56">
//         <Skeleton
//           className="w-full h-full animate-pulse rounded-md"
//           baseColor="rgba(32, 33, 39, 0.8)" // Base color for the skeleton background
//           highlightColor="rgba(32, 33, 39, 0.4)" // Highlight color for the shimmer
//           style={{
//             backgroundColor: "rgba(32, 33, 39, 1)", // Ensures the background matches
//             borderRadius: "8px", // Optional: Rounded corners
//           }}
//         />
//       </div>
//     );
//   }
//
//   const maxBid = bids[bids.length - 1][2];
//   return (
//     <div>
//       {bids.map((row, i) => (
//         <div
//           key={i}
//           className="grid relative w-full bg-transparent overflow-hidden"
//         >
//           <div
//             className="absolute top-0 right-0 h-full bg-radium-green/15"
//             style={{
//               width: `${(100 * bids[i][2]) / maxBid}%`,
//               transition: "width 0.3s ease-in-out",
//             }}
//           ></div>
//           <div className="grid grid-cols-3">
//             {row.map((cell, j) => (
//               <div
//                 key={j}
//                 className={`col-span-1 flex justify-center items-center ${j == 0 ? "text-radium-green/100" : "text-white"
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





"use client";

// import generateUpdatedBidsTable from "@/app/utils/generateUpdatedBidsTable";
import { webSocketManager } from "@/app/utils/webSocketManager";
import { fetchDepthByApi, setOnlyBidsTable, setTheBidsTable } from "@/lib/features/fullBidsTable/FullBidsTableSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface WebSocketDataType {
  updatedAsks: string[][];
  updatedBids: string[][];
}

export default function BidsTable({ path }: { path: string }) {
  const dispatch = useAppDispatch();
  const bids = useAppSelector((state) => state.fullBidsTable.bidsTable);
  const onlyBids = useAppSelector((state) => state.fullBidsTable.onlyBidsTable);
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

    workerRef.current = new Worker(new URL("./generateUpdatedBidsTable.ts", import.meta.url));
    webSocket.registerCallback("depth", (data: WebSocketDataType) => {
      workerRef.current.postMessage({
        updateValues: data.updatedBids,
        bidsTable1: onlyBids,
      });

      workerRef.current.onmessage = (message) => {
        const { updatedFullBids, updatedBids } = message.data;
        dispatch(setOnlyBidsTable(updatedFullBids));
        dispatch(setTheBidsTable(updatedBids));
      }
      // const updatedBids = generateUpdatedBidsTable(data.updatedBids, onlyBids);
    }, `DEPTH_BIDS${path}`);

    webSocket.sendMessage({ method: "SUBSCRIBE", params: [`depth.200ms.${path}`] });

    return () => {
      webSocket.deRegisterCallback("depth", `DEPTH_BIDS${path}`);
      webSocket.sendMessage({ method: "UNSUBSCRIBE", params: [`depth.200ms.${path}`] });
      workerRef.current?.terminate();
    };
  }, [loading, dispatch, path, bids]);

  if (localLoading || !bids || bids.length === 0) {
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

  const maxBid = bids[bids.length - 1][2];
  return (
    <div>
      {bids.map((row, i) => (
        <div
          key={i}
          className="grid relative w-full bg-transparent overflow-hidden"
        >
          <div
            className="absolute top-0 right-0 h-full bg-radium-green/15"
            style={{
              width: `${(100 * bids[i][2]) / maxBid}%`,
              transition: "width 0.3s ease-in-out",
            }}
          ></div>
          <div className="grid grid-cols-3">
            {row.map((cell, j) => (
              <div
                key={j}
                className={`col-span-1 flex justify-center items-center ${j == 0 ? "text-radium-green/100" : "text-white"
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
