import PropTypes from "prop-types"
function FootBannerTwo({ linkAnh, children }) {
     return (
          <>
               <div className="relative w-[100px] mx-5 left-[160px] ">
                    <button
                         className={`w-[45px] h-[45px]  bg-contain  border-none bg-no-repeat ml-4`}
                         style={{ backgroundImage: `url(${linkAnh})` }}
                    ></button>
                    <div className=" w-[100px] h-[28px] text-[13px]">
                         {children}
                    </div>
               </div>
          </>
     )
}
FootBannerTwo.propTypes = {
     linkAnh: PropTypes.string.isRequired,
     children: PropTypes.string.isRequired,
}
export default FootBannerTwo
