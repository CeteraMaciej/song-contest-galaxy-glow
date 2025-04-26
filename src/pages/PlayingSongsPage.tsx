
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import YouTubePlayer from '@/components/YouTubePlayer';

const PlayingSongsPage = () => {
  const navigate = useNavigate();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const isHost = true; // In a real app, this would be determined by authentication
  
  // Mock songs data - in a real app, this would come from a backend
  const songs = [
    { id: '1', title: 'Euphoria', artist: 'Loreen', youtubeId: 'Pfo-8z86x80', playerName: 'Alex' },
    { id: '2', title: 'Satellite', artist: 'Lena', youtubeId: 'esTVVjpTzIY', playerName: 'Maria' },
    { id: '3', title: 'Fairytale', artist: 'Alexander Rybak', youtubeId: 'WXwgZL4sgaQ', playerName: 'You' },
    { id: '4', title: 'Toy', artist: 'Netta', youtubeId: 'CziHrYYSyPc', playerName: 'Jackson' },
    { id: '5', title: 'Arcade', artist: 'Duncan Laurence', youtubeId: 'R3D-r4ogr7s', playerName: 'Alex' },
  ];
  
  const totalSongs = songs.length;
  const progress = ((currentSongIndex + 1) / totalSongs) * 100;
  
  const handleNextSong = () => {
    if (currentSongIndex < totalSongs - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      // All songs have been played, navigate to voting
      navigate('/voting');
    }
  };
  
  const currentSong = songs[currentSongIndex];
  
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
                {currentSongIndex < totalSongs - 1 ? 'Next Song' : 'Go to Voting'}
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
            Song {currentSongIndex + 1} of {totalSongs}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayingSongsPage;
