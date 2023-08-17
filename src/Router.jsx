import App from "./App"
import Login from "./Login"
import Register from "./Register"
import Products from "./Products"
import Cart from "./Cart"
import CategoryChildren from "./CategoryChildren"
import History from "./History"
import { createBrowserRouter } from "react-router-dom"

const Router = createBrowserRouter([
     {
          path: "/webshopee/",
          element: <App />,
          children: [],
     },
     {
          path: "/webshopee/login",
          element: <Login />,
     },
     {
          path: "/webshopee/Register",
          element: <Register />,
     },
     {
          path: "/webshopee/products/:id",
          element: <Products />,
     },
     {
          path: "/webshopee/cart",
          element: <Cart />,
     },
     {
          path: "/webshopee/category/:title",
          element: <CategoryChildren />,
     },
     {
          path: "/webshopee/history",
          element: <History />,
     },
])
export default Router
