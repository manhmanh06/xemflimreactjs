import logo from '../../img/logo-fpt-play.06da7da.png';
import styles from './Footer.module.css';
function Footer() {
  return (
    <div className={styles.container}>
      <img src={logo} alt="" />
      <ul className={styles.list}>
        <li>
          <ul>
            <li>Giới thiệu</li>
            <li>Các gói dịch vụ</li>
            <li>Liên hệ</li>
            <li>Trung tâm hỗ trợ</li>
          </ul>
        </li>
        <li>
          <ul>
            <li>Quảng cáo</li>
            <li>Mua gói</li>
            <li>Bảo hành</li>
          </ul>
        </li>
        <li>Điều khoản sử dụng</li>
      </ul>
      <p>Copyright © 🐘</p>
    </div>
  );
}

export default Footer;
