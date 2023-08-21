import { useEffect, useRef, useState } from "react"
import CartProduct from "./CartProduct"
import Pay from "./Pay"
import Banner from "./Banner"
import emptyshoppingcart from "./Picture/emptyshoppingcart.png"
import { useNavigate } from "react-router-dom"
import LayoutPay from "./LayoutPay"
import ModalProduct from "./ModalProduct"
import { v4 as uuidv4 } from "uuid"
import moment from "moment"
const Cart = () => {
     const userNow = JSON.parse(localStorage.getItem("userNow"))
     const initialProductCart = JSON.parse(
          localStorage.getItem("product") || "[]"
     )
     const [arrayProductCart, setArrayProductCart] = useState(
          initialProductCart.filter((product) => product.userId == userNow.id)
     )

     const dataProductOther = useRef(
          initialProductCart.filter((product) => product.userId != userNow.id)
     )
     const [isModal, setIsModal] = useState(false)

     useEffect(() => {}, [arrayProductCart, userNow.id])
     useEffect(() => {
          let dataLocal = [...arrayProductCart, ...dataProductOther.current]
          localStorage.setItem("product", JSON.stringify(dataLocal))
     }, [arrayProductCart, dataProductOther])

     const [sumProductCart, setSumProductCart] = useState(0)
     const [sumPrice, setSumPrice] = useState(0)

     const [statusCheckBox, setStatusCheckBox] = useState(
          arrayProductCart
               ?.filter((product) => product.userId === userNow.id)
               .map((product) => ({
                    idCheckBox: product.id,
                    statusCheckBoxProduct: false,
               }))
     )

     const [sumQuantity, setSumQuantity] = useState(
          arrayProductCart
               ?.filter((product) => product.userId === userNow.id)
               .map((product) => {
                    return {
                         idQuantity: product.id,
                         sumQuantity: product.quantity,
                    }
               })
     )
     const [arrayStatusPrice, setArrayStatusPrice] = useState(
          arrayProductCart
               ?.filter((product) => product.userId === userNow.id)
               .map((product) => ({
                    idPrice: product.id,
                    sumPrice: product.quantity * product.price,
               }))
     )

     const [isLayoutPay, setIsLayoutPay] = useState(false)
     const [allChecked, setAllChecked] = useState(false)

     const navigate = useNavigate()

     useEffect(() => {
          setArrayStatusPrice(
               arrayProductCart
                    ?.filter((product) => product.userId === userNow.id)
                    .map((product) => ({
                         idPrice: product.id,
                         sumPrice: product.quantity * product.price,
                    }))
          )
     }, [arrayProductCart, userNow.id])

     useEffect(() => {
          setSumProductCart(
               statusCheckBox.filter(
                    (status) => status.statusCheckBoxProduct == true
               ).length
          )
     }, [statusCheckBox])

     useEffect(() => {
          const checkBoxProduct = () => {
               let arrray = []
               statusCheckBox.forEach((item) => {
                    arrayStatusPrice.forEach((value) => {
                         if (
                              item.statusCheckBoxProduct == true &&
                              item.idCheckBox == value.idPrice
                         ) {
                              arrray.push(Number(value.sumPrice))
                         } else return
                    })
               })
               const sumWithInitial = arrray.reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
               )
               setSumPrice(sumWithInitial)
          }
          checkBoxProduct()
     }, [statusCheckBox, arrayStatusPrice])

     useEffect(() => {
          setSumQuantity((quantitys) => {
               const updatedQuantitys = quantitys.filter((quantity) => {
                    return arrayProductCart.some(
                         (product) => product.id === quantity.idQuantity
                    )
               })
               return updatedQuantitys
          })
          setStatusCheckBox((productCheckBox) => {
               const updatedQuantitys = productCheckBox.filter(
                    (productCheckBox) => {
                         return arrayProductCart.some(
                              (product) =>
                                   product.id === productCheckBox.idCheckBox
                         )
                    }
               )
               return updatedQuantitys
          })
     }, [arrayProductCart])
     useEffect(() => {
          if (
               statusCheckBox.every(
                    (CheckBox) => CheckBox.statusCheckBoxProduct == true
               )
          ) {
               setAllChecked(true)
          } else if (
               statusCheckBox.some(
                    (CheckBox) => CheckBox.statusCheckBoxProduct == false
               )
          ) {
               setAllChecked(false)
          }
     }, [statusCheckBox])
     useEffect(() => {
          setStatusCheckBox((prevCheckBoxes) => {
               const updatedCheckBoxes = prevCheckBoxes.filter((checkBox) => {
                    return arrayProductCart.some(
                         (product) => product.id === checkBox.idCheckBox
                    )
               })

               return updatedCheckBoxes
          })
     }, [arrayProductCart])

     const handlerDelProduct = (e) => {
          const productId = Number(e.target.id)

          const newArray = arrayProductCart.filter((product) => {
               if (product.id == productId) {
                    return false
               }
               return true
          })
          setArrayProductCart(newArray)
     }

     const clickCheckBoxProduct = (e) => {
          let clickedProductId = e.target.id.split("_")[0]
          setStatusCheckBox((prevStatusCheckBox) => {
               return prevStatusCheckBox.map((status) => {
                    if (status.idCheckBox == clickedProductId) {
                         return {
                              ...status,
                              statusCheckBoxProduct:
                                   !status.statusCheckBoxProduct,
                         }
                    }
                    return status
               })
          })
     }

     const onClickCheckBoxAll = () => {
          setAllChecked(!allChecked)
          setStatusCheckBox((status) => {
               return status.map((CheckBox) => {
                    return {
                         ...CheckBox,
                         statusCheckBoxProduct: !allChecked,
                    }
               })
          })

          // console.log(statusCheckBox)
          // const updatedStatusCheckBox = statusCheckBox.map((checkBox) => ({
          //      ...checkBox,
          //      statusCheckBoxProduct: !allChecked,
          // }))
          // setStatusCheckBox(updatedStatusCheckBox)
          // setAllChecked(!allChecked)
     }

     const ClickAllDelete = () => {
          if (
               statusCheckBox.every(
                    (CheckBox) => CheckBox.statusCheckBoxProduct == false
               )
          ) {
               alert("Bạn chưa chọn sản phẩm")
          } else {
               setArrayProductCart((a) => {
                    return a.filter((product, index) => {
                         let x = false
                         if (
                              product.id ===
                                   Number(statusCheckBox[index].idCheckBox) &&
                              Number(statusCheckBox[index].idCheckBox)
                                   .statusCheckBoxProduct == true
                         ) {
                              x = true
                         }
                         return !x
                    })
               })

               setStatusCheckBox((a) => {
                    return a.filter((product) => {
                         let x = false
                         if (product.statusCheckBoxProduct == true) {
                              x = true
                         }
                         return !x
                    })
               })
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
          setArrayProductCart((products) => {
               return products.map((product) => {
                    if (product.id == e.target.id.split("_")[0]) {
                         return {
                              ...product,
                              quantity: product.quantity - 1,
                         }
                    }
                    return product
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
          setArrayProductCart((products) => {
               return products.map((product) => {
                    if (product.id == e.target.id.split("_")[0]) {
                         return {
                              ...product,
                              quantity: product.quantity + 1,
                         }
                    }
                    return product
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
     const [checkInfor, setCheckInfor] = useState(true)
     const clickPay = () => {
          if (
               statusCheckBox.filter(
                    (status) => status.statusCheckBoxProduct == true
               ).length > 0 &&
               checkInfor == true
          ) {
               alert("Đặt hàng thành công")
               setArrayProductCart((products) => {
                    return products.filter((product) => {
                         let shouldFilter = false
                         statusCheckBox.forEach((status) => {
                              if (
                                   Number(status.idCheckBox) === product.id &&
                                   status.statusCheckBoxProduct == true
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
                         statusCheckBox.forEach((status) => {
                              if (
                                   Number(status.idCheckBox) === product.id &&
                                   status.statusCheckBoxProduct == true
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
          } else if (checkInfor == false) {
               alert("Hãy điền đầy đủ thông tin")
          } else {
               alert("Bạn chưa chọn sản phẩm")
          }
          console.log(checkInfor)
     }
     const clickCancel = () => {
          setIsLayoutPay(false)
     }
     useEffect(() => {
          if (sumQuantity.some((item) => item.sumQuantity == 0)) {
               setIsModal(true)
          }
     }, [sumQuantity])
     const onOkeModal = () => {
          const x = arrayProductCart.filter((item) => item.quantity != 0)
          setArrayProductCart(x)
          setIsModal(false)
     }

     return (
          <>
               <Banner isCart="true" />
               <ModalProduct
                    isModal={isModal}
                    onCancel={() => setIsModal(false)}
                    onOke={onOkeModal}
               />
               {isLayoutPay ? (
                    <LayoutPay
                         allPrice={sumPrice}
                         clickCancel={clickCancel}
                         clickPay={clickPay}
                         check={setCheckInfor}
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
                                                            clickCheckBoxProduct={
                                                                 clickCheckBoxProduct
                                                            }
                                                            statusCheckbox={
                                                                 statusCheckBox[
                                                                      index
                                                                 ]
                                                                      ?.statusCheckBoxProduct
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
                                                            quantitys={
                                                                 sumQuantity[
                                                                      index
                                                                 ]?.sumQuantity
                                                            }
                                                            // onChange={
                                                            //      hanglerSumProduct
                                                            // }
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
                                        onClickAll={ClickAllDelete}
                                        onClick={handlerPayProduct}
                                        clickAllCheckBox={allChecked}
                                        onClickCheckBoxAll={onClickCheckBoxAll}
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
