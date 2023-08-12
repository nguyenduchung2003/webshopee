import { useState, useEffect } from "react"
import {
     AiFillCaretLeft,
     AiFillCaretRight,
     AiFillCheckCircle,
} from "react-icons/ai"
import FootBannerTwo from "./FootBannerTwo"
import BannerPictureR1 from "./Picture/BannerPictureR1.jpg"
import BannerPictureR2 from "./Picture/BannerPictureR2.jpg"
import BannerPictureR3 from "./Picture/BannerPictureR3.jpg"
import BannerPictureR4 from "./Picture/BannerPictureR4.jpg"
import BannerPictureR5 from "./Picture/BannerPictureR5.jpg"
import BannerPictureL1 from "./Picture/BannerPictureL1.png"
import BannerPictureL2 from "./Picture/BannerPictureL2.jpg"
import cheap from "./Picture/cheap.png"
import freeShip from "./Picture/freeShip.png"
import outlet from "./Picture/outlet.png"
import phone from "./Picture/phone.png"
import sale from "./Picture/sale.png"
import trend from "./Picture/trend.png"
import vnd from "./Picture/vnd.png"
import voucher from "./Picture/voucher.png"
import world from "./Picture/world.png"

const ArrayPictures = [
     BannerPictureR1,
     BannerPictureR2,
     BannerPictureR3,
     BannerPictureR4,
     BannerPictureR5,
]
const ArrayPicturesFooter = [
     {
          img: sale,
          title: "Khung giờ săn sale",
     },
     {
          img: freeShip,
          title: "Miễn Phí Ship - Có Shoppe",
     },
     {
          img: voucher,
          title: "Voucher Giảm Đến 500.000Đ",
     },
     {
          img: outlet,
          title: "Hàng hiệu Outlet Giảm giá 50%",
     },
     {
          img: vnd,
          title: "Mã giảm giá",
     },
     {
          img: cheap,
          title: "Gì cũng rẻ - Deal sốc -9.000Đ",
     },
     {
          img: phone,
          title: "Nạp thẻ, Dịch vụ & Khách sạn",
     },
     {
          img: world,
          title: "Hàng quốc tế",
     },
     {
          img: trend,
          title: "Bắt trend - giá sốc",
     },
]

const BannerTwo = () => {
     const [currentSlied, setCurrentSlied] = useState(0)
     useEffect(() => {
          const loop = setInterval(() => {
               currentSlied === ArrayPictures.length - 1
                    ? setCurrentSlied(0)
                    : setCurrentSlied(currentSlied + 1)
          }, 3000)
          return () => clearInterval(loop)
     }, [currentSlied])
     const handlerNext = () => {
          currentSlied === ArrayPictures.length - 1
               ? setCurrentSlied(0)
               : setCurrentSlied(currentSlied + 1)
     }
     const handlerBack = () => {
          if (currentSlied > 0) {
               setCurrentSlied(currentSlied - 1)
          } else {
               setCurrentSlied(ArrayPictures.length - 1)
          }
     }
     const handlerClickCircle = (index) => {
          setCurrentSlied(index)
     }

     return (
          <>
               <div className="mt-[130px]">
                    <div className="bg-white border-solid border-b h-[400px]">
                         <div className="ml-[110px] mt-40">
                              <div className="group w-0 relative">
                                   <div className=" absolute left-[920px] top-20 z-10 w-12">
                                        <AiFillCaretRight
                                             onClick={handlerNext}
                                             className="text-5xl relative w-12 h-12  group-hover:block hidden"
                                        />
                                   </div>
                                   <div className="absolute left-44 top-20 z-10 w-12 h-12 ">
                                        <AiFillCaretLeft
                                             onClick={handlerBack}
                                             className="text-5xl relative  w-12 h-12 group-hover:block hidden"
                                        />
                                   </div>

                                   {ArrayPictures.map((picture, index) => {
                                        return (
                                             <>
                                                  <div
                                                       key={index}
                                                       className="relative left-44 w-[800px] "
                                                  >
                                                       {index ===
                                                       currentSlied ? (
                                                            <img
                                                                 src={picture}
                                                                 className="w-[800px] "
                                                            />
                                                       ) : null}
                                                  </div>
                                             </>
                                        )
                                   })}

                                   <div className="flex relative left-[500px] top-[-20px]">
                                        {ArrayPictures.map((picture, index) => {
                                             return (
                                                  <>
                                                       <div className="flex relative w-48">
                                                            <AiFillCheckCircle
                                                                 onClick={() =>
                                                                      handlerClickCircle(
                                                                           index
                                                                      )
                                                                 }
                                                                 className="mx-2.5 "
                                                                 id={index}
                                                            />
                                                       </div>
                                                  </>
                                             )
                                        })}
                                   </div>
                              </div>
                              <div className="relative w-[600px] left-[1000px] top-[-255px] h-[240px]">
                                   <img
                                        src={BannerPictureL1}
                                        className="object-scale-down h-[115px]"
                                   />
                                   <img
                                        src={BannerPictureL2}
                                        className="relative top-2 object-scale-down h-[115px]"
                                   />
                              </div>
                         </div>
                         <div className="flex relative top-[-230px] ">
                              {ArrayPicturesFooter.map((picture) => {
                                   return (
                                        <>
                                             <FootBannerTwo
                                                  linkAnh={picture.img}
                                             >
                                                  {picture.title}
                                             </FootBannerTwo>
                                        </>
                                   )
                              })}
                         </div>
                    </div>
               </div>
          </>
     )
}
export default BannerTwo
