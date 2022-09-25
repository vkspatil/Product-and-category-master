import AllUsers from './Component/AllProduct';
import AddProduct from './Component/AddProduct';
import EditProduct from './Component/EditProduct';
import NavBar from './Component/NavBar';
import NotFound from './Component/NotFound'; 
import Home from './Component/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="all" element={<AllUsers /> } />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
