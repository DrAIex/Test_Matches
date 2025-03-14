'use client';

import { useState } from 'react';
import { useMatches } from '@/hooks/use-matches';
import { MatchCard } from '@/components/match-card';
import { cn } from '@/lib/utils';
import { RefreshIcon } from '@/components/icons';
import { tacticSans } from './fonts';
import { Team, MatchStatus, Match } from '@/types/match';

export default function Home() {
  const { matches, isLoading, isError, refresh } = useMatches();
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'All' | 'Ongoing' | 'Finished' | 'Scheduled'>('All');

  const toggleMatch = (matchId: string) => {
    setExpandedMatchId(expandedMatchId === matchId ? null : matchId);
  };

  const matchArray = Array.isArray(matches) ? matches : [];

  const filteredMatches = matchArray.filter((match: Match) =>
    filter === 'All' ? true : match.status === filter
  );

  return (
    <main className={cn("min-h-screen bg-[#090909]", tacticSans.variable)}>
      <div className="container max-w-[1920px] mx-auto px-6 py-6">
        <div className="flex justify-between items-center mb-6 flex-col md:flex-row">
          <div className="flex flex-col md:flex-row w-full md:w-auto md:gap-4">
            <h1 className="font-tactic-sans text-[32px] italic text-white font-black text-center w-full md:w-auto md:mb-4 md:mb-0">
              Match Tracker
            </h1>
            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'All' | 'Ongoing' | 'Finished')}
                className="bg-[#0F1318] text-[#B4B5B6] rounded-sm px-4 md:py-2 py-5 my-2 w-full md:w-auto"
              >
              <option value="All">Все статусы</option>
              <option value="Ongoing">Live</option>
              <option value="Finished">Finished</option>
              <option value="Scheduled">Match preparing</option>
            </select>
          </div>

          <div className="flex flex-col md:flex-row w-full md:w-auto gap-4">
            <button
              onClick={() => refresh()}
              className="w-full md:w-auto h-14 flex items-center justify-center gap-4 px-4 py-2 bg-[#EB0237] text-white text-[18px] font-semibold rounded-sm hover:bg-[#A01131] transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              Обновить
              <RefreshIcon className={cn(isLoading && "animate-spin")} />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <RefreshIcon className="text-[#FF4747] animate-spin" />
          </div>
        ) : filteredMatches.length === 0 ? (
          <div className="text-center text-[#808080] text-sm font-medium">
            Нет доступных матчей
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMatches.map((match: { title: any; time: any; homeTeam?: Team; awayTeam?: Team; homeScore?: number; awayScore?: number; status?: MatchStatus; }) => (
              <MatchCard 
                key={`${match.title}-${match.time}`}
                match={match as Match}
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