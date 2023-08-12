import { NavLink, useNavigate } from "react-router-dom"
import logoShopee from "./Picture/logoShopee.png"
import imgRegister from "./Picture/imgRegister.jpg"
import { useEffect, useState } from "react"
const Register = () => {
     const userList = JSON.parse(localStorage.getItem("account"))
     let idMax = 0
     userList
          ? (idMax = Math.max(...userList.map((account) => account.id)))
          : null
     const [textAccount, setTextAccount] = useState("")
     const [textPassword, setTextPassword] = useState("")
     const [idUser, setIdUser] = useState(1)
     const [maxId, setMaxId] = useState(idMax)
     const [checkRegisterAccount, setCheckRegisterAccount] = useState(true)
     const [checkRegisterPassword, setcheckRegisterPassword] = useState(true)
     const navagite = useNavigate()
     let User = {
          id: idUser,
          account: textAccount,
          password: textPassword,
     }

     const handlerAccountChange = (e) => {
          setTextAccount(e.target.value)
     }
     useEffect(() => {
          if (textAccount.length > 8) {
               setCheckRegisterAccount(false)
          } else {
               setCheckRegisterAccount(true)
          }
     }, [textAccount.length])
     useEffect(() => {
          if (textPassword.length > 8) {
               setcheckRegisterPassword(false)
          } else {
               setcheckRegisterPassword(true)
          }
     }, [textPassword.length])
     const handlerPasswordChange = (e) => {
          setTextPassword(e.target.value)
     }

     function pushAccountToLocal(account) {
          if (localStorage.getItem("account") === null) {
               localStorage.setItem("account", JSON.stringify([account]))
               return
          }
          const accounts = JSON.parse(localStorage.getItem("account"))
          accounts.push(account)
          localStorage.setItem("account", JSON.stringify(accounts))
     }
     useEffect(() => {
          if (userList) {
               setIdUser(maxId + 1)
          } else {
               null
          }
     }, [userList, maxId])
     useEffect(() => {
          setMaxId(idMax)
     }, [idMax])
     const ConfirmRegister = () => {
          if (checkRegisterAccount == false && checkRegisterPassword == false) {
               alert("Đăng kí thành công")
               pushAccountToLocal(User)
               navagite("/login")
          } else {
               alert("Đăng kí thất bại")
          }
     }
     return (
          <>
               <div className="flex ">
                    <NavLink to="/">
                         <img
                              src={logoShopee}
                              alt=""
                              className="w-[80px] h-[50px]"
                         />
                    </NavLink>

                    <h1 className="leading-[50px]">ĐĂNG KÝ</h1>
               </div>
               <div
                    className={`w-[1920px] h-[600px] bg-[#FFEBE2] bg-no-repeat mt-[50px]`}
                    style={{ backgroundImage: `url(${imgRegister})` }}
               >
                    <div className="bg-white w-[410px] h-[380px] relative left-[1200px] top-[120px] rounded">
                         <div className="flex justify-center text-2xl relative top-[10px]">
                              Đăng ký
                         </div>

                         <div className="relative ">
                              <div className="flex my-[50px]">
                                   <div>Tài khoản</div>
                                   <input
                                        type="text"
                                        className="border-2"
                                        value={textAccount}
                                        onChange={handlerAccountChange}
                                   />
                                   <div></div>
                              </div>
                              {checkRegisterAccount ? (
                                   <div className="relative top-[-30px]">
                                        Tài khoản phải có độ dài lớn hơn 8 kí tự
                                   </div>
                              ) : (
                                   <div className="relative top-[-30px]">
                                        Tài khoản hợp lệ
                                   </div>
                              )}
                              <div className="flex">
                                   <div>Mật khẩu</div>
                                   <input
                                        type="text"
                                        className="border-2"
                                        value={textPassword}
                                        onChange={handlerPasswordChange}
                                   />
                              </div>
                              {checkRegisterPassword ? (
                                   <div className="relative top-[25px]">
                                        Mật khẩu phải có độ dài lớn hơn 8 kí tự
                                   </div>
                              ) : (
                                   <div className="relative top-[25px]">
                                        Mật khẩu hợp lệ
                                   </div>
                              )}
                         </div>

                         <button
                              className="border-2 relative top-[50px] left-[150px] w-[120px] h-[50px]"
                              onClick={ConfirmRegister}
                         >
                              Đăng ký
                         </button>

                         <NavLink to="/login">
                              <div className=" relative top-[50px] left-[270px] w-[200px] h-[50px]">
                                   Tôi đã có tài khoản
                              </div>
                         </NavLink>
                    </div>
               </div>
          </>
     )
}
export default Register
