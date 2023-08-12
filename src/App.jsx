import { useState, useContext } from "react"
import "./App.css"
import Banner from "./Banner"
import BannerTwo from "./BannerTwo"
import LayoutProduct from "./LayoutProduct"
import Category from "./Category"

import { DataContext } from "./DataContext"
function App() {
     const [visibleProducts, setVisibleProducts] = useState(5)
     const dataProduct = useContext(DataContext)

     const handleSeeMore = () => {
          setVisibleProducts(visibleProducts + 5)
     }

     const handleSeeLess = () => {
          setVisibleProducts(visibleProducts - 5)
     }

     return (
          <>
               <Banner data={dataProduct} statusBanner="fixed" />
               <BannerTwo />
               <Category data={dataProduct} />
               <div className="flex flex-wrap w-[1200px] relative left-[300px]">
                    {dataProduct.slice(0, visibleProducts).map((product) => (
                         <LayoutProduct
                              key={product.id}
                              thumbnail={product.thumbnail}
                              title={product.title}
                              description={product.description}
                              price={product.price}
                              id={product.id}
                              data={dataProduct}
                         />
                    ))}
               </div>
               <div className="flex justify-center">
                    {visibleProducts < 6 ? (
                         <button
                              onClick={handleSeeMore}
                              className="border-2 w-[390px] h-[40px]"
                         >
                              Xem thêm
                         </button>
                    ) : visibleProducts >= dataProduct.length ? (
                         <div>
                              <button
                                   onClick={handleSeeLess}
                                   className="border-2 w-[390px] h-[40px]"
                              >
                                   Ẩn
                              </button>
                         </div>
                    ) : (
                         <div>
                              <button
                                   onClick={handleSeeMore}
                                   className="border-2 w-[390px] h-[40px]"
                              >
                                   Xem thêm
                              </button>
                              <div>
                                   <button
                                        onClick={handleSeeLess}
                                        className="border-2 w-[390px] h-[40px]"
                                   >
                                        Ẩn
                                   </button>
                              </div>
                         </div>
                    )}
               </div>
          </>
     )
}

export default App
