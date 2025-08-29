"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <MantineProvider>
          <PersistGate loading={null} persistor={persistor}>
            {children}
            <Toaster position="top-right" />
          </PersistGate>
        </MantineProvider>
      </Provider>
    </SessionProvider>
  );
}
