import styles from "../styles/components/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        © {new Date().getFullYear()} Learnet — Plataforma de mentorías
      </p>
    </footer>
  );
}
