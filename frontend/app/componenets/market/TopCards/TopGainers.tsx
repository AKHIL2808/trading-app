import Image from "next/image";
import Link from "next/link";

export default function TopGainers({ datas }) {
  let positiveValues = [];
  let negativeValues = [];

  for (let i = 0; i < datas.length; i++) {
    const change = String(datas[i].change); // Ensure change is a string
    const isNegative = change.startsWith("-");

    if (isNegative) {
      negativeValues.push(datas[i]);
    } else {
      positiveValues.push(datas[i]);
    }
  }

  const sortedPositive = Array.from(positiveValues).sort((a, b) => {
    const changeA = String(a.change).split(" ")[0]; // Safely convert to a number
    const changeB = String(b.change).split(" ")[0]
    return parseFloat(changeB) - parseFloat(changeA); // Sort in descending order
  });
  const sortedNegative = Array.from(negativeValues).sort((a, b) => {
    const changeA = String(a.change).substring(1).split(" ")[0]
    const changeB = String(b.change).substring(1).split(" ")[0]
    return parseFloat(changeA) - parseFloat(changeB)
  })
  const sortedArray = [...sortedPositive, ...sortedNegative]

  let arrayToPrint = []
  for (let i = 0; i < 5; i++) {
    arrayToPrint.push(sortedArray[i])
  }
  return (
    <div>
      {arrayToPrint.map((data, index) => {
        const change = String(data.change);
        const isNegative = change.startsWith("-");
        const symbolString = String(data.symbol).toLowerCase()
        return (
          <Link
            key={index} // Add a unique key here
            href={`/trade/${data.pairs}`}
            className="cursor-pointer h-10 grid grid-cols-4 rounded-lg hover:bg-background-tile-top/100"
          >
            <div className="grid grid-cols-4 col-span-2">
              <div className="flex justify-center items-center">
                <Image className="rounded-full" src={`/images/${symbolString}.webp`} alt={`${symbolString} logo`} width={20} height={20} />
              </div>
              <div className="flex items-center col-span-3">
                <h1 className="text-base font-medium tabular-nums">{data.symbol}</h1>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-base font-medium tabular-nums">${data.price}</p>
            </div>
            <div className="flex items-center">
              <p
                className={`text-base font-bold tabular-nums pl-4 ${isNegative ? "text-radium-red/100" : "text-radium-green/100"
                  }`}
              >
                {data.change} %
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
