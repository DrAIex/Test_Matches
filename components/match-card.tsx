import { cn } from '@/lib/utils';
import type { Match } from '@/types/match';
import { CrownIcon } from '@/components/icons';
import { MatchDetails } from './match-details';
import { useEffect, useState } from 'react';

type MatchCardProps = {
  match: Match;
  isExpanded: boolean;
  onToggle: () => void;
};

const statusMap = {
  Scheduled: 'Match preparing',
  Ongoing: 'Live',
  Finished: 'Finished',
};

const statusStyles = {
  Scheduled: 'bg-[#EB6402] text-white',
  Ongoing: 'bg-[#1DB954] text-white',
  Finished: 'bg-[#FF4747] text-white',
};

export const MatchCard = ({ match, isExpanded, onToggle }: MatchCardProps) => {
  const [animatedHomeScore, setAnimatedHomeScore] = useState(match.homeScore);
  const [animatedAwayScore, setAnimatedAwayScore] = useState(match.awayScore);
  const [homeScoreColor, setHomeScoreColor] = useState('text-white');
  const [awayScoreColor, setAwayScoreColor] = useState('text-white');

  useEffect(() => {
    if (animatedHomeScore !== match.homeScore) {
      setHomeScoreColor('text-red-500');
      const timeout = setTimeout(() => {
        setAnimatedHomeScore(match.homeScore);
        setHomeScoreColor('text-white');
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [match.homeScore, animatedHomeScore]);

  useEffect(() => {
    if (animatedAwayScore !== match.awayScore) {
      setAwayScoreColor('text-red-500');
      const timeout = setTimeout(() => {
        setAnimatedAwayScore(match.awayScore);
        setAwayScoreColor('text-white');
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [match.awayScore, animatedAwayScore]);

  return (
    <div 
      className={cn(
        "bg-[#0B0E12] rounded-lg overflow-hidden cursor-pointer transition-all",
        isExpanded ? "scale-100" : "hover:scale-[1.02]"
      )}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between px-2 py-2 md:px-6 md:py-4">
        <div className="flex items-center gap-4">
          <CrownIcon />
          <span className="text-white font-medium">{match.homeTeam.name}</span>
        </div>
        <div className="flex flex-col items-center">
            <div className="flex items-center gap-3">
            <span className={`text-2xl font-bold tabular-nums transition-colors duration-500 ${homeScoreColor}`}>
              {animatedHomeScore}
            </span>
            <span className="text-2xl font-bold">:</span>
            <span className={`text-2xl font-bold tabular-nums transition-colors duration-500 ${awayScoreColor}`}>
              {animatedAwayScore}
            </span>
            </div>
            <span
            className={cn(
                ' py-1 px-2 text-xs font-medium rounded min-w-[92px] text-center',
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
  )
}