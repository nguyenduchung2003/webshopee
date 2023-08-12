import { createContext } from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { PropTypes } from "prop-types"
export const DataContext = createContext()
const DataAPIContext = ({ children }) => {
     const [dataProduct, setDataProduct] = useState([])
     useEffect(() => {
          const getData = async () => {
               const ApiProduct = await axios.get(
                    "https://dummyjson.com/products"
               )
               setDataProduct(ApiProduct.data.products)
          }
          getData()
     }, [])
     return (
          <>
               <DataContext.Provider value={dataProduct}>
                    {children}
               </DataContext.Provider>
          </>
     )
}
DataAPIContext.propTypes = {
     children: PropTypes.any,
}
export default DataAPIContext
