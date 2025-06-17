import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href="#" className={styles.link}>Log In</a>
        <a href="#" className={styles.link}>About Us</a>
        <a href="#" className={styles.link}>Publishers</a>
        <a href="#" className={styles.link}>Sitemap</a>
      </div>
      <div className={styles.poweredBy}>
        Powered by
        <span className={styles.newsApi}>News API</span>
      </div>
      <div className={styles.copyright}>
        © 2023 Besider: Inspired by Insider
      </div>
    </footer>
  );
};

export default Footer;