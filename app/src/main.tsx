import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import "./index.css";
import store from "./app/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import router from "./router/router";
import {SnackbarProvider} from "notistack"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={4}>
      <RouterProvider router={router} />
    </SnackbarProvider>
  </Provider>
);
