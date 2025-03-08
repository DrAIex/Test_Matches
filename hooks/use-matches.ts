import useSWR from 'swr';
import type { MatchesResponse } from '@/types/match';

const API_URL = 'https://app.ftoyd.com/fronttemp-service/fronttemp';

const fetcher = async (url: string): Promise<MatchesResponse> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Ошибка: не удалось загрузить информацию');
    }
    return response.json();
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    throw error;
  }
};

export function useMatches() {
  const { data, error, isLoading, mutate } = useSWR<MatchesResponse>(
    API_URL,
    fetcher
  );

  return {
    matches: data?.data.matches ?? [],
    isLoading,
    isError: error,
    refresh: mutate,
  };
} 