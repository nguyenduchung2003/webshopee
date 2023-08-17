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
               return {
                    idQuantity: product.id,
                    sumQuantity: product.quantity,
               }
          })
     )
     const [isLayoutPay, setIsLayoutPay] = useState(false)
     const navigate = useNavigate()
     useEffect(() => {
          const userNow = JSON.parse(localStorage.getItem("userNow"))
          if (userNow) {
               setArrayProductCart((a) =>
                    a?.filter((product) => {
                         return product.userId == userNow.id
                    })
               )
          } else {
               null
          }
     }, [])
     const [arrayStatusPrice, setArrayStatusPrice] = useState(
          document.querySelectorAll('div[id$="_price"]')
     )
     // const handlerDelProduct = (e) => {
     //      let found = false
     //      const productId = Number(e.target.id)
     //      const newArray = arrayProductCart.filter((product) => {
     //           if (product.id === productId && !found) {
     //                found = true
     //                return false
     //           }
     //           return true
     //      })
     //      const newArray2 = sumQuantity.filter((product) => {
     //           if (product.idQuantity === productId && !found) {
     //                found = true
     //                return false
     //           }
     //           return true
     //      })

     //      console.log(newArray)
     //      console.log(newArray2)
     //      setArrayProductCart(newArray)
     //      setSumQuantity(newArray2)
     //      localStorage.setItem("product", JSON.stringify(newArray))
     // }
     const handlerDelProduct = (e) => {
          const productId = Number(e.target.id)

          const newArray = arrayProductCart.filter(
               (product) => product.id !== productId
          )
          const newArray2 = sumQuantity.filter(
               (quantity) => quantity.idQuantity !== productId
          )
          console.log(newArray2)
          setArrayProductCart(newArray)
          setSumQuantity(newArray2)

          localStorage.setItem("product", JSON.stringify(newArray))
     }

     // const handlerDelProduct = (e) => {
     //      const productId = Number(e.target.id)

     //      setArrayProductCart((prevArrayProductCart) => {
     //           const removedProductIndex = prevArrayProductCart.findIndex(
     //                (product) => product.id === productId
     //           )

     //           const newArrayProductCart = [...prevArrayProductCart]
     //           newArrayProductCart.splice(removedProductIndex, 1)

     //           localStorage.setItem(
     //                "product",
     //                JSON.stringify(newArrayProductCart)
     //           )

     //           return newArrayProductCart
     //      })
     // }

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

     useEffect(() => {
          setArrayStatusPrice(document.querySelectorAll('div[id$="_price"]'))
     }, [arrayProductCart])

     useEffect(() => {
          const checkBoxProduct = () => {
               let arrray = []
               setSumProductCart(arrayStatusCheckbox.length)
               arrayStatusCheckbox.forEach((item) => {
                    arrayProductCart.forEach((product, index) => {
                         let idProduct = item.id.split("_")[0]
                         if (
                              idProduct == product.id &&
                              idProduct ==
                                   arrayStatusPrice[index].id.split("_")[0]
                         ) {
                              arrray.push(
                                   Number(
                                        arrayStatusPrice[index].innerText.split(
                                             "$"
                                        )[0]
                                   )
                              )
                         }
                    })
               })
               const sumWithInitial = arrray.reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
               )
               setSumPrice(sumWithInitial)
          }
          checkBoxProduct()
     }, [
          arrayStatusCheckbox.length,
          arrayProductCart,
          arrayStatusCheckbox,
          arrayStatusPrice,
          sumQuantity,
     ])

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
     }, [
          arrayStatusCheckbox.length,
          arrayStatusCheckboxFalse.length,
          arrayStatusCheckbox,
     ])

     const ClickAllDelete = () => {
          if (arrayStatusCheckbox.length > 0) {
               arrayStatusCheckbox.forEach((item) => {
                    console.log(item.id)
                    const idProductDel = item.id.split("_")[0]

                    setArrayProductCart(
                         arrayProductCart.filter((product) => {
                              return product.id !== Number(idProductDel)
                         })
                    )
                    localStorage.setItem(
                         "product",
                         JSON.stringify(
                              arrayProductCart.filter((product) => {
                                   return product.id !== Number(idProductDel)
                              })
                         )
                    )
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
                         quantity.idQuantity == e.target.id.split("_")[0] &&
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
                    if (quantity.idQuantity == e.target.id.split("_")[0]) {
                         return {
                              ...quantity,
                              sumQuantity: quantity.sumQuantity + 1,
                         }
                    }
                    return quantity
               })
          })
     }
     useEffect(() => {
          setArrayProductCart((products) => {
               return products.map((product, index) => {
                    if (product.id == sumQuantity[index].idQuantity) {
                         return {
                              ...product,
                              quantity: sumQuantity[index].sumQuantity,
                         }
                    }
                    return product
               })
          })
          localStorage.setItem(
               "product",
               JSON.stringify(
                    arrayProductCart?.map((product, index) => {
                         if (product.id == sumQuantity[index].idQuantity) {
                              return {
                                   ...product,
                                   quantity: sumQuantity[index].sumQuantity,
                              }
                         }
                         return product
                    })
               )
          )
     }, [sumQuantity])

     // const handlerSumPrice = (e) => {
     //      // setSumQuantity((quantitys) => {
     //      //      return quantitys.map((quantity) => {
     //      //           if (quantity.idQuantity == e.target.id.split("_")[0]) {
     //      //                return {
     //      //                     ...quantity,
     //      //                     sumQuantity: Number(e.target.value),
     //      //                }
     //      //           }
     //      //           return quantity
     //      //      })
     //      // })
     //      // setArrayProductCart((products) => {
     //      //      return products.map((product) => {
     //      //           if (product.id == e.target.id.split("_")[0]) {
     //      //                console.log(product)
     //      //                return {
     //      //                     ...product,
     //      //                     quantity: Number(e.target.value),
     //      //                }
     //      //           }
     //      //           return product
     //      //      })
     //      // })
     //      // console.log(arrayProductCart)
     //      // localStorage.setItem("product", JSON.stringify(arrayProductCart))
     // }
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
                                   product.id
                              ) {
                                   shouldFilter = true
                              }
                         })
                         return !shouldFilter
                    })
               })
               localStorage.setItem(
                    "product",
                    JSON.stringify(
                         arrayProductCart?.filter((product) => {
                              let shouldFilter = false
                              arrayStatusCheckbox.forEach((status) => {
                                   if (
                                        Number(status.id.split("_")[0]) ===
                                        product.id
                                   ) {
                                        shouldFilter = true
                                   }
                              })
                              return !shouldFilter
                         })
                    )
               )

               setIsLayoutPay(false)

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
          } else {
               alert("Bạn chưa chọn sản phẩm")
          }
     }
     return (
          <>
               {isLayoutPay ? (
                    <LayoutPay
                         allPrice={sumPrice}
                         clickCancel={() => setIsLayoutPay(false)}
                         clickPay={clickPay}
                    />
               ) : null}
               <Banner isCart="true" />
               {arrayProductCart?.length > 0 ? (
                    <>
                         <div className="flex justify-between">
                              <div className="flex mx-[400px]">
                                   <div className="ml-[-200px]">Sản phẩm</div>
                              </div>
                              <div className="flex mr-[400px]">
                                   <div className="mx-5 relative left-[60px] w-[100px]">
                                        Đơn giá
                                   </div>
                                   <div className="mx-5 relative left-[120px] w-[100px]">
                                        Số lượng
                                   </div>
                                   <div className="mx-5 relative left-[180px] w-[100px] ">
                                        Số tiền
                                   </div>
                                   <div className="mx-5 relative left-[140px] w-[100px]">
                                        Thao tác
                                   </div>
                              </div>
                         </div>
                         <div className="mt-[20px]  h-[440px] overflow-auto">
                              {arrayProductCart.map((product, index) => {
                                   return (
                                        <div key={`${product.id}_${index}`}>
                                             <CartProduct
                                                  linkPicture={
                                                       product.thumbnail
                                                  }
                                                  description={
                                                       product.description
                                                  }
                                                  price={product.price}
                                                  onClick={handlerDelProduct}
                                                  id={product.id}
                                                  currentPrice={
                                                       sumQuantity[index]
                                                            .sumQuantity *
                                                       product.price
                                                  }
                                                  // handlerSumPrice={
                                                  //      handlerSumPrice
                                                  // }
                                                  quantitys={
                                                       sumQuantity[index]
                                                            .sumQuantity
                                                  }
                                                  onChange={hanglerSumProduct}
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
                              })}
                         </div>

                         <div>
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
