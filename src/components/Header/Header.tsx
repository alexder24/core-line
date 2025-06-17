import { useState } from 'react';
import styles from './Header.module.scss';
import Menu from '../Menu/Menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <button className={styles.menuButton} onClick={toggleMenu}>
        <span className={styles.menuIcon}></span>
      </button>
      <div className={styles.logo}>BESIDER</div>
      {isMenuOpen && <Menu onClose={toggleMenu} />}
    </header>
  );
};

export default Header;