import App from "./App"
import Login from "./Login"
import Register from "./Register"
import Products from "./Products"
import Cart from "./Cart"
import CategoryChildren from "./CategoryChildren"
import { createBrowserRouter } from "react-router-dom"
const Router = createBrowserRouter([
     {
          path: "/",
          element: <App />,
          children: [],
     },
     {
          path: "/login",
          element: <Login />,
     },
     {
          path: "/Register",
          element: <Register />,
     },
     {
          path: "/products/:id",
          element: <Products />,
     },
     {
          path: "/cart",
          element: <Cart />,
     },
     {
          path: "/category/:title",
          element: <CategoryChildren />,
     },
])
export default Router
