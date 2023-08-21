import { NavLink, useNavigate } from "react-router-dom"
import logoShopee from "./Picture/logoShopee.png"
import imgRegister from "./Picture/imgRegister.jpg"
import { useEffect, useState, useRef } from "react"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
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
     const [checkRegisterAccount2, setCheckRegisterAccount2] = useState(true)
     const [checkRegisterPassword, setcheckRegisterPassword] = useState(true)
     const navagite = useNavigate()
     const [visible, setVisibility] = useState(false)
     const onClickEye = () => {
          setVisibility(!visible)
     }

     const InputType = visible ? "text" : "password"
     let User = {
          id: idUser,
          account: textAccount,
          password: textPassword,
     }

     const valueAccount = useRef()
     const handlerAccountChange = (e) => {
          setTextAccount(e.target.value)
          valueAccount.current = e.target.value
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
     const accountss = JSON.parse(localStorage.getItem("account"))
     useEffect(() => {
          console.log(valueAccount.current)
          if (
               accountss?.some(
                    (account) => account.account == valueAccount.current
               )
          ) {
               setCheckRegisterAccount2(true)
          } else {
               setCheckRegisterAccount2(false)
          }
     }, [accountss])
     const handlerPasswordChange = (e) => {
          setTextPassword(e.target.value)
     }

     function pushAccountToLocal(account) {
          if (localStorage.getItem("account") === null) {
               localStorage.setItem("account", JSON.stringify([account]))
               return
          }
          const accounts = JSON.parse(localStorage.getItem("account"))
          if (accounts?.some((account) => account.account == User.account)) {
               return
          } else {
               accounts.push(account)
          }

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
          if (
               checkRegisterAccount == false &&
               checkRegisterPassword == false &&
               checkRegisterAccount2 == false
          ) {
               toast.error("Đăng kí thành công", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
               })
               pushAccountToLocal(User)
               navagite("/webshopee/login")
          } else {
               toast.error("Đăng kí thất bại", {
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

                    <h1 className="leading-[50px]">ĐĂNG KÝ</h1>
               </div>
               <div
                    className={`w-full h-[540px] bg-[#FFEBE2] bg-no-repeat mt-[20px]`}
                    style={{ backgroundImage: `url(${imgRegister})` }}
               >
                    <div className="bg-white w-[410px] h-[380px] relative left-[900px] top-[120px] rounded">
                         <div className="flex justify-center text-2xl relative top-[10px]">
                              Đăng ký
                         </div>

                         <div className="relative left-[50px]">
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
                                             id="outlined-basic"
                                             label="Tài khoản"
                                             variant="outlined"
                                             onChange={handlerAccountChange}
                                        />
                                   </Box>
                              </div>
                              {checkRegisterAccount ? (
                                   <div className="relative top-[-30px] left-[-50px]">
                                        Tài khoản phải có độ dài lớn hơn 8 kí tự
                                   </div>
                              ) : (
                                   <div className="relative top-[-30px] left-[-50px]">
                                        Tài khoản hợp lệ
                                   </div>
                              )}

                              {textAccount.length > 8 &&
                              checkRegisterAccount2 ? (
                                   <div className="relative top-[-20px] left-[-50px]">
                                        Tài khoản đã tồn tại
                                   </div>
                              ) : textAccount.length > 8 ? (
                                   <div className="relative top-[-20px] left-[-50px]">
                                        Tài khoản hợp lệ
                                   </div>
                              ) : null}
                              <div className="flex">
                                   {/* <div>Mật khẩu</div>
                                   <input
                                        type={InputType}
                                        className="border-2"
                                        value={textPassword}
                                        onChange={handlerPasswordChange}
                                   /> */}
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
                                             id="outlined-basic"
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
                              Đăng ký
                         </button>

                         <NavLink to="/webshopee/login">
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
