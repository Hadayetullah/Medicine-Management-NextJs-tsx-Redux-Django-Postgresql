// // import Loader from "@/components/Loader";
// // import { dispatchFetchMedicines } from "./utils/fetchMedicinesUtil";
// // import { MedicineType } from "@/lib/features/websocketSlice";
// // import { authCheck } from "./utils/authCheckUtil";
// export const dynamic = "force-dynamic";

// import { authServerSideProps } from "../server/authServerSideProps";
// export { authServerSideProps as getServerSideProps };

// import { headers } from "next/headers";
// // import validateToken from "./utils/validateToken";
// import { redirect } from "next/navigation";

// export default function Home({
//   accessToken,
//   refreshToken,
// }: {
//   accessToken: string | null;
//   refreshToken: string | null;
// }) {
//   // if (!accessToken) {
//   //   return null;
//   // }
//   // const [currentTitle, setCurrentTitle] = useState<string>("");
//   // const [medicineData, setMedicineData] = useState();

//   // const handleActiveTitleAndData = (title: string) => {
//   //   setCurrentTitle(title);
//   // };

//   // const hasRunEffect = useRef(false);

//   // console.log("isAuthenticated: ", isAuthenticated);

//   // useEffect(() => {
//   //   if (isAuthenticated && accessToken && !hasRunEffect.current) {
//   //     hasRunEffect.current = true;

//   //     dispatchFetchMedicines(dispatch, accessToken);

//   //     // Dispatch WebSocket connection for medicine
//   //     dispatch({
//   //       type: "websocket/connect",
//   //       payload: {
//   //         connectionKey: "medicineConnection",
//   //         token: accessToken,
//   //         url: "ws://127.0.0.1:8000/ws/product/medicine/",
//   //       },
//   //     });

//   //     // Dispatch WebSocket connection for notification
//   //     // dispatch({
//   //     //   type: "websocket/connect",
//   //     //   payload: {
//   //     //     connectionKey: "notificationConnection",
//   //     //     token: accessToken,
//   //     //     url: "ws://127.0.0.1:8000/ws/product/notification/",
//   //     //   },
//   //     // });
//   //   }
//   // }, [isAuthenticated, accessToken, dispatch]);

//   // useEffect(() => {
//   //   console.log("Auth");
//   //   if (accessToken && accessToken !== null && accessToken !== "undefined") {
//   //     authCheck(dispatch, router.push, accessToken);
//   //   } else {
//   //     router.push("/login");
//   //     dispatch(
//   //       restoreAuthState({
//   //         isAuthenticated: false,
//   //       })
//   //     );
//   //   }

//   //   if (
//   //     accessToken &&
//   //     accessToken !== null &&
//   //     accessToken !== "undefined" &&
//   //     !hasRunEffect.current
//   //   ) {
//   //     hasRunEffect.current = true;

//   //     console.log("Data");

//   //     dispatchFetchMedicines(dispatch, accessToken);

//   //     // Dispatch WebSocket connection for medicine
//   //     dispatch({
//   //       type: "websocket/connect",
//   //       payload: {
//   //         connectionKey: "medicineConnection",
//   //         token: accessToken,
//   //         url: "ws://127.0.0.1:8000/ws/product/medicine/",
//   //       },
//   //     });
//   //   }
//   // }, [authLoading, isAuthenticated, dispatch, router]);

//   // return (
//   //   <>
//   //     {/* <div className="min-w-[190px] max-w-[300px] flex flex-row items-center justify-center gap-3 mt-[70px] mb-2 mx-auto">
//   //           <button
//   //             onClick={() => handleActiveTitleAndData("all")}
//   //             className={`hover:bg-blue-900 text-white w-full py-1 px-2 rounded-md ${
//   //               currentTitle === "all" ? "bg-blue-900" : "bg-blue-500"
//   //             }`}
//   //           >
//   //             All
//   //           </button>

//   //           <button
//   //             onClick={() => handleActiveTitleAndData("searched")}
//   //             className={`hover:bg-blue-900 text-white w-full py-1 px-2 rounded-md ${
//   //               currentTitle === "searched" ? "bg-blue-900" : "bg-blue-500"
//   //             }`}
//   //           >
//   //             Searched
//   //           </button>
//   //         </div> */}
//   //     <DataTable />
//   //   </>
//   // );

//   if (accessToken) {
//     return <div>Hello</div>;
//   }
// }

import { useAppSelector } from "@/lib/hooks";

import Loader from "./components/client/Loader";
import HomeMainContent from "./components/home/HomeMainContent";

export default async function HomePage() {
  const { loading } = useAppSelector((state) => state.product);

  return <div>{loading ? <Loader /> : <HomeMainContent />}</div>;
}
