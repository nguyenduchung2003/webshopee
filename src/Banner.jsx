import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { NavLink, useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import logoShopee from "./Picture/logoShopee.png"
import { useState, useEffect, useRef, useContext } from "react"
import { DataContext } from "./DataContext"
const Banner = ({ statusBanner, isCart = false }) => {
     const [isSearch, setIsSearch] = useState(false)
     const [textSearch, setTextSearch] = useState()
     const [isAccount, setIsAccount] = useState(false)
     const wrapperRef = useRef(null)
     const UserName = useRef(null)
     const data = useContext(DataContext)
     const navigate = useNavigate()
     useEffect(() => {
          const userNow = JSON.parse(localStorage.getItem("userNow"))
          if (userNow) {
               UserName.current = userNow.account
               setIsAccount(true)
          } else {
               null
          }
     }, [])
     useEffect(() => {
          function handleClickOutside(event) {
               if (
                    wrapperRef.current &&
                    !wrapperRef.current.contains(event.target)
               ) {
                    setIsSearch(false)
                    setTextSearch()
               }
          }
          document.addEventListener("mousedown", handleClickOutside)
          return () => {
               document.removeEventListener("mousedown", handleClickOutside)
          }
     }, [wrapperRef])

     const handerIsSearch = () => {
          setIsSearch(true)
     }
     useEffect(() => {
          if (textSearch == "") {
               setTextSearch()
          }
     }, [textSearch])
     const handlerSearch = (e) => {
          setTextSearch(e.target.value)
     }
     const onClickSearch = () => {
          console.log(1)
     }
     const Logout = () => {
          localStorage.removeItem("userNow")
          navigate("/webshopee/login")
     }
     return (
          <>
               <div
                    className={`bg-backgroudBanner w-full h-[125px] ${statusBanner} top-0 left-0 right-0 z-50`}
               >
                    <div className="flex justify-around">
                         <div className="flex justify-between">
                              <div className="mx-2.5">Kênh người bán</div>
                              <div className="mx-2.5">
                                   Trở thành Người bán Shoppe
                              </div>
                              <div className="mx-2.5">Tải ứng dụng</div>
                              <div className="mx-2.5">Kết nối</div>
                         </div>
                         <div className="flex">
                              <div className="mx-2.5">Thông báo</div>
                              <div className="mx-2.5">Hỗ trợ</div>
                              <div className="mx-2.5">Tiếng việt</div>
                              {isAccount ? (
                                   <>
                                        <div className="mx-10">
                                             {UserName.current}
                                        </div>

                                        <div onClick={Logout}>Đăng xuất</div>
                                   </>
                              ) : (
                                   <>
                                        {" "}
                                        <NavLink
                                             className="mx-2.5"
                                             end
                                             to="/webshopee/login"
                                             style={({ isActive }) => ({
                                                  color: isActive
                                                       ? "red"
                                                       : "black",
                                             })}
                                        >
                                             Đăng nhập
                                        </NavLink>
                                        <NavLink
                                             className="mx-2.5"
                                             end
                                             to="/webshopee/register"
                                             style={({ isActive }) => ({
                                                  color: isActive
                                                       ? "red"
                                                       : "black",
                                             })}
                                        >
                                             Đăng kí
                                        </NavLink>
                                   </>
                              )}
                         </div>
                    </div>
                    <div className="h-[76px] ">
                         <NavLink to="/webshopee/">
                              <img
                                   src={logoShopee}
                                   alt=""
                                   className="w-12 absolute top-10 left-[200px]"
                              />
                              {isCart ? (
                                   <div className="text-2xl absolute left-[300px] top-[50px]">
                                        Giỏ hàng
                                   </div>
                              ) : null}
                         </NavLink>

                         <div className="ml-[200px] mt-[-20px]">
                              <button className="w-15 h-[35px] absolute top-[55px] z-10 left-[1200px] bg-backgroudBanner">
                                   <i className="fa fa-search  w-12 flex justify-center"></i>
                              </button>
                              <div
                                   className="relative top-[30px]"
                                   ref={wrapperRef}
                              >
                                   <input
                                        className="absolute w-[800px] h-10 left-[300px] top-[18px] "
                                        type="text"
                                        value={textSearch}
                                        placeholder="Cơ hội trúng 88 iphone!"
                                        onChange={handlerSearch}
                                        onClick={handerIsSearch}
                                   />
                                   <div className="absolute left-[300px] top-[12px]">
                                        {isSearch ? (
                                             <>
                                                  {data.map((dataProduct) => {
                                                       if (
                                                            dataProduct.brand.includes(
                                                                 textSearch
                                                            ) ||
                                                            dataProduct.title.includes(
                                                                 textSearch
                                                            )
                                                       ) {
                                                            return (
                                                                 <>
                                                                      <NavLink
                                                                           to={`/webshopee/products/${dataProduct.id}`}
                                                                           state={
                                                                                data
                                                                           }
                                                                           className={
                                                                                "relative z-50 w-[700px] h-10  "
                                                                           }
                                                                      >
                                                                           <div
                                                                                className="border-2 relative z-50 w-[700px] h-10  bg-slate-300"
                                                                                onClick={
                                                                                     onClickSearch
                                                                                }
                                                                           >
                                                                                {
                                                                                     dataProduct.title
                                                                                }
                                                                           </div>
                                                                      </NavLink>
                                                                 </>
                                                            )
                                                       }
                                                  })}
                                             </>
                                        ) : null}
                                   </div>
                              </div>
                         </div>
                         <NavLink to="/webshopee/cart">
                              <FontAwesomeIcon
                                   icon={faShoppingCart}
                                   className="w-25 absolute left-[1390px] top-[65px]"
                              />
                         </NavLink>
                    </div>
                    <div className="flex justify-center relative bottom-[-20px]">
                         <div className="mx-2.5"> Săn Sale 1k</div>
                         <div className="mx-2.5">Bộ đồ ếch xanh</div>
                         <div className="mx-2.5">
                              Sét đồ nữ sang chảnh tiểu thư
                         </div>
                         <div className="mx-2.5">Lucky Box</div>
                         <div className="mx-2.5">Đầm Tiệc</div>
                         <div className="mx-2.5">Dép khủng long cổ dài</div>
                         <div className="mx-2.5">Iphone14</div>
                    </div>
               </div>
          </>
     )
}
Banner.propTypes = {
     value: PropTypes.any,
     onChange: PropTypes.any,
     children: PropTypes.any,
     data: PropTypes.any,
     statusBanner: PropTypes.any,
     isCart: PropTypes.any,
}
export default Banner
