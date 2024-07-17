import Cartdetail from '../componets/Cartdetail';
import Footer from '../componets/Footer';
import Header from '../componets/Header';

function Cart() {
  return (
    <div>
      <Header />
      <div className="product-con">
        <Cartdetail />
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
