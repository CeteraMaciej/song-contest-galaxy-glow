
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface RoomCardProps {
  roomName: string;
  hostName: string;
  playerCount: number;
  maxPlayers: number;
  status: 'waiting' | 'playing' | 'voting' | 'results';
  onJoin: () => void;
}

const RoomCard = ({ roomName, hostName, playerCount, maxPlayers, status, onJoin }: RoomCardProps) => {
  const statusText = {
    waiting: 'Waiting for players',
    playing: 'Listening to songs',
    voting: 'Voting in progress',
    results: 'Revealing results',
  };

  return (
    <Card className="w-full border-eurovision-600 bg-gradient-to-b from-eurovision-900/80 to-black/80 backdrop-blur-sm hover:purple-glow transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="text-eurovision-200">{roomName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-eurovision-300">Host:</span>
          <span className="text-eurovision-200">{hostName}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-eurovision-300">Players:</span>
          <span className="text-eurovision-200">{playerCount}/{maxPlayers}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-eurovision-300">Status:</span>
          <span className="text-eurovision-200">{statusText[status]}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onJoin} 
          className="w-full bg-gradient-to-r from-eurovision-600 to-eurovision-800 hover:from-eurovision-500 hover:to-eurovision-700 text-white"
          disabled={status !== 'waiting'}
        >
          {status === 'waiting' ? 'Join Room' : 'Cannot Join'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
