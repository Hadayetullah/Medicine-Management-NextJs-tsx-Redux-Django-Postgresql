"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { validateAccessTokenLife, validateRefreshTokenLife } from "@/actions";
import { RootState, useAppDispatch } from "@/lib/store";
import { useSelector } from "react-redux";
import {
  refreshAccessToken,
  validateAuthentication,
} from "@/lib/features/authSlice";

import { isValidProps } from "@/actions";
import Loader from "@/components/Loader";

export default function Home() {
  const { loading, isAuthenticated, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  // const {} = useSelector((state: RootState) => state.employee);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [currentTitle, setCurrentTitle] = useState<string>("");
  const [medicineData, setMedicineData] = useState();

  const handleActiveTitleAndData = (title: string) => {
    setCurrentTitle(title);
  };

  const checkAuth = () => {
    const isAccessTokenValid = validateAccessTokenLife();

    if (!isAccessTokenValid) {
      router.push("/login");
      dispatch(validateAuthentication(false));
      // const isRefreshTokenValid: isValidProps = validateRefreshTokenLife();

      // if (!isRefreshTokenValid.isTokenValid) {
      //   dispatch(validateAuthentication(false));
      //   router.push("/login");
      // } else {
      //   if (isRefreshTokenValid.refreshToken) {
      //     dispatch(refreshAccessToken(isRefreshTokenValid.refreshToken));
      //   } else {
      //     dispatch(validateAuthentication(false));
      //     router.push("/login");
      //   }
      // }
    }
    // else {
    //   dispatch(validateAuthentication(true));
    // }
  };

  const hasRunEffect = useRef(false);

  useEffect(() => {
    if (isAuthenticated && accessToken && !hasRunEffect.current) {
      hasRunEffect.current = true;

      // Dispatch WebSocket connection for medicine
      dispatch({
        type: "websocket/connect",
        payload: {
          connectionKey: "medicineConnection",
          token: accessToken,
          url: "ws://127.0.0.1:8000/ws/product/medicine/",
        },
      });

      // Dispatch WebSocket connection for notification
      // dispatch({
      //   type: "websocket/connect",
      //   payload: {
      //     connectionKey: "notificationConnection",
      //     token: accessToken,
      //     url: "ws://127.0.0.1:8000/ws/product/notification/",
      //   },
      // });
    }
  }, [isAuthenticated, accessToken, dispatch]);

  useEffect(() => {
    checkAuth();
  }, [dispatch, router]);

  if (loading || !isAuthenticated) {
    return <Loader />;
  } else {
    return (
      <>
        <div className="min-w-[190px] max-w-[300px] flex flex-row items-center justify-center gap-3 mt-[70px] mb-2 mx-auto">
          <button
            onClick={() => handleActiveTitleAndData("all")}
            className={`hover:bg-blue-900 text-white w-full py-1 px-2 rounded-md ${
              currentTitle === "all" ? "bg-blue-900" : "bg-blue-500"
            }`}
          >
            All
          </button>

          <button
            onClick={() => handleActiveTitleAndData("searched")}
            className={`hover:bg-blue-900 text-white w-full py-1 px-2 rounded-md ${
              currentTitle === "searched" ? "bg-blue-900" : "bg-blue-500"
            }`}
          >
            Searched
          </button>
        </div>

        {/* Display Medicines Data */}
        <div className="w-full mb-5">
          <div
            className="overflow-x-auto overflow-y-hidden w-full h-full"
            style={{ scrollbarWidth: "thin", zIndex: "-1" }}
          >
            <div className="min-w-[900px] max-w-full">
              <div className="h-[40px] w-full bg-gray-100 font-bold text-xs md:text-sm text-gray-500 flex flex-row pl-1 sm:pl-2.5 pr-4">
                <div className="w-[12%] h-full flex items-center pl-2">
                  <h4>Company</h4>
                </div>

                <div className="w-[14%] h-full flex items-center pl-1">
                  <h4>Brand/Category</h4>
                </div>

                <div className="w-[14%] h-full flex items-center pl-1">
                  <h4>Medicine Name</h4>
                </div>

                <div className="w-[7%] h-full flex items-center justify-center pl-1">
                  <h4>Price</h4>
                </div>

                <div className="w-[12%] h-full flex items-center justify-center pl-1">
                  <h4>Power/Strenght</h4>
                </div>

                <div className="w-[14%] h-full flex items-center pl-1">
                  <h4>Created Time</h4>
                </div>

                <div className="w-[14%] h-full flex items-center pl-1">
                  <h4>Modified Time</h4>
                </div>

                <div className="w-[13%] h-full flex items-center justify-center pl-1">
                  <h4>Edit/Delete</h4>
                </div>
              </div>

              <div
                className="overflow-y-scroll overflow-x-hidden text-sm md:text-base w-full h-full bg-gray-100 pl-1 sm:pl-2.5"
                style={{ scrollbarWidth: "thin", zIndex: "-1" }}
              >
                <div className="w-full min-h-[60vh] max-h-[75vh] pb-5 bg-white">
                  <div className="w-full h-full">
                    <div
                      className={`w-full h-full flex flex-row text-gray-500`}
                    >
                      <div className="w-[12%] h-full flex my-1 items-center pl-2">
                        <h4>{"Company name"}</h4>
                      </div>

                      <div className="w-[14%] h-full flex my-1 items-center pl-1">
                        <h4>{"category name"}</h4>
                      </div>

                      <div className="w-[14%] h-full flex my-1 items-center pl-1">
                        <h4>{"medicine name"}</h4>
                      </div>

                      <div className="w-[7%] h-full flex my-1 pl-1 justify-center">
                        <h4>{"medicine price"}</h4>
                      </div>

                      <div className="w-[12%] h-full flex my-1 items-center justify-center pl-1">
                        <h4>{"medicine power"}</h4>
                      </div>

                      <div className="w-[14%] h-full flex my-1 flex-col pl-1">
                        <h4>{"createdWholeDate"}</h4>
                        <h4>{"createdWholeTime"}</h4>
                      </div>

                      <div className="w-[14%] h-full flex my-1 flex-col pl-1">
                        <h4>{"modifiedWholeDate"}</h4>
                        <h4>{"modifiedWholeTime"}</h4>
                      </div>

                      <div className="w-[13%] h-full flex my-1 flex-col pl-1 items-center gap-[3px]">
                        <button
                          className="w-full text-gray-900 bg-green-500 mr-1 rounded-md hover:bg-green-600"
                          // onClick={() => handleEditForm(medicine)}
                        >
                          Edit
                        </button>
                        <button
                          className="w-full text-white bg-red-600 mr-1 rounded-md hover:bg-red-700"
                          // onClick={() => handleDelete(medicine.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
