import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchLatestNews, fetchNews, fetchPreviousMonthNews } from '../../store/newsSlice';
import { getYearAndMonth, groupArticlesByDate } from '../../utils/dateUtils';
import NewsItem from '../NewsItem/NewsItem';
import styles from './NewsList.module.scss';
import NewsLoadError from './NewsLoadError';
import InfiniteScrollLoader from './InfiniteScrollLoader';

const NewsList = () => {
  const dispatch = useAppDispatch();
  const { articles, loading } = useAppSelector((state) => state.news);
  const [oldestDate, setOldestDate] = useState<Date>(new Date());
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [loadFailed, setLoadFailed] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { year, month } = getYearAndMonth();
    const fetchWithRetry = async () => {
      for (let i = 0; i < 10; i++) {
        setLoadAttempts(i + 1);
        try {
          await dispatch(fetchNews({ year, month })).unwrap();
          setLoadFailed(false);
          setOldestDate(new Date());
          return;
        } catch {
          // continue
        }
      }
      setLoadFailed(true);
    };
    fetchWithRetry();
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchLatestNews());
    }, 30000);
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !isLoadingMore) {
          loadMoreNews();
        }
      },
      { threshold: 0.5 }
    );
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, isLoadingMore]);

  const loadMoreNews = async () => {
    setIsLoadingMore(true);
    let success = false;
    for (let i = 0; i < 10; i++) {
      setLoadAttempts((prev) => prev + 1);
      try {
        await dispatch(fetchPreviousMonthNews(oldestDate)).unwrap();
        success = true;
        break;
      } catch {
        // continue
      }
    }
    if (!success) {
      setLoadFailed(true);
    }
    setOldestDate(new Date(oldestDate.setMonth(oldestDate.getMonth() - 1)));
    setIsLoadingMore(false);
  };

  const groupedArticles = groupArticlesByDate(articles);
  const sortedDates = Object.keys(groupedArticles).sort((a, b) => {
    return new Date(b.split('.').reverse().join('-')).getTime() - 
           new Date(a.split('.').reverse().join('-')).getTime();
  });

  if (loadFailed) {
    return <NewsLoadError />;
  }

  if (loading && articles.length === 0) {
    return <InfiniteScrollLoader ref={loaderRef} loading={loading} isLoadingMore={isLoadingMore} />;
  }

  return (
    <div className={styles.newsList}>
      {sortedDates.map((date) => (
        <div key={date} className={styles.dateGroup}>
          <div className={styles.dateHeader}>{date}</div>
          <div className={styles.articlesGroup}>
            {groupedArticles[date].map((article) => (
              <NewsItem key={article.web_url} article={article} />
            ))}
          </div>
        </div>
      ))}
      <InfiniteScrollLoader ref={loaderRef} loading={loading} isLoadingMore={isLoadingMore} />
    </div>
  );
};

export default NewsList;