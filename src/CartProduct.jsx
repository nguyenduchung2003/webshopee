import PropTypes from "prop-types"

const CartProduct = ({
     linkPicture,
     description,
     price,
     onClick,
     id,
     statusCheckbox,
     onChange,
     handlerClickDecrement,
     handlerClickIncrease,
     quantitys,
     handlerSumPrice,
     currentPrice,
     clickCheckBoxProduct,
}) => {
     return (
          <>
               <div
                    className={`flex border-2 mb-5 w-[1300px] h-[120px] ml-[130px] justify-between mt-[17px]  `}
               >
                    <input
                         type="checkbox"
                         id={`${id}_checkbox`}
                         // defaultChecked={false}
                         checked={statusCheckbox}
                         // onChange={onChange}
                         readOnly
                         className="relative left-[7px] scale-[1.75] w-[10px] h-[10px] my-auto"
                         onClick={clickCheckBoxProduct}
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
                         className="border-2 w-[38px] h-[40px] relative my-[auto] left-[46px]"
                         type="button"
                         value="-"
                         onClick={handlerClickDecrement}
                         id={`${id}_decrement`}
                    />
                    <input
                         type="number"
                         id={`${id}_input`}
                         value={quantitys}
                         className=" border-y-2 h-[40px] w-[160px] my-[auto] mx-0 text-center"
                         min="0"
                         readOnly
                         // onChange={handlerSumPrice}
                    />
                    <input
                         className="border-2 w-[38px] h-[40px] relative my-[auto] left-[-47px]"
                         type="button"
                         value="+"
                         onClick={handlerClickIncrease}
                         id={`${id}_increase`}
                    ></input>
                    <div
                         className="my-[auto] mx-0 w-[50px] relative left-[-40px]"
                         id={`${id}_price`}
                    >
                         {currentPrice}$
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
     handlerClickDecrement: PropTypes.any,
     handlerClickIncrease: PropTypes.any,
     quantitys: PropTypes.any,
     handlerSumPrice: PropTypes.any,
     currentPrice: PropTypes.any,
     mlProducts: PropTypes.any,
     maxWProducts: PropTypes.any,
}
export default CartProduct
