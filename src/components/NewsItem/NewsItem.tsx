import type { Article } from '../../types';
import styles from './NewsItem.module.scss';

interface NewsItemProps {
  article: Article;
}

const NewsItem = ({ article }: NewsItemProps) => {
  const { abstract, web_url, source, multimedia } = article;

  
  const image = multimedia?.find(media => 
    media.type === 'image' && 
    (media.subtype === 'photo' || media.subtype === 'xlarge')
  );

  
  const imageBaseUrl = 'https://static01.nyt.com/';
  const imageUrl = image ? `${imageBaseUrl}${image.url}` : null;

  const handleClick = () => {
    window.open(web_url, '_blank');
  };

  return (
    <article className={styles.newsItem} onClick={handleClick}>
      {imageUrl && (
        <div className={styles.imageContainer}>
          <img src={imageUrl} alt={abstract} className={styles.image} />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.source}>{source}</div>
        <h3 className={styles.title}>{abstract}</h3>
      </div>
    </article>
  );
};

export default NewsItem;