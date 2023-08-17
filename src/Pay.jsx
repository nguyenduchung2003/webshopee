import PropTypes from "prop-types"
const Pay = ({ sumProduct, sumPrice, onChange, onClickAll, onClick }) => {
     return (
          <>
               <div className="flex justify-between absolute left-[150px]">
                    <div className="flex ">
                         <div className="mx-10 flex">
                              <input
                                   type="checkbox"
                                   onChange={onChange}
                                   id="allCheckBox"
                              />
                              <label htmlFor="allCheckBox" className="mt-[7px]">
                                   Chọn tất cả
                              </label>
                         </div>

                         <div onClick={onClickAll} className="mt-[7px]">
                              Xóa
                         </div>
                    </div>
                    <div className="flex relative left-[550px]">
                         <div className="relative left-[100px] w-[200px] mt-[7px]">
                              Tổng sản phẩm ({sumProduct}):{sumPrice} $
                         </div>
                         <button
                              className="relative left-[179px] w-[210px] h-[40px] bg-red-500"
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
}
export default Pay
