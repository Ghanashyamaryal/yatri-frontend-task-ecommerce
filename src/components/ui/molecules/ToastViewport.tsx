import React from "react";
import { Toaster } from "react-hot-toast";

const ToastViewport = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#bfa0e6",
          color: "#fff",
          borderRadius: "8px",
          padding: "12px 16px",
          fontSize: "14px",
          fontWeight: "500",
        },
        success: {
          iconTheme: {
            primary: "#fff",
            secondary: "#bfa0e6",
          },
        },
        error: {
          style: {
            background: "#dc2626",
          },
        },
      }}
    />
  );
};

export default ToastViewport;
