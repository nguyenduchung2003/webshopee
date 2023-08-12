import PropTypes from "prop-types"
const CategoryLayout = ({ linkPicture, TitleCategory }) => {
     return (
          <>
               <div className="border-2 mx-10 w-[120px] h-[150px]">
                    <img
                         src={linkPicture}
                         alt=""
                         className="w-[83px] h-[88px] my-0 mx-auto"
                    />
                    <div className="text-center mt-[10px]">{TitleCategory}</div>
               </div>
          </>
     )
}
CategoryLayout.propTypes = {
     linkPicture: PropTypes.any,
     TitleCategory: PropTypes.any,
}
export default CategoryLayout
