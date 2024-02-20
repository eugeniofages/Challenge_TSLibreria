import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { LibreriaProvider } from "./context/LibreriaProvider.jsx";
import router from "./router.jsx";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <AuthProvider>
    <LibreriaProvider >
      
      <RouterProvider router={router}/>
    </LibreriaProvider>
    </AuthProvider>
  </NextUIProvider>
);
