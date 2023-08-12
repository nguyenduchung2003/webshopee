import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import "./index.css"
import Router from "./Router"
import DataAPIContext from "./DataContext"
const router = Router
ReactDOM.createRoot(document.getElementById("root")).render(
     <React.StrictMode>
          <DataAPIContext>
               <RouterProvider router={router} />
          </DataAPIContext>
     </React.StrictMode>
)
