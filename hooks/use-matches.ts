import { useState, useEffect } from 'react';
import useSWR from 'swr';
import type { MatchesResponse } from '@/types/match';

const API_URL = 'https://app.ftoyd.com/fronttemp-service/fronttemp';
const WEBSOCKET_URL = 'wss://app.ftoyd.com/fronttemp-service/ws';

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

  useEffect(() => {
    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'update_matches') {
        mutate({ ok: true, data: { matches: message.data } }, false);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = (event) => {
      console.log('WebSocket closed:', event);
    };

    return () => {
      socket.close();
    };
  }, [mutate]);
  
  return {
    matches: data?.data.matches ?? [],
    isLoading: isLoading || localLoading,
    isError: error,
    refresh,
  };
}