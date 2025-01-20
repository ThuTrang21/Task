import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import Home from "./component/home/Home";
import { Spin } from "antd";
import { Suspense } from "react";
import ProductDetails from "./component/ProductDetails";
import { Detail } from "./component/home/Detail";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'product', element: <ProductDetails /> },
      { path: 'product/:id', element: <Detail /> },
    ],
  },
]);
function App() {
  return (
    <Suspense
      fallback={
        <div className="fixed flex h-screen w-screen items-center justify-center">
          <Spin size="large" />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
