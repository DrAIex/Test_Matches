import { Match } from '@/types/match';
import { CrownIcon } from './icons';

type PlayerRowProps = {
  username: string;
  kills: number;
};

function PlayerRow({ username, kills }: PlayerRowProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[#808080]">{username}</span>
      <div className="flex items-center gap-1">
        <span className="text-white">Убийств:</span>
        <span className="text-[#808080]">{kills}</span>
      </div>
    </div>
  );
}

type TeamStatsProps = {
  name: string;
  players: Array<{ username: string; kills: number }>;
  points: number;
  total_kills: number;
  place: number;
  showCrownLeft?: boolean;
  showCrownRight?: boolean;
};

function TeamStats({ name, players, points, total_kills, place, showCrownLeft, showCrownRight }: TeamStatsProps) {
  return (
    <div className="flex-1">
      <div className="flex gap-10">
        {players.map((player) => (
          <PlayerRow
            key={player.username}
            username={player.username}
            kills={player.kills}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-between text-sm">
        <span className="text-[#808080]">Points: +{points}</span>
        <span className="text-[#808080]">Место: {place}</span>
        <span className="text-[#808080]">Всего убийств: {total_kills}</span>
      </div>
    </div>
  );
}

type MatchDetailsProps = {
  match: Match;
};

export function MatchDetails({ match }: MatchDetailsProps) {
  return (
    <div className="p-6">
      <div className="flex gap-8">
        <TeamStats
          {...match.homeTeam}
          showCrownLeft
        />
        <div className="w-px bg-[#262626]" />
        <TeamStats
          {...match.awayTeam}
          showCrownRight
        />
      </div>
    </div>
  );
} 