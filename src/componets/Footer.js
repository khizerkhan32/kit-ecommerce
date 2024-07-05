import { VscSend } from 'react-icons/vsc';
import { QRCode } from 'antd';
import playstore from '../assects/play-store.svg';
import applestore from '../assects/apple store.svg';
import { RiFacebookLine } from 'react-icons/ri';
import { FiTwitter } from 'react-icons/fi';
import { LuInstagram } from 'react-icons/lu';
import { RiLinkedinLine } from 'react-icons/ri';
import { FaRegCopyright } from 'react-icons/fa6';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-con">
        <div className="footer-gap">
          <div>
            <h1>Exclusive</h1>
          </div>
          <div>
            <h2>Subscribe</h2>
          </div>
          <div>
            <p>Get 10% off your first order</p>
          </div>
          <div className="input-con">
            <div>
              <input className="footer-input" placeholder="Enter your email" />
            </div>
            <div style={{ height: '24px', width: '22px' }}>
              <VscSend style={{ height: '100%', width: '100%' }} />
            </div>
          </div>
        </div>
        <div className="footer-gap" style={{ width: '15%' }}>
          <div>
            <h2>Support</h2>
          </div>
          <div>
            <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          </div>
          <div>
            <p>exclusive@gmail.com</p>
          </div>
          <div>
            <p>+88015-88888-9999</p>
          </div>
        </div>
        <div className="footer-gap">
          <div>
            <h2>Account</h2>
          </div>
          <div>
            <p>My Account</p>
          </div>
          <div>
            <p>Login / Register</p>
          </div>
          <div>
            <p>Cart</p>
          </div>
          <div>
            <p>Wishlist</p>
          </div>
          <div>
            <p>Shop</p>
          </div>
        </div>
        <div className="footer-gap">
          <div>
            <h2>Quick Link</h2>
          </div>
          <div>
            <p>Privacy Policy</p>
          </div>
          <div>
            <p>Terms Of Use</p>
          </div>
          <div>
            <p>FAQ</p>
          </div>
          <div>
            <p>Contact</p>
          </div>
        </div>
        <div className="footer-gap">
          <div>
            <h2>Download App</h2>
          </div>
          <div>
            <h4>Save $3 with App New User Only</h4>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div>
              <QRCode
                style={{
                  background: 'white',
                  padding: '0px',
                  height: '80px',
                  width: '80px',
                  borderRadius: '4px',
                }}
                errorLevel={'Q'}
                value="khizerkhan E-commers web/REAct.js "
              />
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
            >
              <div>
                <img src={playstore} alt="playsstore" />
              </div>
              <div>
                <img src={applestore} alt="playsstore" />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <RiFacebookLine style={{ height: '24px', width: '24px' }} />
            </div>
            <div>
              <FiTwitter style={{ height: '24px', width: '24px' }} />
            </div>
            <div>
              <LuInstagram style={{ height: '24px', width: '24px' }} />
            </div>
            <div>
              <RiLinkedinLine style={{ height: '24px', width: '24px' }} />
            </div>
          </div>
        </div>
      </div>
      <div className='copyrigth-con' >
        <div>
          <div>
            <FaRegCopyright style={{ height: '20px', width: '20px' }} />
          </div>
          <div>Copyright Khizer 2023. All right reserved</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
