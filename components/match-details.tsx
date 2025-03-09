import { Match } from '@/types/match';
import avatar from '@/public/avatar_global.png';
import Image from 'next/image';

type PlayerRowProps = {
  username: string;
  kills: number;
}

const PlayerRow = ({ username, kills }: PlayerRowProps) => (
  <div className="flex justify-between gap-2 bg-[#101318] px-2 py-2 w-full">
    <div className="flex items-center px-2 py-2">
      <Image src={avatar} alt='Player avatar' width={24} height={24} />
      <span className=" px-2" >{username}</span>
    </div>
    <div className="flex items-center gap-2 px-2">
      <span className="text-[#808080]">Убийств:</span>
      <span className="text-[#fff]">{kills}</span>
    </div>
  </div>
)

type TeamStatsProps = {
  name: string;
  players: Array<{ username: string; kills: number }>;
  points: number;
  total_kills: number;
  place: number;
  showCrownLeft?: boolean;
  showCrownRight?: boolean;
};

const TeamStats = ({ players, points, total_kills, place }: TeamStatsProps) => (
  <div className="flex-1">
    <div className="flex justify-between gap-2 flex-wrap 2xl:flex-nowrap">
      {players.map((player) => (
        <PlayerRow
          key={player.username}
          username={player.username}
          kills={player.kills}
        />
      ))}
    </div>
    <div className="bg-[#101318] mt-4 flex justify-between text-sm px-4 2xl:px-20 py-4 flex-wrap 2xl:flex-nowrap">
      <span className="text-[#808080]">Points: 
        <span className="text-[#fff] px-2">+{points}</span>
      </span>
      <span className="text-[#808080]">Место: 
        <span className="text-[#fff] px-2">{place}</span>
      </span>
      <span className="text-[#808080]">Всего убийств:
        <span className="text-[#fff] px-2">{total_kills}</span>
      </span>
    </div>
  </div>
)

type MatchDetailsProps = {
  match: Match;
};

export const MatchDetails = ({ match }: MatchDetailsProps) => (
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
)