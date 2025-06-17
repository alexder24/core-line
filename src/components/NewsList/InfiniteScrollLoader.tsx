import { ForwardedRef, forwardRef } from 'react';
import Loader from '../Loader/Loader';
import styles from './NewsList.module.scss';

interface InfiniteScrollLoaderProps {
  loading: boolean;
  isLoadingMore: boolean;
}

const InfiniteScrollLoader = forwardRef<HTMLDivElement, InfiniteScrollLoaderProps>(
  ({ loading, isLoadingMore }, ref: ForwardedRef<HTMLDivElement>) => (
    <div ref={ref} className={styles.loaderContainer}>
      {(loading || isLoadingMore) && <Loader />}
    </div>
  )
);

export default InfiniteScrollLoader;