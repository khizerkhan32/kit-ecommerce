import { IoCartOutline } from 'react-icons/io5';
function Buttonone(props) {
  const { children, width, onClick } = props;
  return (
    <button
      style={{
        border: '1px solid rgba(0, 0, 0, 0.5)',
        width: width,
        borderRadius: '4.5px',
        background: '#000000',
        height: 44,
        color: 'white',
        fontFamily: "Poppins', sans-serif",
        fontWeight: '500',
        fontSize: '16px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px',
        width: '100%',
      }}
      onClick={onClick}
    >
      <IoCartOutline style={{ height: '22px', width: '22px' }} /> {children}
    </button>
  );
}

export default Buttonone;
