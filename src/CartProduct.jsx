import PropTypes from "prop-types"
import { useEffect, useState } from "react"
const CartProduct = ({
     linkPicture,
     description,
     price,
     onClick,
     id,
     quantity,
     statusCheckbox,
     onChange,
}) => {
     const [currentPrice, setCurrentPrice] = useState(price)
     const [quantitys, setQuantitys] = useState(quantity)
     const handlerSumPrice = (e) => {
          setQuantitys(e.target.value)
     }
     useEffect(() => {
          setCurrentPrice(quantitys * price)
     }, [quantitys, price])
     return (
          <>
               <div className="flex border-2 mb-5 w-[1300px] h-[120px] ml-[150px] justify-between mt-[17px]">
                    <input
                         type="checkbox"
                         id={`${id}_checkbox`}
                         defaultChecked={statusCheckbox}
                         onChange={onChange}
                         className="relative left-[50px] scale-[1.75]"
                    />
                    <div className="flex">
                         <img
                              src={linkPicture}
                              alt=""
                              className="w-[200px] h-[100px] my-[auto] mx-0 mr-[30px] "
                         />
                         <div className=" text-center my-[auto] mx-0 w-[400px]">
                              {description}
                         </div>
                    </div>
                    <div className=" my-[auto] mx-0 w-7">{price}$</div>
                    <input
                         type="number"
                         id={`${id}_input`}
                         value={quantitys}
                         className=" border-2 h-[50px] my-[auto] mx-0 "
                         min="0"
                         onChange={handlerSumPrice}
                    />
                    <div className="my-[auto] mx-0 w-[50px]" id={`${id}_price`}>
                         {currentPrice}
                    </div>
                    <button
                         className="my-[auto] mx-0 relative right-10"
                         onClick={onClick}
                         id={id}
                    >
                         Xóa
                    </button>
               </div>
          </>
     )
}
CartProduct.propTypes = {
     linkPicture: PropTypes.any,
     description: PropTypes.any,
     price: PropTypes.any,
     onClick: PropTypes.any,
     id: PropTypes.any,
     quantity: PropTypes.any,
     statusCheckbox: PropTypes.any,
     onChange: PropTypes.any,
}
export default CartProduct
