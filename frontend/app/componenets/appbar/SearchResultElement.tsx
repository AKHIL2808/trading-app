// export default function SearchResultElemet({ datas, visibility }) {
//   const relevantData = [...datas]
//   return (
//     <div>
//       {relevantData.map((data, index) => {
//         return (
//           <div key={index} className="grid grid-cols-5">
//             <div className="col-span-4">{data.image}</div>
//             <div className="col-span-1 grid">
//               <div className="flex justify-center items-center">{data.price}</div>
//               <div className="flex justify-center items-center">{data.change}</div>
//             </div>
//           </div>
//         )
//       })}
//     </div>
//   )
// }

import Image from "next/image";
import Link from "next/link";



export default function SearchResultElemet({ datas }) {
  if (!datas.length) {
    return <div className="p-4 text-center text-gray-500">No results found</div>;
  }

  return (
    <div className="max-h-96 overflow-y-scroll no-scrollbar ">
      {datas.map((data, index) => {

        const change = String(data.change);
        const isNegative = change.startsWith("-");
        const symbolString = String(data.symbol).toLowerCase()
        return (
          <Link
            href={`/trade/${data.pairs}`}
            key={index}
            className="grid grid-cols-3 p-2  hover:bg-background-tile-top cursor-pointer"
            onClick={() => console.log("clicked in link ", data.pairs)}
          >
            <div className="col-span-2 grid grid-cols-5">
              <div className="col-span-1 flex justify-center items-center">
                <Image className="rounded-full" src={`/images/${symbolString}.webp`} alt={`${symbolString} logo`} width={40} height={40} />
              </div>
              <div className="col-span-4 text-base font-bold tabular-nums flex items-center">{data.symbol}</div>
            </div>
            <div className="grid grid-cols-5">
              <div className="grid col-span-4">
                <div className="text-base font-bold tabular-nums flex justify-end items-end">{data.price}</div>
                <div className={`flex justify-end items-end text-base font-bold tabular-nums ${isNegative ? "text-radium-red/100" : "text-radium-green/100"
                  }`} >{data.change}%
                </div>
              </div>
              <div></div>
            </div>
          </Link>
        )
      })}
    </div >
  );
}
