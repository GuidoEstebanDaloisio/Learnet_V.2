import { Button, Layout } from "antd";
import styles from "../styles/components/navbar.module.css";
import Logo from "../assets/Logo.png";

const { Header } = Layout;

export default function Navbar() {
  return (
    <Header className={styles.navbar}>
      <div className={styles.logoSection}>
        <img src={Logo} alt="Learnet Logo" className={styles.logoImg} />
        <span className={styles.logoText}>Learnet</span>
      </div>

      <div className={styles.actions}>
        <Button type="default">Login</Button>
        <Button type="primary">Registrarse</Button>
      </div>
    </Header>
  );
}
