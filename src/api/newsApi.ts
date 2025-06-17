import type { NewsResponse } from '../types';

const API_KEY = 'rJ7XaUF0IQZG7UYu0jp85Mdqpeu5MnbP';
const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/archive/v1';

const newsApi = {
  getArchiveByMonth: async (year: number, month: number): Promise<NewsResponse> => {
    const url = `${BASE_URL}/${year}/${month}.json?api-key=${API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      return data as NewsResponse;
    } catch (error: any) {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  },
};

export default newsApi;