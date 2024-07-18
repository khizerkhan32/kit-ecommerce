import CheckProduct from '../componets/CheckProduct';
import Footer from '../componets/Footer';
import Header from '../componets/Header';

function Checkout() {
  return (
    <div>
      <Header />
      <div className="product-con">
        <CheckProduct />
      </div>
      <Footer />
    </div>
  );
}

export default Checkout;
