import { Modal } from "antd";
import { DataType } from "./types";
interface productProps {
    product: DataType;
    onClose: () => void;

}
export const ProductDetails = ({product,onClose}:productProps) => {
  return (
    <div>
      <Modal
        open={true}
        title={`Chi tiết sản phẩm: ${product.name}`}
        onCancel={onClose}
        footer={null}
        width={450}
      >
        <div className="flex flex-col justify-center items-center gap-4 mt-10">
          <p>
            <strong>Tên sản phẩm:</strong> {product.name}
          </p>
          <p>
            <strong>Giá:</strong> {product.price}
          </p>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "50%" }}
          />
        </div>
      </Modal>
    </div>
  );
};
