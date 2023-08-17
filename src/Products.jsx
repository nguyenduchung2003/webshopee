import { useLocation, useParams, NavLink } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import Banner from "./Banner"
const Products = () => {
     const { id } = useParams()
     const { state } = useLocation()
     const [currentImg, setCurrentImg] = useState(0)
     const [quantity, setQuantity] = useState(1)
     const [product, setProduct] = useState(
          state.find((product) => product.id === Number(id))
     )
     const UserId = useRef(null)
     const hoverImg = (index) => {
          setCurrentImg(index)
     }
     useEffect(() => {
          const userNow = JSON.parse(localStorage.getItem("userNow"))
          if (userNow) {
               UserId.current = userNow.id
          } else {
               null
          }
     }, [])

     useEffect(() => {
          setProduct(state.find((product) => product.id === Number(id)))
     }, [state, id])
     useEffect(() => {}, [])
     function pushProductToLocal(product) {
          product.quantity = quantity
          product.userId = UserId.current
          if (localStorage.getItem("product") === null) {
               localStorage.setItem("product", JSON.stringify([product]))
               return
          }
          const products = JSON.parse(localStorage.getItem("product"))

          products.push(product)
          localStorage.setItem("product", JSON.stringify(products))
     }
     const handlerAddCart = () => {
          if (product) {
               pushProductToLocal(product)
               alert("Thêm sản phẩm thành công")
          } else {
               null
          }
     }
     const handlerAddCartNow = () => {
          if (product) {
               pushProductToLocal(product)
          } else {
               null
          }
     }
     const hanglerQuantity = (e) => {
          setQuantity(e.target.value)
     }
     const handlerClickDecrement = () => {
          setQuantity(quantity - 1)
     }
     const handlerClickIncrease = () => {
          setQuantity(quantity + 1)
     }
     return (
          <>
               <Banner />
               <div className="flex justify-center">
                    <div className="w-[505px] h-[540px] mx-10">
                         <div>
                              {product
                                   ? product.images.map((image, index) => {
                                          return (
                                               <div key={index}>
                                                    {index === currentImg ? (
                                                         <img
                                                              src={image}
                                                              className="w-[505px] h-[470px]"
                                                         />
                                                    ) : null}
                                               </div>
                                          )
                                     })
                                   : null}
                         </div>
                         <div className="flex w-[100px]  relative bottom-[-10px] ">
                              {product
                                   ? product.images.map((image, index) => (
                                          <img
                                               key={index}
                                               src={image}
                                               alt=""
                                               onMouseOver={() =>
                                                    hoverImg(index)
                                               }
                                               className="hover:border-2 border-sky-500 h-[100px] w-[100px] text-center"
                                          />
                                     ))
                                   : null}
                         </div>
                    </div>
                    <div className="mx-10">
                         <div className="text-3xl my-[20px] w-[700px]">
                              {product ? (
                                   <div>{product.description}</div>
                              ) : null}
                         </div>
                         <div className="my-[20px]">
                              {product ? <div>Giá:{product.price}$</div> : null}
                         </div>
                         <div className="my-[20px]">
                              <input
                                   className="border-2 w-[30px] h-[40px] relative my-[auto] "
                                   type="button"
                                   value="-"
                                   onClick={handlerClickDecrement}
                              />
                              <input
                                   type="number"
                                   className="border-y-2 h-[40px] w-[160px] text-center"
                                   value={quantity}
                                   min="0"
                                   readOnly
                                   onChange={hanglerQuantity}
                              />
                              <input
                                   className="border-2 w-[30px] h-[40px] relative my-[auto] left-[0px]"
                                   type="button"
                                   value="+"
                                   onClick={handlerClickIncrease}
                              ></input>
                         </div>
                         <div className="flex">
                              <div className="border-2 bg-red-500 w-[200px] h-[50px] leading-[45px] text-center my-[20px]">
                                   <button
                                        // className="bg-indigo-500"
                                        onClick={handlerAddCart}
                                   >
                                        Thêm vào giỏ hàng
                                   </button>
                              </div>
                              <div className="border-2 bg-red-500 w-[130px] h-[50px] leading-[45px] text-center my-[20px]">
                                   <NavLink to="/webshopee/cart">
                                        <button onClick={handlerAddCartNow}>
                                             Mua ngay
                                        </button>
                                   </NavLink>
                              </div>
                         </div>
                    </div>
               </div>
          </>
     )
}
export default Products
