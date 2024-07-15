import { Button } from 'antd';

const Productsize = () => {
  return (
    <div className="sixe-dev">
      <div style={{ marginRight: '10px' }}>
        <p>Size:</p>
      </div>
      <Button className="size-btn">XS</Button>
      <Button className="size-btn">S</Button>
      <Button
        className="size-btn"
        style={{ backgroundColor: '#db4444', color: 'white', border: 'none' }}
      >
        M
      </Button>
      <Button className="size-btn">L</Button>
      <Button className="size-btn">XL</Button>
    </div>
  );
};

export default Productsize;
