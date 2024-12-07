"use client";

import { Provider } from "react-redux";
import store from "./store";
import React from "react";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}

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
