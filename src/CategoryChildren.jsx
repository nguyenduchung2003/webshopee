import { useLocation } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import LayoutProduct from "./LayoutProduct"
import Category from "./Category"
import Banner from "./Banner"
import { DataContext } from "./DataContext"
const CategoryChildren = () => {
     const { state } = useLocation()
     const [linkCategory, setLinkCategory] = useState(state.title)
     const [linkDataCategory, setlinkDataCategory] = useState(state.data)

     useEffect(() => {
          setLinkCategory(state.title)
          setlinkDataCategory(state.data)
     }, [state.title, state.data])

     const dataProduct = useContext(DataContext)
     return (
          <>
               <Banner />
               <Category data={dataProduct} />
               <div className="flex flex-wrap w-[1200px] relative left-[300px] ">
                    {linkDataCategory.map((product) => {
                         if (product.category == linkCategory) {
                              return (
                                   <>
                                        <LayoutProduct
                                             thumbnail={product.thumbnail}
                                             title={product.title}
                                             description={product.description}
                                             price={product.price}
                                             id={product.id}
                                             data={state.data}
                                        />
                                   </>
                              )
                         } else {
                              null
                         }
                    })}
               </div>
          </>
     )
}
export default CategoryChildren
