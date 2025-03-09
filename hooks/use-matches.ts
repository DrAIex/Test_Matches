import { useState } from 'react';
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


export const useMatches = () => {
  const { data, error, mutate, isLoading } = useSWR<MatchesResponse>(
    API_URL,
    fetcher
  );
  
  const [localLoading, setLocalLoading] = useState(false);
  
  const refresh = async () => {
    setLocalLoading(true);
    try {
      await mutate();
    } finally {
      setLocalLoading(false);
    }
  };
  
  return {
    matches: data?.data.matches ?? [],
    isLoading: isLoading || localLoading,
    isError: error,
    refresh,
  };
}