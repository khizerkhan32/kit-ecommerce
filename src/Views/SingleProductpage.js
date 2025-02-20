import Footer from '../componets/Footer';
import Header from '../componets/Header';
import Productbyid from '../componets/Productbyid';
// import Products from '../componets/Products';
import Productstwo from '../componets/Productstwo';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SingleProductpage() {
  const [sliceIndexes, setSliceIndexes] = useState({ start: 26, end: 30 });
  //   const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  //   const handleSeeAllClick = () => {
  //     if (isExpanded) {
  //       setSliceIndexes({ start: 6, end: 14 });
  //     } else {
  //       setSliceIndexes({ start: 10, end: 26 });
  //     }
  //     setIsExpanded(!isExpanded);
  //     console.log('working');
  //   };

  const SingleProduct = (id) => {
    console.log('working ' + id);
    navigate(`/SingleProduct/${id}`);
  };

  // useEffect(() => {
  //   handleSeeAllClick();
  // }, []);

  return (
    <div>
      <Header />
      <div className="product-con">
        <Productbyid />
        {/* <Products onClick={SingleProduct} /> */}
        <div className="button-con">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div
              style={{
                height: '40px',
                width: '20px',
                background: '#DB4444',
                borderRadius: '4px',
              }}
            ></div>
            <p style={{ color: '#DB4444' }}>Related Item</p>
          </div>
          <div>
            {/* <Buttonone width={156} onClick={handleSeeAllClick}>
              {isExpanded ? 'See Less' : 'See All'}
            </Buttonone> */}
          </div>
        </div>
        <Productstwo
          sliceIndexes={sliceIndexes}
          onProductClick={SingleProduct}
        />
      </div>
      <Footer />
    </div>
  );
}
export default SingleProductpage;
