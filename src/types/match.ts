export type Match = {
  id: number;
  team1Name: string;
  team2Name: string;
  team1Score: number;
  team2Score: number;
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED';
};

export type MatchesResponse = {
  matches: Match[];
}; 