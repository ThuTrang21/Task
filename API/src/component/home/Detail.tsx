import { useLocation } from "react-router-dom";

export const Detail = () => {
  const location = useLocation();
  const product = location.state?.product;
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl ml-[6.8rem] font-bold">{product.strCategory}</h1>
      <div className="flex justify-evenly items-center w-full g">
        <img
          src={product.strCategoryThumb}
          alt="product"
          className="w-1/4"
        />
        <div className="w-1/2">
          <h2 className="text-xl font-semibold">Mô tả</h2>
          <p>{product.strCategoryDescription}</p>
        </div>
      </div>
    </div>
  );
};
