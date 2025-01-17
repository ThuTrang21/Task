import { useState } from "react";
import "./App.css";
import { Button, Modal, Table, TableProps } from "antd";

import { Input } from "antd";
import { Field, Form, Formik } from "formik";
import { ProductDetails } from "./component/ProductDetails";
import { DataType } from "./component/types";



const products: DataType[] = [
  {
    id: 1,
    name: "Bánh Kem Dâu",
    price: 150000,
    image:
      "https://cdn.tgdd.vn/2020/12/CookRecipe/GalleryStep/thanh-pham-1090.jpg",
  },
  {
    id: 2,
    name: "Bánh Mousse Socola",
    price: 200000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPF4PnCVhNNCKu7VEv6UFMS4hAZFiM0ph0kw&s",
  },
  {
    id: 3,
    name: "Bánh Tiramisu",
    price: 180000,
    image:
      "https://product.hstatic.net/200000411281/product/3_c31e16c02c9d4afab72bb20e13abe84d_master.png",
  },
];

function App() {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState<DataType | null>(null); 

  const showModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = (resetForm:any) => {
    resetForm();
  };

  const handleView = (product:DataType) => {
    setSelectedProduct(product);
  }

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (text: string) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={text} alt="product" style={{ width: 50, height: 50 }} />
        </div>
      ),
      align: "center",
      width: 250,
    },
    {
      title: "Tên bánh",
      dataIndex: "name",
      key: "name",
      width: 400,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 300,
    },
    {
      title: "Hành động",
      key: "action",
      render: (product) => (
        <div className="flex gap-2">
          <Button onClick={() => handleView(product)}>Xem chi Tiết</Button>
          <Button>Sửa</Button>
          <Button>Xóa</Button>
        </div>
      ),
      width: 200,
    },
  ];

  return (
    <div className="w-full py-10">
      <div className="flex justify-evenly items-center mb-4">
        <h1 className="text-4xl font-bold py-2">Danh sách sản phẩm</h1>
        <Button type="primary" onClick={showModal}>
          Thêm
        </Button>
      </div>
      <Table<DataType> columns={columns} dataSource={list} />
      <Modal
        open={open}
        title="Thêm sản phẩm"
        onCancel={handleClose}
        footer={null}
      >
        <Formik
          initialValues={{ name: "", price: "", image: "" }}
          onSubmit={(values, { resetForm }) => {
            setList([...list, { ...values, id: list.length + 1, price: Number(values.price) }]);
            resetForm();
            setOpen(false);
          }}
        >
          {({ resetForm }) => (
            <Form>
              <div className="mb-4">
                <label>Hình ảnh</label>
                <Field name="image">
                  {({ field }: any) => <Input {...field} />}
                </Field>
              </div>

              <div className="mb-4">
                <label>Tên sản phẩm</label>
                <Field name="name">
                  {({ field }: any) => <Input {...field} />}
                </Field>
              </div>

              <div className="mb-4">
                <label>Giá</label>
                <Field name="price">
                  {({ field }: any) => <Input {...field} type="number" />}
                </Field>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="default" onClick={() => handleReset(resetForm)}>Hoàn tác</Button>
                <Button type="primary" htmlType="submit">Thêm</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
      {selectedProduct && (
        <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}

export default App;
