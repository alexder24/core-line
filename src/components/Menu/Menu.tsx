import styles from './Menu.module.scss';

interface MenuProps {
  onClose: () => void;
}

const Menu = ({ onClose }: MenuProps) => {
  const categories = [
    'SCIENCE',
    'GENERAL',
    'ENTERTAINMENT',
    'TECHNOLOGY',
    'BUSINESS',
    'HEALTH',
    'SPORTS',
  ];

  return (
    <div className={styles.menuOverlay}>
      <div className={styles.menu}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <nav className={styles.navigation}>
          <ul className={styles.categories}>
            {categories.map((category) => (
              <li key={category} className={styles.category}>
                <a href="#" onClick={onClose}>
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Menu;