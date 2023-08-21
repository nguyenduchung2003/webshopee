import { NavLink } from "react-router-dom"
import logoShopee from "./Picture/logoShopee.png"
import imgRegister from "./Picture/imgRegister.jpg"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { notification } from "antd"

const Login = () => {
     const navigate = useNavigate()
     const [textAccount, setTextAccount] = useState("")
     const [textPassword, setTextPassword] = useState("")
     const [visible, setVisibility] = useState(false)
     const onClickEye = () => {
          setVisibility(!visible)
     }

     const InputType = visible ? "text" : "password"

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
               notification.success({
                    message: "Đăng nhập thành công thành công",
                    duration: 2,
               })

               navigate("/webshopee")
          } else {
               toast.error("Đăng nhập thất bại", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
               })
          }
     }

     return (
          <>
               <ToastContainer />
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
                    className={`w-full h-[500px] bg-[#FFEBE2] bg-no-repeat mt-[50px]`}
                    style={{ backgroundImage: `url(${imgRegister})` }}
               >
                    <div className="bg-white w-[425px] h-[350px] relative left-[900px] top-[75px] rounded">
                         <div className="flex justify-center text-2xl relative top-[10px]">
                              Đăng nhập
                         </div>
                         <div className="relative  left-[50px]">
                              <div className="flex my-[50px]">
                                   <div className="relative left-[-20px] top-1">
                                        Tài khoản
                                   </div>
                                   {/* <input
                                        type="text"
                                        className="border-2"
                                        value={textAccount}
                                        onChange={handlerAccountChange}
                                   /> */}
                                   <Box
                                        component="form"
                                        sx={{
                                             "& > :not(style)": {
                                                  width: "185px",
                                             },
                                        }}
                                        autoComplete="off"
                                   >
                                        <TextField
                                             size="small"
                                             value={textAccount}
                                             label="Tài khoản"
                                             variant="outlined"
                                             onChange={handlerAccountChange}
                                        />
                                   </Box>
                              </div>
                              <div className="flex">
                                   <div className="relative left-[-20px] top-1">
                                        Mật khẩu
                                   </div>
                                   <Box
                                        component="form"
                                        sx={{
                                             "& > :not(style)": {
                                                  width: "185px",
                                             },
                                        }}
                                        autoComplete="off"
                                   >
                                        <TextField
                                             size="small"
                                             type={InputType}
                                             value={textPassword}
                                             label="Mật khẩu"
                                             variant="outlined"
                                             onChange={handlerPasswordChange}
                                        />
                                   </Box>
                                   <div className="mt-[-3px]">
                                        {visible ? (
                                             <EyeOutlined
                                                  onClick={onClickEye}
                                             />
                                        ) : (
                                             <EyeInvisibleOutlined
                                                  onClick={onClickEye}
                                             />
                                        )}
                                   </div>
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
                         <NavLink to="/webshopee/forgetpassword">
                              <div className=" relative top-[-80px] left-[270px] w-[200px] h-[50px]">
                                   Quên mật khẩu
                              </div>
                         </NavLink>
                    </div>
               </div>
          </>
     )
}
export default Login
