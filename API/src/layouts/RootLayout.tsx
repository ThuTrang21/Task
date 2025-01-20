import { Layout, Menu } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
export const RootLayout = () => {
    const navigate = useNavigate();
  return (
    <Layout style={{ minHeight: '100vh' }}>
    <Layout.Sider>
      <Menu
        theme="dark"
        mode="inline"
        items={[
          {
            key: 'home',
            label: 'Home',
            onClick: () => navigate('/'),
          },
          {
            key: 'product',
            label: 'Product Detail',
            onClick: () => navigate('/product'),
          },
        ]}
      />
    </Layout.Sider>
    <Layout.Content style={{ padding: '24px' }}>
      <Outlet />
    </Layout.Content>
  </Layout>
  )
}
