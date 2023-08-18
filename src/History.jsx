import Banner from "./Banner"
import { useState, useEffect } from "react"
const History = () => {
     const [arrayProduct, setArrayProduct] = useState(
          JSON.parse(localStorage.getItem("history") || "[]")
     )
     useEffect(() => {
          const userNow = JSON.parse(localStorage.getItem("userNow"))
          if (userNow) {
               setArrayProduct((a) =>
                    a?.filter((product) => {
                         return product.user == userNow.id
                    })
               )
          } else {
               null
          }
     }, [])
     return (
          <>
               <Banner />
               {arrayProduct.length > 0 ? (
                    <>
                         <div>Lịch sử đặt hàng</div>
                         <div className="flex justify-around mt-[20px]">
                              <div className="relative left-[-45px]">
                                   Số thứ tự
                              </div>
                              <div>Mã hàng</div>
                              <div>Thời gian</div>
                              <div>Tổng tiền</div>
                              <div>Trạng thái</div>
                              <div>Chi tiết</div>
                         </div>
                         <div>
                              {arrayProduct.map((products, index) => {
                                   return (
                                        <div
                                             key={index}
                                             className="flex my-[40px] border-2 h-auto"
                                        >
                                             <div className="relative left-[80px] my-auto">
                                                  {index + 1}
                                             </div>
                                             <div className="relative w-[300px] left-[250px] my-auto">
                                                  {products.idCart}
                                             </div>
                                             <div className="relative left-[300px] my-auto">
                                                  {products.time}
                                             </div>
                                             <div className="relative left-[490px] my-auto">
                                                  {products.sumPrice}$
                                             </div>
                                             <div className="relative left-[700px] my-auto">
                                                  Hoàn thành
                                             </div>
                                             <div className="relative left-[870px] my-auto w-[130px] ">
                                                  {products.arrayProduct.map(
                                                       (product, index) => {
                                                            console.log(product)
                                                            return (
                                                                 <div
                                                                      key={`${index}_title`}
                                                                      className="my-[10px]"
                                                                 >
                                                                      <div>
                                                                           {
                                                                                product.title
                                                                           }{" "}
                                                                           (
                                                                           {
                                                                                product.quantity
                                                                           }
                                                                           )
                                                                      </div>
                                                                 </div>
                                                            )
                                                       }
                                                  )}
                                             </div>
                                        </div>
                                   )
                              })}
                         </div>
                    </>
               ) : (
                    <>
                         <div className="text-center mt-[100px]">
                              Bạn chưa có đơn đặt hàng nào
                         </div>{" "}
                    </>
               )}
          </>
     )
}
export default History
