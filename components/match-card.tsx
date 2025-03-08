import { cn } from '@/lib/utils';
import type { Match } from '@/types/match';
import { CrownIcon } from '@/components/icons';
import { MatchDetails } from './match-details';

type MatchCardProps = {
  match: Match;
  isExpanded: boolean;
  onToggle: () => void;
};

const statusMap = {
  Scheduled: 'Запланирован',
  Ongoing: 'Live',
  Finished: 'Finished',
};

const statusStyles = {
  Scheduled: 'bg-gray-800 text-gray-400',
  Ongoing: 'bg-[#1DB954] text-white',
  Finished: 'bg-[#FF4747] text-white',
};

export function MatchCard({ match, isExpanded, onToggle }: MatchCardProps) {
  return (
    <div 
      className={cn(
        "bg-[#0B0E12] rounded-lg overflow-hidden cursor-pointer transition-all",
        isExpanded ? "scale-100" : "hover:scale-[1.02]"
      )}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <CrownIcon />
          <span className="text-white font-medium">{match.homeTeam.name}</span>
        </div>
        <div className="flex flex-col items-center">
            <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-white tabular-nums">{match.homeScore}</span>
            <span className="text-[#4D4D4D] text-2xl font-bold">:</span>
            <span className="text-2xl font-bold text-white tabular-nums">{match.awayScore}</span>
            </div>
            <span
            className={cn(
                ' py-1 text-xs font-medium rounded w-[92px] text-center',
                statusStyles[match.status]
            )}
            >
            {statusMap[match.status]}
            </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white font-medium">{match.awayTeam.name}</span>
          <CrownIcon />
        </div>
      </div>      
      {isExpanded && (
        <div className="border-t border-[#262626]">
          <MatchDetails match={match} />
        </div>
      )}
    </div>
  );
} 