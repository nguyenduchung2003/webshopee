import { Modal } from "antd"
import PropTypes from "prop-types"
const ModalProduct = ({ onOke, onCancel, children, isModal }) => {
     return (
          <>
               <Modal
                    title="Bạn có muốn xóa sản phẩm này"
                    onOk={onOke}
                    onCancel={onCancel}
                    open={isModal}
                    okText="Xóa"
                    okButtonProps={{
                         className: "text-black",
                    }}
               >
                    {children}
               </Modal>
          </>
     )
}
ModalProduct.propTypes = {
     onOke: PropTypes.any,
     onCancel: PropTypes.any,
     children: PropTypes.any,
     isModal: PropTypes.any,
}
export default ModalProduct
