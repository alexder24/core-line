import Header from './components/Header/Header';
import NewsList from './components/NewsList/NewsList';
import Footer from './components/Footer/Footer';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <NewsList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
