import { NavLink } from "react-router-dom"
import logoShopee from "./Picture/logoShopee.png"
import imgRegister from "./Picture/imgRegister.jpg"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const Login = () => {
     const navigate = useNavigate()
     const [textAccount, setTextAccount] = useState("")
     const [textPassword, setTextPassword] = useState("")

     const handlerAccountChange = (e) => {
          setTextAccount(e.target.value)
     }

     const handlerPasswordChange = (e) => {
          setTextPassword(e.target.value)
     }

     const userLocal = JSON.parse(localStorage.getItem("account"))

     const ConfirmLoginTrue = () => {
          let checkLogin = false
          if (userLocal) {
               userLocal.forEach((user) => {
                    if (
                         user.account === textAccount &&
                         user.password === textPassword
                    ) {
                         localStorage.setItem("userNow", JSON.stringify(user))
                         checkLogin = true
                    }
               })
          } else {
               null
          }
          if (checkLogin == true) {
               alert("Đăng nhập thành công")
               navigate("/webshopee")
          } else {
               alert("Đăng nhập thất bại")
          }
     }

     return (
          <>
               <div className="flex ">
                    <NavLink to="/webshopee">
                         <img
                              src={logoShopee}
                              alt=""
                              className="w-[80px] h-[50px]"
                         />
                    </NavLink>
                    <h1 className="leading-[50px]">ĐĂNG NHẬP</h1>
               </div>
               <div
                    className={`w-[1920px] h-[600px] bg-[#FFEBE2] bg-no-repeat mt-[50px]`}
                    style={{ backgroundImage: `url(${imgRegister})` }}
               >
                    <div className="bg-white w-[425px] h-[320px] relative left-[1200px] top-[120px] rounded">
                         <div className="flex justify-center text-2xl relative top-[10px]">
                              Đăng nhập
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
                              </div>
                              <div className="flex">
                                   <div>Mật khẩu</div>
                                   <input
                                        type="text"
                                        className="border-2"
                                        value={textPassword}
                                        onChange={handlerPasswordChange}
                                   />
                              </div>
                         </div>
                         <button
                              className="border-2 relative top-[50px] left-[150px] w-[120px] h-[50px]"
                              onClick={ConfirmLoginTrue}
                         >
                              Đăng nhập
                         </button>
                         <NavLink to="/webshopee/Register">
                              <div className=" relative top-[50px] left-[270px] w-[200px] h-[50px]">
                                   Tôi chưa có tài khoản
                              </div>
                         </NavLink>
                    </div>
               </div>
          </>
     )
}
export default Login
