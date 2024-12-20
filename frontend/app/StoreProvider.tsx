"use client";

import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";

/* Approach - 1 (Recommended by Redux, most times work) */

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | undefined>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

/* Approach - 2 (Most times work) */
// export default function ClientProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   console.log("Provider");
//   const storeRef = useRef<AppStore>();
//   // Create the store instance the first time this renders
//   storeRef.current = makeStore();

//   return <Provider store={storeRef.current}>{children}</Provider>;
// }

/* Approach - 3 (Less efficient) */
// const store = makeStore();
// export default function ClientProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <Provider store={store}>{children}</Provider>;
// }

/* Approach - 4 (Most times work, better than approach - 2) */
// export default function ClientProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [store, setStore] = useState(() => makeStore());

//   useEffect(() => {
//     setStore(makeStore()); // Re-initialize the store on the client
//   }, []);

//   return <Provider store={store}>{children}</Provider>;
// }
