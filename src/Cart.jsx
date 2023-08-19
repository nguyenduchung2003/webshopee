import { useEffect, useState } from "react"
import CartProduct from "./CartProduct"
import Pay from "./Pay"
import Banner from "./Banner"
import emptyshoppingcart from "./Picture/emptyshoppingcart.png"
import { useNavigate } from "react-router-dom"
import LayoutPay from "./LayoutPay"
import { v4 as uuidv4 } from "uuid"
import moment from "moment"
const Cart = () => {
     const userNow = JSON.parse(localStorage.getItem("userNow"))
     const [arrayProductCart, setArrayProductCart] = useState(
          JSON.parse(localStorage.getItem("product") || "[]")
     )

     const [sumProductCart, setSumProductCart] = useState(0)
     const [sumPrice, setSumPrice] = useState(0)
     const [arrayStatusCheckbox, setArrayStatusCheckbox] = useState(
          document.querySelectorAll(
               'input[type="checkbox"][id$="_checkbox"]:checked'
          )
     )

     const [arrayStatusCheckboxFalse, setArrayStatusCheckboxFalse] = useState(
          document.querySelectorAll('input[type="checkbox"][id$="_checkbox"]')
     )

     const [sumQuantity, setSumQuantity] = useState(
          arrayProductCart?.map((product) => {
               if (product.userId == userNow.id) {
                    return {
                         idQuantity: product.id,
                         sumQuantity: product.quantity,
                    }
               } else return []
          })
     )
     const [arrayStatusPrice, setArrayStatusPrice] = useState(
          document.querySelectorAll('div[id$="_price"]')
     )

     const [isLayoutPay, setIsLayoutPay] = useState(false)

     const navigate = useNavigate()

     useEffect(() => {
          setArrayStatusPrice(document.querySelectorAll('div[id$="_price"]'))
     }, [arrayProductCart])
     useEffect(() => {
          setSumProductCart(arrayStatusCheckbox.length)
     }, [arrayStatusCheckbox.length])

     useEffect(() => {
          const checkBoxProduct = () => {
               let arrray = []
               arrayStatusCheckbox.forEach((item) => {
                    arrayProductCart.forEach((product) => {
                         arrayStatusPrice.forEach((value) => {
                              let idProduct = item.id.split("_")[0]

                              if (
                                   idProduct == product.id &&
                                   idProduct == value.id.split("_")[0] &&
                                   product.userId == userNow.id
                              ) {
                                   arrray.push(
                                        Number(value.innerText.split("$")[0])
                                   )
                              }
                         })
                    })
               })
               const sumWithInitial = arrray.reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
               )
               setSumPrice(sumWithInitial)
          }
          checkBoxProduct()
     }, [arrayProductCart, arrayStatusCheckbox, arrayStatusPrice, userNow])

     useEffect(() => {
          let AllCheckBox = document.getElementById("allCheckBox")
          if (AllCheckBox) {
               if (
                    arrayStatusCheckbox.length < arrayStatusCheckboxFalse.length
               ) {
                    AllCheckBox.checked = false
               } else if (
                    arrayStatusCheckbox.length > 0 &&
                    arrayStatusCheckbox.length ==
                         arrayStatusCheckboxFalse.length
               ) {
                    AllCheckBox.checked = true
               }
          } else {
               null
          }
     }, [arrayStatusCheckbox.length, arrayStatusCheckboxFalse.length])

     useEffect(() => {
          setArrayProductCart((products) => {
               return products.map((product, index) => {
                    if (
                         product.id == sumQuantity[index]?.idQuantity &&
                         product.userId == userNow.id
                    ) {
                         return {
                              ...product,
                              quantity: sumQuantity[index]?.sumQuantity,
                         }
                    }
                    return product
               })
          })
     }, [userNow.id, sumQuantity])

     useEffect(() => {
          localStorage.setItem("product", JSON.stringify(arrayProductCart))
     }, [arrayProductCart])

     const handlerDelProduct = (e) => {
          const productId = Number(e.target.id)

          const newArray = arrayProductCart.filter((product) => {
               if (product.id == productId && product.userId == userNow.id) {
                    return false
               }
               return true
          })
          const newArray2 = sumQuantity.filter(
               (quantity) => quantity?.idQuantity !== productId
          )
          console.log(newArray2)
          setArrayProductCart(newArray)
          setSumQuantity(newArray2)
     }

     const hanglerSumProduct = () => {
          setArrayStatusCheckbox(
               document.querySelectorAll(
                    'input[type="checkbox"][id$="_checkbox"]:checked'
               )
          )
          setArrayStatusCheckboxFalse(
               document.querySelectorAll(
                    'input[type="checkbox"][id$="_checkbox"]'
               )
          )
     }

     const ClickAllCheckBox = () => {
          let AllCheckBox = document.getElementById("allCheckBox")
          let AllCheckBoxProduct = document.querySelectorAll(
               'input[type="checkbox"][id$="_checkbox"]'
          )
          if (AllCheckBox.checked) {
               AllCheckBoxProduct.forEach((CheckBox) => {
                    CheckBox.checked = true
               })
               hanglerSumProduct()
          } else {
               AllCheckBoxProduct.forEach((CheckBox) => {
                    CheckBox.checked = false
               })
               hanglerSumProduct()
          }
     }

     const ClickAllDelete = () => {
          if (arrayStatusCheckbox.length > 0) {
               arrayStatusCheckbox.forEach((item) => {
                    const idProductDel = item.id.split("_")[0]
                    console.log(idProductDel)
                    setArrayProductCart((a) => {
                         return a.filter((product) => {
                              let x = false
                              if (
                                   product.id === Number(idProductDel) &&
                                   product.userId == userNow.id
                              ) {
                                   x = true
                              }
                              return !x
                         })
                    })
               })
          } else {
               alert("Bạn chưa chọn sản phẩm")
          }
     }

     const clickBuyProduct = () => {
          navigate("/webshopee/")
     }
     const handlerClickDecrement = (e) => {
          setSumQuantity((quantitys) => {
               return quantitys.map((quantity) => {
                    if (
                         quantity?.idQuantity == e.target.id.split("_")[0] &&
                         quantity.sumQuantity > 0
                    ) {
                         return {
                              ...quantity,
                              sumQuantity: quantity.sumQuantity - 1,
                         }
                    }
                    return quantity
               })
          })
     }
     const handlerClickIncrease = (e) => {
          setSumQuantity((quantitys) => {
               return quantitys.map((quantity) => {
                    if (quantity?.idQuantity == e.target.id.split("_")[0]) {
                         return {
                              ...quantity,
                              sumQuantity: quantity.sumQuantity + 1,
                         }
                    }
                    return quantity
               })
          })
     }
     const handlerPayProduct = () => {
          setIsLayoutPay(true)
     }
     function pushHistoryToLocal(proudct) {
          if (localStorage.getItem("history") === null) {
               localStorage.setItem("history", JSON.stringify([proudct]))
               return
          }
          const proudcts = JSON.parse(localStorage.getItem("history"))
          proudcts.push(proudct)
          localStorage.setItem("history", JSON.stringify(proudcts))
     }
     const clickPay = () => {
          if (arrayStatusCheckbox.length > 0) {
               alert("Đặt hàng thành công")
               setArrayProductCart((products) => {
                    return products.filter((product) => {
                         let shouldFilter = false
                         arrayStatusCheckbox.forEach((status) => {
                              if (
                                   Number(status.id.split("_")[0]) ===
                                        product.id &&
                                   product.userId == userNow.id
                              ) {
                                   shouldFilter = true
                              }
                         })
                         return !shouldFilter
                    })
               })

               let productHistory = {
                    arrayProduct: arrayProductCart.filter((product) => {
                         let shouldFilter = false
                         arrayStatusCheckbox.forEach((status) => {
                              if (
                                   Number(status.id.split("_")[0]) ===
                                   product.id
                              ) {
                                   shouldFilter = true
                              }
                         })
                         return shouldFilter
                    }),
                    sumPrice: sumPrice,
                    user: JSON.parse(localStorage.getItem("userNow")).id,
                    idCart: uuidv4(),
                    time: moment().format("DD/MM/YYYY"),
               }
               pushHistoryToLocal(productHistory)
               setIsLayoutPay(false)
          } else {
               alert("Bạn chưa chọn sản phẩm")
          }
     }
     const clickCancel = () => {
          setIsLayoutPay(false)
     }

     return (
          <>
               <Banner isCart="true" />
               {isLayoutPay ? (
                    <LayoutPay
                         allPrice={sumPrice}
                         clickCancel={clickCancel}
                         clickPay={clickPay}
                    />
               ) : null}
               {arrayProductCart?.length > 0 &&
               arrayProductCart.some((x) => x.userId == userNow.id) ? (
                    <>
                         <div className={`max-w-[100rem]`}>
                              <div
                                   className={`absolute ${
                                        isLayoutPay
                                             ? "top-[590px]"
                                             : "top-[130px]"
                                   }  left-[250px]`}
                              >
                                   Sản phẩm
                              </div>

                              <div
                                   className={`flex absolute ${
                                        isLayoutPay
                                             ? "top-[590px]"
                                             : "top-[130px]"
                                   } left-[700px]`}
                              >
                                   <div className={`relative left-[40px]`}>
                                        Đơn giá
                                   </div>
                                   <div className={`relative left-[190px] `}>
                                        Số lượng
                                   </div>
                                   <div className={`relative left-[335px]`}>
                                        Số tiền
                                   </div>
                                   <div className={`relative left-[370px] `}>
                                        Thao tác
                                   </div>
                              </div>
                              <div className="mt-[20px] h-[440px] overflow-auto">
                                   {arrayProductCart.map((product, index) => {
                                        if (product.userId == userNow.id) {
                                             return (
                                                  <div
                                                       key={`${product.id}_${index}`}
                                                  >
                                                       <CartProduct
                                                            linkPicture={
                                                                 product.thumbnail
                                                            }
                                                            description={
                                                                 product.description
                                                            }
                                                            price={
                                                                 product.price
                                                            }
                                                            onClick={
                                                                 handlerDelProduct
                                                            }
                                                            id={product.id}
                                                            currentPrice={
                                                                 sumQuantity[
                                                                      index
                                                                 ]
                                                                      ?.sumQuantity *
                                                                 product.price
                                                            }
                                                            quantitys={
                                                                 sumQuantity[
                                                                      index
                                                                 ]?.sumQuantity
                                                            }
                                                            onChange={
                                                                 hanglerSumProduct
                                                            }
                                                            allPrice={sumPrice}
                                                            handlerClickDecrement={
                                                                 handlerClickDecrement
                                                            }
                                                            handlerClickIncrease={
                                                                 handlerClickIncrease
                                                            }
                                                       />
                                                  </div>
                                             )
                                        }
                                   })}
                              </div>

                              {
                                   <Pay
                                        sumProduct={sumProductCart}
                                        sumPrice={sumPrice}
                                        onChange={ClickAllCheckBox}
                                        onClickAll={ClickAllDelete}
                                        onClick={handlerPayProduct}
                                   />
                              }
                         </div>
                    </>
               ) : (
                    <>
                         <div className="flex justify-center relative top-[250px]">
                              <div>
                                   <img
                                        src={emptyshoppingcart}
                                        alt=""
                                        className=" w-[110px] h-[100px] "
                                   />
                              </div>
                              <button
                                   className="w-[170px] h-[40px] bg-red-500 absolute top-[100px]"
                                   onClick={clickBuyProduct}
                              >
                                   Mua hàng
                              </button>
                         </div>
                    </>
               )}
          </>
     )
}
export default Cart
