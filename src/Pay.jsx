import PropTypes from "prop-types"

const Pay = ({
     sumProduct,
     sumPrice,
     onChange,
     onClickAll,
     onClick,
     clickAllCheckBox,
     onClickCheckBoxAll,
}) => {
     return (
          <>
               <div className="flex justify-between ">
                    <div className="flex mt-10 ml-[100px]">
                         <div className="mx-10 flex">
                              <input
                                   type="checkbox"
                                   readOnly
                                   checked={clickAllCheckBox}
                                   id="allCheckBox"
                                   className="mt-[-8px]"
                                   onClick={onClickCheckBoxAll}
                              />
                              <label htmlFor="allCheckBox" className="mt-[2px]">
                                   Chọn tất cả
                              </label>
                         </div>

                         <div onClick={onClickAll} className="mt-[2px]">
                              Xóa
                         </div>
                    </div>
                    <div className="flex relative mt-10 mr-[100px]">
                         <div className="relative  w-[200px] mt-[7px] mr-10">
                              Tổng sản phẩm ({sumProduct}):{sumPrice} $
                         </div>
                         <button
                              className="relative  w-[210px] h-[40px] bg-red-500"
                              onClick={onClick}
                         >
                              Mua hàng
                         </button>
                    </div>
               </div>
          </>
     )
}

Pay.propTypes = {
     sumPrice: PropTypes.any,
     sumProduct: PropTypes.any,
     onChange: PropTypes.any,
     onClickAll: PropTypes.any,
     onClick: PropTypes.any,
     clickAllCheckBox: PropTypes.any,
}
export default Pay
