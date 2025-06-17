export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};


export const getCurrentDate = (): string => {
  return new Date().toISOString();
};


export const groupArticlesByDate = <T extends { pub_date: string }>(articles: T[]) => {
  return articles.reduce((acc, article) => {
    const date = formatDate(article.pub_date);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(article);
    return acc;
  }, {} as Record<string, T[]>);
};


export const getYearAndMonth = (date: Date = new Date()): { year: number; month: number } => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
};


export const getPreviousMonth = (date: Date): { year: number; month: number } => {
  const previousMonth = new Date(date);
  previousMonth.setMonth(date.getMonth() - 1);
  
  return {
    year: previousMonth.getFullYear(),
    month: previousMonth.getMonth() + 1,
  };
};