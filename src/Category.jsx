import CategoryLayout from "./CategoryLayout"
import laptop from "./Picture/laptop.png"
import ApplePhone from "./Picture/ApplePhone.png"
import fragrances from "./Picture/fragrances.png"
import skincare from "./Picture/skincare.png"
import homeDecoration from "./Picture/homeDecoration.png"
import groceries from "./Picture/groceries.png"
import { NavLink } from "react-router-dom"
import { PropTypes } from "prop-types"
const dataPicture = [
     {
          imgCategory: ApplePhone,
          title: "smartphones",
     },
     {
          imgCategory: laptop,
          title: "laptops",
     },
     {
          imgCategory: fragrances,
          title: "fragrances",
     },
     {
          imgCategory: skincare,
          title: "skincare",
     },
     {
          imgCategory: groceries,
          title: "groceries",
     },
     {
          imgCategory: homeDecoration,
          title: "home-decoration",
     },
]
const Category = ({ data }) => {
     return (
          <>
               <div className=" w-[1200px] ml-[280px]">
                    <div className="flex ">Danh mục</div>
                    <div className="flex justify-center ">
                         {dataPicture.map((category) => {
                              return (
                                   <>
                                        <div className="flex ">
                                             <NavLink
                                                  to={`/webshopee/category/${category.title}`}
                                                  state={{
                                                       data: data,
                                                       title: category.title,
                                                  }}
                                             >
                                                  <CategoryLayout
                                                       linkPicture={
                                                            category.imgCategory
                                                       }
                                                       TitleCategory={
                                                            category.title
                                                       }
                                                  />
                                             </NavLink>
                                        </div>
                                   </>
                              )
                         })}
                    </div>
               </div>
          </>
     )
}
Category.propTypes = {
     data: PropTypes.any,
}
export default Category
