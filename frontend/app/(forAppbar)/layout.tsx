import Appbar from "../componenets/appbar/Appbar";
import StoreProvider from "../storeProvider";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <StoreProvider>
      <div className="grid grid-cols-1 grid-rows-12 h-screen bg-black px-4">
        <div className="sticky col-span-1 row-span-1 border-b border-gray-600/50 grid grid-cols-1 grid-rows-1 z-10">
          <Appbar />
        </div>
        <div className="col-span-1 row-span-11">

          {children}

        </div>
      </div></StoreProvider>
  );
}
