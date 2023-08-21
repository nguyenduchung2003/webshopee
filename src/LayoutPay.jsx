import { useEffect, useState } from "react"
import PropTypes from "prop-types"
const LayoutPay = ({ clickPay, clickCancel, allPrice, check }) => {
     const [name, setName] = useState("")
     const [phone, setPhone] = useState("")
     const [address, setAddress] = useState("")
     useEffect(() => {
          if (!name || !phone || !address) {
               check(false)
          } else {
               check(true)
          }
     }, [name, phone, address, check])
     const changeName = (e) => {
          setName(e.target.value)
     }
     const changePhone = (e) => {
          setPhone(e.target.value)
     }
     const changeAddress = (e) => {
          setAddress(e.target.value)
     }
     return (
          <>
               <div className="border-2 w-full h-[460px] text-center flex flex-col justify-center items-center">
                    <button
                         className="relative left-[740px] top-[5px]"
                         onClick={clickCancel}
                    >
                         X
                    </button>
                    <div className="text-center">Phiếu thanh toán</div>
                    <div>
                         <div className="flex relative top-5">
                              <label htmlFor="name">Tên người nhận :</label>
                              <input
                                   type="text"
                                   id="name"
                                   placeholder="Tên người nhận"
                                   className="border-2 "
                                   value={name}
                                   onChange={changeName}
                              />
                         </div>
                         <div className="flex relative top-10 ">
                              <label htmlFor="phone">Số điện thoại :</label>
                              <input
                                   type="text"
                                   name=""
                                   id="phone"
                                   placeholder="Số điện thoại người nhận"
                                   className="border-2 "
                                   value={phone}
                                   onChange={changePhone}
                              />
                         </div>
                         <div className="flex relative top-[60px]">
                              <label htmlFor="address">Địa chỉ :</label>
                              <textarea
                                   id="address"
                                   cols="40"
                                   rows="7"
                                   className="border-2"
                                   placeholder="Địa chỉ người nhận"
                                   value={address}
                                   onChange={changeAddress}
                              ></textarea>
                         </div>
                    </div>

                    <div className="relative top-[100px]">
                         Tổng tiền : {`${allPrice}`} $
                    </div>
                    <button
                         className="relative my-[auto] top-[60px] left-[50px]  w-[210px] h-[40px] bg-red-500"
                         onClick={clickPay}
                    >
                         Đặt hàng
                    </button>
               </div>
          </>
     )
}
LayoutPay.propTypes = {
     clickPay: PropTypes.any,
     clickCancel: PropTypes.any,
     allPrice: PropTypes.any,
     check: PropTypes.any,
}
export default LayoutPay
