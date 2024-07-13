import { Button } from 'antd';

const Productsize = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <p>Size:</p>
      </div>
      <Button
        style={{
          width: '32px',
          height: '32px',
          border: '1px solid rgb(245, 245, 245, )',
        }}
      >
        XS
      </Button>
      <Button
        style={{
          width: '32px',
          height: '32px',
          border: '1px solid rgb(245, 245, 245, )',
        }}
      >
        S
      </Button>
      <Button
        style={{
          width: '32px',
          height: '32px',
          border: '1px solid rgb(245, 245, 245, )',
        }}
      >
        M
      </Button>
      <Button
        style={{
          width: '32px',
          height: '32px',
          border: '1px solid rgb(245, 245, 245, )',
        }}
      >
        L
      </Button>
      <Button
        style={{
          width: '32px',
          height: '32px',
          border: '1px solid rgb(245, 245, 245, )',
        }}
      >
        XL
      </Button>
    </div>
  );
};

export default Productsize;
