'use client';

import { useState } from 'react';
import { useMatches } from '@/hooks/use-matches';
import { MatchCard } from '@/components/match-card';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AlertTriangleIcon } from '@/components/icons';
import { tacticSans } from './fonts';

export default function Home() {
  const { matches, isLoading, isError, refresh } = useMatches();
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);

  const toggleMatch = (matchId: string) => {
    setExpandedMatchId(expandedMatchId === matchId ? null : matchId);
  };

  return (
    <main className={cn("min-h-screen bg-[#090909]", tacticSans.variable)}>
      <div className="container mx-auto px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-tactic-sans text-[32px] italic text-white font-bold">
            Match Tracker
          </h1>
          <div className="flex items-center gap-6">
            {isError && (
              <div className="flex items-center gap-2 text-[#FF4747]">
                <AlertTriangleIcon />
                <span className="text-sm font-medium">Ошибка: не удалось загрузить информацию</span>
              </div>
            )}
            <button
              onClick={() => refresh()}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF4747] text-white text-sm font-medium rounded-lg hover:bg-[#E63E3E] transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
              Обновить
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <RefreshCw className="w-8 h-8 text-[#FF4747] animate-spin" />
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center text-[#808080] text-sm font-medium">
            Нет доступных матчей
          </div>
        ) : (
          <div className="space-y-3">
            {matches.map((match) => (
              <MatchCard 
                key={`${match.title}-${match.time}`}
                match={match}
                isExpanded={expandedMatchId === `${match.title}-${match.time}`}
                onToggle={() => toggleMatch(`${match.title}-${match.time}`)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 