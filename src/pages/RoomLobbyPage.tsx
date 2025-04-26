
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const RoomLobbyPage = () => {
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);
  
  // Mock data - in a real app, this would come from a backend
  const roomCode = "ABC123";
  const isHost = true;
  
  const players = [
    { id: '1', name: 'You (Host)', status: 'ready', isSelf: true, isHost: true, songCount: 5 },
    { id: '2', name: 'Alex', status: 'ready', isSelf: false, isHost: false, songCount: 5 },
    { id: '3', name: 'Maria', status: 'selecting', isSelf: false, isHost: false, songCount: 3 },
    { id: '4', name: 'Jackson', status: 'waiting', isSelf: false, isHost: false, songCount: 0 },
  ];
  
  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const handleStartGame = () => {
    // Check if all players are ready
    const allReady = players.every(player => player.status === 'ready');
    
    if (!allReady) {
      alert("Not all players are ready yet!");
      return;
    }
    
    navigate('/playing');
  };
  
  const handleLeaveRoom = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 bg-glow-gradient bg-fixed">
      <div className="mb-6 flex justify-between items-center">
        <Button 
          variant="ghost" 
          className="text-eurovision-300 hover:text-eurovision-200 hover:bg-eurovision-900/50" 
          onClick={handleLeaveRoom}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Leave Room
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="text-sm text-eurovision-300">Room Code:</div>
          <Button
            variant="outline"
            className="h-8 border-eurovision-700 text-eurovision-200 bg-eurovision-900/80"
            onClick={copyRoomCode}
          >
            {roomCode} {isCopied ? "✓" : "📋"}
          </Button>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-eurovision-200 mb-3 text-center">Room Lobby</h1>
        <p className="text-eurovision-300 text-center mb-8">Waiting for players to join and get ready...</p>
        
        <div className="bg-eurovision-900/80 backdrop-blur-md rounded-lg border border-eurovision-600 p-6">
          <h2 className="text-xl font-semibold text-eurovision-200 mb-6">Players</h2>
          
          <div className="space-y-3 mb-8">
            {players.map(player => (
              <div 
                key={player.id} 
                className={`flex items-center justify-between p-3 rounded-md ${
                  player.isSelf 
                    ? 'bg-eurovision-700/50 border border-eurovision-500' 
                    : 'bg-eurovision-800/50 border border-eurovision-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    player.status === 'ready' 
                      ? 'bg-green-500' 
                      : player.status === 'selecting' 
                      ? 'bg-yellow-500' 
                      : 'bg-red-500'
                  }`}></div>
                  <div>
                    <div className="font-medium text-eurovision-200">{player.name}</div>
                    <div className="text-xs text-eurovision-400">
                      {player.status === 'ready' 
                        ? 'Ready to play' 
                        : player.status === 'selecting' 
                        ? `Selecting songs (${player.songCount}/5)` 
                        : 'Not ready'
                      }
                    </div>
                  </div>
                </div>
                
                {player.isHost && (
                  <div className="text-xs text-eurovision-300 bg-eurovision-700/60 px-2 py-1 rounded">
                    Host
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {isHost ? (
            <div className="flex justify-center">
              <Button
                className="px-8 py-6 text-lg bg-gradient-to-r from-eurovision-500 to-eurovision-700 hover:from-eurovision-400 hover:to-eurovision-600 text-white"
                onClick={handleStartGame}
              >
                Start Game
              </Button>
            </div>
          ) : (
            <div className="text-center text-eurovision-300">
              Waiting for the host to start the game...
            </div>
          )}
        </div>
        
        <div className="mt-8 bg-eurovision-900/60 backdrop-blur-sm rounded-lg border border-eurovision-800 p-4">
          <h3 className="font-medium text-eurovision-300 mb-2">How to Play</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-eurovision-400">
            <li>Each player selects 5 songs before joining the room</li>
            <li>Songs will be played one by one in random order</li>
            <li>After listening to all songs, you'll vote for your favorites</li>
            <li>Points are awarded Eurovision-style (1-8, 10, and 12 points)</li>
            <li>The song with the most points wins!</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RoomLobbyPage;
