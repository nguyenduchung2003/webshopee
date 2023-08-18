import { useEffect, useState, useRef } from "react"
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

     // const [sumQuantity, setSumQuantity] = useState(
     //      arrayProductCart?.map((product) => {
     //           if (product.userId == userNow.id) {
     //                return {
     //                     idQuantity: product.id,
     //                     sumQuantity: product.quantity,
     //                }
     //           } else return []
     //      })
     // )
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
     // useEffect(() => {
     //      const updatedSumQuantity = arrayProductCart?.map((product) => {
     //           if (product.userId === userNow.id) {
     //                return {
     //                     idQuantity: product.id,
     //                     sumQuantity: product.quantity,
     //                }
     //           }
     //           return null
     //      })
     //      if (
     //           JSON.stringify(updatedSumQuantity) !==
     //           JSON.stringify(sumQuantity)
     //      ) {
     //           setSumQuantity(updatedSumQuantity)
     //      }
     // }, [arrayProductCart, userNow])
     const [isLayoutPay, setIsLayoutPay] = useState(false)

     // const prevArrayProductCartRef = useRef(sumQuantity)
     const navigate = useNavigate()
     // useEffect(() => {
     //      if (userNow) {
     //           setArrayProductCart((a) =>
     //                a?.filter((product) => {
     //                     return product.userId == userNow.id
     //                })
     //           )
     //      } else {
     //           null
     //      }
     // }, [])

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

     useEffect(() => {
          setArrayStatusPrice(document.querySelectorAll('div[id$="_price"]'))
     }, [arrayProductCart])
     useEffect(() => {
          setSumProductCart(arrayStatusCheckbox.length)
     }, [arrayStatusCheckbox.length])

     useEffect(() => {
          const checkBoxProduct = () => {
               let arrray = []
               // setSumProductCart(arrayStatusCheckbox.length)
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

     // useEffect(() => {
     //      if (prevArrayProductCartRef.current.length === 0) {
     //           prevArrayProductCartRef.current = sumQuantity
     //           return
     //      }

     //      setArrayProductCart((products) => {
     //           return products.map((product, index) => {
     //                const prevCartItem = prevArrayProductCartRef.current[index]

     //                if (
     //                     prevCartItem &&
     //                     product.id === prevCartItem.idQuantity &&
     //                     product.userId === userNow.id
     //                ) {
     //                     return {
     //                          ...product,
     //                          quantity: prevCartItem.sumQuantity,
     //                     }
     //                }
     //                return product
     //           })
     //      })

     //      prevArrayProductCartRef.current = sumQuantity
     // }, [userNow, sumQuantity])

     useEffect(() => {
          localStorage.setItem("product", JSON.stringify(arrayProductCart))
     }, [arrayProductCart])
     // useEffect(() => {
     //      const storedProduct = JSON.parse(
     //           localStorage.getItem("product") || "[]"
     //      )
     //      if (
     //           JSON.stringify(storedProduct) !==
     //           JSON.stringify(arrayProductCart)
     //      ) {
     //           localStorage.setItem("product", JSON.stringify(arrayProductCart))
     //      }
     // }, [arrayProductCart])
     // const prevArrayProductCartRef = useRef(arrayProductCart)

     // useEffect(() => {
     //      const prevArrayProductCart = prevArrayProductCartRef.current

     //      if (prevArrayProductCart !== arrayProductCart) {
     //           localStorage.setItem("product", JSON.stringify(arrayProductCart))
     //           prevArrayProductCartRef.current = arrayProductCart
     //      }
     // }, [arrayProductCart])
     // const maxwithProduct = useRef()
     // const mlProducts = useRef()
     // const maxWProducts = useRef()
     // const leftProduct = useRef()
     // const leftContent = useRef()
     // const leftPrice = useRef()
     // const leftQuantity = useRef()
     // const leftMoney = useRef()

     // useEffect(() => {
     //      if (isLayoutPay) {
     //           maxwithProduct.current = "70rem"
     //           mlProducts.current = "10px"
     //           maxWProducts.current = "95%"
     //           leftProduct.current = "100px"
     //           leftContent.current = "400px"
     //           leftPrice.current = "250px"
     //           leftQuantity.current = "240px"
     //           leftMoney.current = "230px"
     //      } else {
     //           maxwithProduct.current = "100rem"
     //           mlProducts.current = "150px"
     //           maxWProducts.current = "100%"
     //           leftProduct.current = "250px"
     //           leftContent.current = "800px"
     //           leftPrice.current = "60px"
     //           leftQuantity.current = "120px"
     //           leftMoney.current = "180px"
     //      }
     // }, [isLayoutPay])

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

          // localStorage.setItem("product", JSON.stringify(newArray))
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

     const maxwithProduct = useRef("100rem")
     const mlProducts = useRef("120px")
     const maxWProducts = useRef("100%")
     const leftProduct = useRef("250px")
     const leftContent = useRef("800px")
     const leftPrice = useRef("40px")
     const leftQuantity = useRef("190px")
     const leftMoney = useRef("335px")
     const leftActive = useRef("370px")

     const handlerPayProduct = () => {
          setIsLayoutPay(true)
          maxwithProduct.current = "75rem"
          mlProducts.current = "10px"
          maxWProducts.current = "90%"
          leftProduct.current = "100px"
          leftContent.current = "400px"
          leftPrice.current = "270px"
          leftQuantity.current = "365px"
          leftMoney.current = "440px"
          leftActive.current = "440px"
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
          maxwithProduct.current = "100rem"
          mlProducts.current = "120px"
          maxWProducts.current = "100%"
          leftProduct.current = "250px"
          leftContent.current = "800px"
          leftPrice.current = "40px"
          leftQuantity.current = "190px"
          leftMoney.current = "335px"
          leftActive.current = "370px"
     }

     return (
          <>
               {isLayoutPay ? (
                    <LayoutPay
                         allPrice={sumPrice}
                         clickCancel={() => {
                              maxwithProduct.current = "100rem"
                              mlProducts.current = "120px"
                              maxWProducts.current = "100%"
                              leftProduct.current = "250px"
                              leftContent.current = "800px"
                              leftPrice.current = "40px"
                              leftQuantity.current = "190px"
                              leftMoney.current = "335px"
                              leftActive.current = "370px"
                              return setIsLayoutPay(false)
                         }}
                         clickPay={clickPay}
                    />
               ) : null}
               <Banner isCart="true" />

               {arrayProductCart?.length > 0 &&
               arrayProductCart.some((x) => x.userId == userNow.id) ? (
                    <>
                         <div className={` max-w-[${maxwithProduct.current}]`}>
                              {/* <div className="flex "> */}
                              <div
                                   className={`absolute top-[130px] left-[${leftProduct.current}]`}
                              >
                                   Sản phẩm
                              </div>
                              {/* left-[${leftContent.current}]  */}
                              <div
                                   className={`flex absolute top-[130px] left-[${leftContent.current}]`}
                              >
                                   <div
                                        className={`relative left-[${leftPrice.current}]`}
                                   >
                                        Đơn giá
                                   </div>
                                   <div
                                        className={`relative left-[${leftQuantity.current}] `}
                                   >
                                        Số lượng
                                   </div>
                                   <div
                                        className={`relative left-[${leftMoney.current}]`}
                                   >
                                        Số tiền
                                   </div>
                                   <div
                                        className={`relative left-[${leftActive.current}] `}
                                   >
                                        Thao tác
                                   </div>
                              </div>
                              {/* </div> */}
                              <div className="mt-[20px] h-[440px] overflow-auto">
                                   {arrayProductCart.map((product, index) => {
                                        if (product.userId == userNow.id) {
                                             return (
                                                  <div
                                                       key={`${product.id}_${index}`}
                                                  >
                                                       <CartProduct
                                                            mlProducts={
                                                                 mlProducts.current
                                                            }
                                                            maxWProducts={
                                                                 maxWProducts.current
                                                            }
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
                                                            // handlerSumPrice={
                                                            //      handlerSumPrice
                                                            // }
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
