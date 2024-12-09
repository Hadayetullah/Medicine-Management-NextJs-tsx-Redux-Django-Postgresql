"use client";

import { useRef } from "react";
// import { Provider } from "react-redux";
// import { AppStore, makeStore } from "./store";
// // import React from "react";
// // import { store } from "./store";

// export default function ClientProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const store = makeStore();
//   const storeRef = useRef<AppStore>();
//   if (!storeRef.current) {
//     storeRef.current = makeStore();
//   }
//   return <Provider store={store}>{children}</Provider>;
// }

// "use client";

// import { Provider } from "react-redux";
// import React from "react";
// import { createStore } from "./store";

// export default function ClientProvider({
//   children,
//   initialState,
// }: {
//   children: React.ReactNode;
//   initialState?: Partial<any>; // Allow optional initial state
// }) {
//   const store = React.useMemo(() => createStore(initialState), [initialState]);
//   return <Provider store={store}>{children}</Provider>;
// }

// export default function ClientProvider() {
//   return (
//     <Provider store={store}>
//       <div>Testing Redux Provider</div>
//     </Provider>
//   );
// }

// ("use client");

import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import React, { useEffect, useState } from "react";
// import Loader from "@/components/Loader";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [isClient, setIsClient] = useState(false);

  // console.log("Out : ", typeof window);

  // useEffect(() => {
  //   // console.log("in : ", typeof window);
  //   setIsClient(true);
  // }, []);

  // if (!isClient) {
  //   return <Loader />;
  // }

  // if (typeof window != "undefined") {
  //   return null;
  // }

  // console.log("Further: ", typeof window);
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    console.log(!storeRef.current);
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
