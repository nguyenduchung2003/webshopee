import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"
const LayoutProduct = ({ thumbnail, title, description, price, id, data }) => {
     return (
          <>
               <NavLink
                    to={`/webshopee/products/${id}`}
                    state={data}
                    className="h-[282px] w-[190px] m-5 border-2"
               >
                    <img src={thumbnail} alt={title} className="h-[190px]" />
                    <div className="truncate h-[28px] my-5">{description}</div>
                    <div>{price}$</div>
               </NavLink>
          </>
     )
}
LayoutProduct.propTypes = {
     thumbnail: PropTypes.any,
     title: PropTypes.any,
     description: PropTypes.any,
     price: PropTypes.any,
     onClick: PropTypes.any,
     id: PropTypes.any,
     data: PropTypes.any,
}
export default LayoutProduct
