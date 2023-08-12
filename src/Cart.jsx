import { useEffect, useState } from "react"
import CartProduct from "./CartProduct"
import Pay from "./Pay"
import Banner from "./Banner"
const Cart = () => {
     let productCart
     if (JSON.parse(localStorage.getItem("product"))) {
          productCart = JSON.parse(localStorage.getItem("product"))
     } else {
          productCart = []
     }
     const [arrayProductCart, setArrayProductCart] = useState(productCart)
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
     useEffect(() => {
          const userNow = JSON.parse(localStorage.getItem("userNow"))
          if (userNow) {
               setArrayProductCart((a) =>
                    a.filter((product) => {
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
     const handlerDelProduct = (e) => {
          setArrayProductCart(
               arrayProductCart.filter((product) => {
                    return product.id !== Number(e.target.id)
               })
          )
          localStorage.setItem(
               "product",
               JSON.stringify(
                    arrayProductCart.filter((product) => {
                         return product.id !== Number(e.target.id)
                    })
               )
          )
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
                                   Number(arrayStatusPrice[index].innerText)
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
          console.log(arrayStatusCheckbox)
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
     }

     return (
          <>
               <Banner isCart="true" />

               <div className="flex justify-between">
                    <div className="flex mx-[400px]">
                         <div className="ml-[-200px]">Sản phẩm</div>
                    </div>
                    <div className="flex mr-[400px]">
                         <div className="mx-5 relative left-[120px] w-[100px]">
                              Đơn giá
                         </div>
                         <div className="mx-5 relative left-[90px] w-[100px]">
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
                    {arrayProductCart
                         ? arrayProductCart.map((product) => {
                                return (
                                     <>
                                          <CartProduct
                                               linkPicture={product.thumbnail}
                                               description={product.description}
                                               price={product.price}
                                               onClick={handlerDelProduct}
                                               id={product.id}
                                               quantity={product.quantity}
                                               //   statusCheckbox={statusCheckbox}
                                               onChange={hanglerSumProduct}
                                          />
                                     </>
                                )
                           })
                         : null}
               </div>

               <div>
                    {arrayProductCart ? (
                         <Pay
                              sumProduct={sumProductCart}
                              sumPrice={sumPrice}
                              onChange={ClickAllCheckBox}
                              onClickAll={ClickAllDelete}
                         />
                    ) : null}
               </div>
          </>
     )
}
export default Cart
