import { createBrowserRouter, createHashRouter } from "react-router-dom";
import { isHashProvider } from "../config/router";
import { lazy } from "react";

const routerFn = isHashProvider ? createHashRouter : createBrowserRouter

export const routes = routerFn([
  {
    path: '/',
    Component: lazy(()=>import('../pages/Home'))
  },
  {
    path: "terminos",
    Component: lazy(() => import("../pages/terminos"))
  },
  {
    path: "estado-pedido",
    children:[
      {
        index: true,
        Component: lazy(() => import("../pages/estado-pedido")),
      },
      {
        path: ':id',
        Component: lazy(() => import("../pages/estado-pedido"))
      }
    ]
  },
])
