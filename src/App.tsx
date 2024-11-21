
import './App.css'
import Layout from './components/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import AdminDishes from './containers/AdminDishes/AdminDishes.tsx';
import AddMenuItem from './containers/AddMenuItem/AddMenuItem.tsx';
import EditMenuItem from './containers/EditMenuItem/EditMenuItem.tsx';
import ClientHome from './containers/ClientHome/ClientHome.tsx';
import AdminOrders from './containers/AdminOrders/AdminOrders.tsx';


const App = () => (
  <>
    <Layout>
      <Routes>
        <Route path="/admin" element={<AdminDishes />} />
        <Route path="/admin/dishes" element={<AdminDishes />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/add" element={<AddMenuItem />} />
        <Route path={`/admin/edit/:id`} element={<EditMenuItem />} />
        <Route path={`/`} element={<ClientHome />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </Layout>
  </>
);

export default App;
