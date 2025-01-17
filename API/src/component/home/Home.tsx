import { useEffect, useState } from "react";
import { Button, Modal, Table, TableProps } from "antd";

import { Field, Form, Formik } from "formik";

import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import { DataType } from "../types";
import { useNavigate } from "react-router-dom";

const { Search } = Input;
const Home = () => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<DataType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<DataType | null>(null);
  const navigate = useNavigate();
  const showModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = (resetForm: any) => {
    resetForm();
  };

  const handleView = (product: DataType) => {
    setSelectedProduct(product);
    navigate(`/product/${product.idCategory}`,{state: {product}});
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Hình ảnh",
      dataIndex: "strCategoryThumb",
      key: "strCategoryThumb",
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
      dataIndex: "strCategory",
      key: "strCategory",
      width: 200,
    },
    {
      title: "Mô tả",
      dataIndex: "strCategoryDescription",
      key: "strCategoryDescription",
      width: 400,
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
  const [loading, setLoading] = useState(false);
  const [filtered, setFiltered] = useState<DataType[]>([]);

  useEffect(() => {
    setLoading(true); // Bắt đầu loading
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
      .then((res) => res.json())
      .then((list) => {
        setList(list.categories);
        setFiltered(list.categories);
        setLoading(false); // Tắt loading khi fetch thành công
      })
      .catch(() => setLoading(false)); // Tắt loading khi lỗi
  }, []);

  const onSearch: SearchProps["onSearch"] = (value) => {
    const filtered = list.filter((item) =>
      item.strCategory?.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(filtered); // Cập nhật danh sách hiển thị
  };
  return (
    <div className="w-full py-10">
      <div className="flex justify-evenly items-center mb-4">
        <h1 className="text-4xl font-bold py-2">Danh sách sản phẩm</h1>
        <div>
          <Search
            placeholder="Nhập tên sản phẩm ...."
            onSearch={onSearch}
            enterButton
          />
        </div>
        <Button type="primary" onClick={showModal}>
          Thêm
        </Button>
      </div>
      <Table<DataType>
        columns={columns}
        dataSource={filtered}
        loading={loading}
      />
      <Modal
        open={open}
        title="Thêm sản phẩm"
        onCancel={handleClose}
        footer={null}
      >
        <Formik
          initialValues={{ name: "", price: "", image: "" }}
          onSubmit={(values, { resetForm }) => {
            setList([
              ...list,
              { ...values, idCategory: String(Number(list.length) + 1) },
            ]);
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
                <Button type="default" onClick={() => handleReset(resetForm)}>
                  Hoàn tác
                </Button>
                <Button type="primary" htmlType="submit">
                  Thêm
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default Home;
