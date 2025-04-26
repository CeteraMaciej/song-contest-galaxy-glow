
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import YouTubePlayer from '@/components/YouTubePlayer';
import GameSongSelection from '@/components/GameSongSelection';
import { toast } from "sonner";

const PlayingSongsPage = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'selection' | 'playing'>('selection');
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const isHost = true; // In a real app, this would be determined by authentication
  
  // Mock data - in a real app, this would come from backend
  const [players] = useState(() => {
    const playerList = [
      { id: '1', name: 'You (Host)', isSelf: true },
      { id: '2', name: 'Alex', isSelf: false },
      { id: '3', name: 'Maria', isSelf: false },
      { id: '4', name: 'Jackson', isSelf: false },
    ];
    // Randomize player order
    return playerList.sort(() => Math.random() - 0.5);
  });

  const [allSongs, setAllSongs] = useState<Array<{
    id: string;
    title: string;
    artist: string;
    youtubeId: string;
    playerName: string;
  }>>([]);

  const handleSongSelectionComplete = (songs: any[]) => {
    const playerSongs = songs.map(song => ({
      ...song,
      playerName: players[currentPlayerIndex].name
    }));
    
    setAllSongs([...allSongs, ...playerSongs]);
    
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      // All players have selected songs, start playing phase
      setPhase('playing');
      // Randomize the song order for playing
      setAllSongs(prev => [...prev].sort(() => Math.random() - 0.5));
    }
  };

  const handleSelectionTimeout = () => {
    toast.error("Time's up! Returning to lobby...");
    navigate('/room-lobby');
  };

  const handleNextSong = () => {
    if (currentSongIndex < allSongs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      // All songs have been played, navigate to voting
      navigate('/voting');
    }
  };

  if (phase === 'selection') {
    const currentPlayer = players[currentPlayerIndex];
    return (
      <div className="min-h-screen bg-glow-gradient bg-fixed">
        <GameSongSelection
          currentPlayer={currentPlayer.name}
          isCurrentPlayer={currentPlayer.isSelf}
          previousSongs={allSongs}
          onComplete={handleSongSelectionComplete}
          onTimeout={handleSelectionTimeout}
        />
      </div>
    );
  }

  // Playing phase UI
  const currentSong = allSongs[currentSongIndex];
  const progress = ((currentSongIndex + 1) / allSongs.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-glow-gradient bg-fixed">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-eurovision-900">
        <div 
          className="h-full bg-eurovision-500"
          style={{ width: `${progress}%`, transition: 'width 0.5s ease-out' }}
        ></div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Song info */}
          <div className="text-center mb-6 animate-fade-in">
            <h2 className="text-4xl font-bold text-eurovision-200 mb-2">
              {currentSong.title}
            </h2>
            <p className="text-xl text-eurovision-300 mb-1">
              {currentSong.artist}
            </p>
            <p className="text-sm text-eurovision-400">
              Added by {currentSong.playerName}
            </p>
          </div>
          
          {/* YouTube player */}
          <div className="rounded-lg overflow-hidden shadow-2xl purple-glow">
            <YouTubePlayer 
              videoId={currentSong.youtubeId} 
              autoplay={true}
              hostControls={true}
              isHost={isHost}
            />
          </div>
          
          {/* Controls */}
          <div className="mt-8 flex justify-center">
            {isHost && (
              <Button
                className="px-8 py-6 text-lg bg-gradient-to-r from-eurovision-500 to-eurovision-700 hover:from-eurovision-400 hover:to-eurovision-600 text-white"
                onClick={handleNextSong}
              >
                {currentSongIndex < allSongs.length - 1 ? 'Next Song' : 'Go to Voting'}
              </Button>
            )}
            
            {!isHost && (
              <div className="text-eurovision-300 text-center">
                Waiting for the host to navigate to the next song...
              </div>
            )}
          </div>
          
          {/* Progress indicator */}
          <div className="mt-6 text-center text-eurovision-400">
            Song {currentSongIndex + 1} of {allSongs.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayingSongsPage;
