import { NavLink, useNavigate } from "react-router-dom"
import logoShopee from "./Picture/logoShopee.png"
import imgRegister from "./Picture/imgRegister.jpg"
import { useEffect, useState, useRef } from "react"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { notification } from "antd"
const ForgetPassword = () => {
     const userList = JSON.parse(localStorage.getItem("account"))
     const [textAccount, setTextAccount] = useState("")
     const [textPassword, setTextPassword] = useState("")
     const [checkRegisterAccount, setCheckRegisterAccount] = useState(true)
     const [checkRegisterPassword, setcheckRegisterPassword] = useState(true)

     const navagite = useNavigate()
     const [visible, setVisibility] = useState(false)

     const onClickEye = () => {
          setVisibility(!visible)
     }

     const InputType = visible ? "text" : "password"

     const valueAccount = useRef()
     const valuePassword = useRef()
     const handlerAccountChange = (e) => {
          setTextAccount(e.target.value)
          valueAccount.current = e.target.value
     }
     const handlerPasswordChange = (e) => {
          setTextPassword(e.target.value)
          valuePassword.current = e.target.value
     }
     useEffect(() => {
          if (
               textAccount.length > 8 &&
               userList.some((user) => user.account == valueAccount.current)
          ) {
               setCheckRegisterAccount(false)
          } else {
               setCheckRegisterAccount(true)
          }
     }, [textAccount.length, userList])
     useEffect(() => {
          if (textPassword.length > 8) {
               setcheckRegisterPassword(false)
          } else {
               setcheckRegisterPassword(true)
          }
     }, [textPassword.length])

     const ConfirmRegister = () => {
          if (checkRegisterAccount == false && checkRegisterPassword == false) {
               let x = userList
                    ?.filter((user) => user.account === valueAccount.current)
                    .map((user) => {
                         return {
                              ...user,
                              password: valuePassword.current,
                         }
                    })
               let y = userList?.filter(
                    (user) => user.account !== valueAccount.current
               )
               let z = [...y, ...x]
               console.log(z)
               localStorage.setItem("account", JSON.stringify(z))

               notification.success({
                    message: "Đổi mật khẩu thành công",
                    duration: 2,
               })

               navagite("/webshopee/login")
          } else {
               toast.error("Đổi mật khẩu thất bại thất bại", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
               })
          }
     }
     return (
          <>
               <ToastContainer />
               <div className="flex ">
                    <NavLink to="/webshopee/">
                         <img
                              src={logoShopee}
                              alt=""
                              className="w-[80px] h-[50px]"
                         />
                    </NavLink>

                    <h1 className="leading-[50px]">Quên mật khẩu</h1>
               </div>
               <div
                    className={`w-full h-[540px] bg-[#FFEBE2] bg-no-repeat mt-[20px]`}
                    style={{ backgroundImage: `url(${imgRegister})` }}
               >
                    <div className="bg-white w-[410px] h-[380px] relative left-[900px] top-[120px] rounded">
                         <div className="flex justify-center text-2xl relative top-[10px]">
                              Quên mật khẩu
                         </div>

                         <div className="relative left-[50px]">
                              <div className="flex my-[50px]">
                                   <div className="relative left-[-20px] top-1">
                                        Tài khoản
                                   </div>
                                   <Box
                                        component="form"
                                        sx={{
                                             "& > :not(style)": {
                                                  width: "185px",
                                                  marginLeft: "30px",
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
                                        Mật khẩu mới
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
                                             label="Mật khẩu mới"
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
                              {checkRegisterPassword ? (
                                   <div className="relative top-[25px] left-[-50px]">
                                        Mật khẩu phải có độ dài lớn hơn 8 kí tự
                                   </div>
                              ) : (
                                   <div className="relative top-[25px] left-[-50px]">
                                        Mật khẩu hợp lệ
                                   </div>
                              )}
                         </div>

                         <button
                              className="border-2 relative top-[50px] left-[150px] w-[120px] h-[50px]"
                              onClick={ConfirmRegister}
                         >
                              Đổi mật khẩu
                         </button>
                    </div>
               </div>
          </>
     )
}
export default ForgetPassword
