import './App.css';
import Productsdetail from './Views/Productsdetail';
import { Routes, Route } from 'react-router-dom';
import SingleProductpage from './Views/SingleProductpage';
import Cart from './Views/Cart';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route path="/" index element={<Productsdetail />} />
          <Route path="/SingleProduct/:id" element={<SingleProductpage />} />
          <Route path="/Cart" element={<Cart />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
