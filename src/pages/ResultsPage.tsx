import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Song {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  thumbnail: string;
  playerName: string;
  points: number;
}

const ResultsPage = () => {
  const navigate = useNavigate();
  const [currentVoterIndex, setCurrentVoterIndex] = useState(-1);
  const [revealedSongs, setRevealedSongs] = useState<string[]>([]);
  const [songsWithPoints, setSongsWithPoints] = useState<Song[]>([]);
  
  // Mock songs data - in a real app, this would come from a backend
  const initialSongs: Song[] = [
    { id: '1', title: 'Euphoria', artist: 'Loreen', youtubeId: 'Pfo-8z86x80', thumbnail: 'https://img.youtube.com/vi/Pfo-8z86x80/0.jpg', playerName: 'Alex', points: 0 },
    { id: '2', title: 'Satellite', artist: 'Lena', youtubeId: 'esTVVjpTzIY', thumbnail: 'https://img.youtube.com/vi/esTVVjpTzIY/0.jpg', playerName: 'Maria', points: 0 },
    { id: '3', title: 'Fairytale', artist: 'Alexander Rybak', youtubeId: 'WXwgZL4sgaQ', thumbnail: 'https://img.youtube.com/vi/WXwgZL4sgaQ/0.jpg', playerName: 'You', points: 0 },
    { id: '4', title: 'Toy', artist: 'Netta', youtubeId: 'CziHrYYSyPc', thumbnail: 'https://img.youtube.com/vi/CziHrYYSyPc/0.jpg', playerName: 'Jackson', points: 0 },
    { id: '5', title: 'Arcade', artist: 'Duncan Laurence', youtubeId: 'R3D-r4ogr7s', thumbnail: 'https://img.youtube.com/vi/R3D-r4ogr7s/0.jpg', playerName: 'Alex', points: 0 },
  ];
  
  // Mock voters data - in a real app, this would come from a backend
  const voters = [
    { id: '1', name: 'You', points: { '1': 12, '2': 10, '4': 8, '5': 7 } },
    { id: '2', name: 'Alex', points: { '2': 12, '3': 10, '4': 8, '5': 7 } },
    { id: '3', name: 'Maria', points: { '1': 12, '3': 10, '4': 8, '5': 7 } },
    { id: '4', name: 'Jackson', points: { '1': 12, '2': 10, '3': 8, '5': 7 } },
  ];
  
  // Start the points reveal after component mounts
  useEffect(() => {
    setSongsWithPoints(initialSongs);
    
    // Start the voting sequence after a delay
    const timer = setTimeout(() => {
      setCurrentVoterIndex(0);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle voter points reveal
  useEffect(() => {
    if (currentVoterIndex >= 0 && currentVoterIndex < voters.length) {
      const voter = voters[currentVoterIndex];
      const voterPoints = voter.points;
      
      // Reveal points one by one with delay
      Object.entries(voterPoints).forEach(([songId, points], index) => {
        setTimeout(() => {
          setSongsWithPoints(prev => {
            return prev.map(song => {
              if (song.id === songId) {
                return { ...song, points: song.points + points };
              }
              return song;
            }).sort((a, b) => b.points - a.points);
          });
          
          setRevealedSongs(prev => [...prev, songId]);
        }, 1500 * (index + 1));
      });
      
      // Move to next voter after a delay
      setTimeout(() => {
        setCurrentVoterIndex(prev => prev + 1);
        setRevealedSongs([]);
      }, 1500 * (Object.keys(voterPoints).length + 1));
    }
  }, [currentVoterIndex]);
  
  const handlePlayAgain = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 bg-glow-gradient bg-fixed">
      <h1 className="text-4xl font-bold text-eurovision-200 mb-3 text-center text-glow">The Results</h1>
      
      {currentVoterIndex < voters.length ? (
        <>
          {currentVoterIndex >= 0 && (
            <div className="text-center mb-8 animate-fade-in">
              <p className="text-2xl text-eurovision-300">
                Points from <span className="font-bold text-eurovision-200">{voters[currentVoterIndex].name}</span>
              </p>
            </div>
          )}
          
          <div className="max-w-4xl mx-auto w-full">
            <div className="space-y-4">
              {songsWithPoints.map(song => (
                <div 
                  key={song.id}
                  className={`bg-eurovision-900/80 backdrop-blur-md rounded-lg border 
                    ${revealedSongs.includes(song.id) 
                      ? 'border-eurovision-500 purple-glow' 
                      : 'border-eurovision-800'
                    } p-4 flex items-center justify-between transition-all duration-500`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 overflow-hidden rounded-md flex-shrink-0">
                      <img src={song.thumbnail} alt={song.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-eurovision-200 font-semibold">{song.title}</h3>
                      <p className="text-eurovision-400 text-sm">{song.artist} • Added by {song.playerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center 
                      ${revealedSongs.includes(song.id) 
                        ? 'bg-eurovision-500 text-white animate-score-reveal' 
                        : 'bg-eurovision-800 text-eurovision-400'
                      } font-bold text-xl`}
                    >
                      {song.points}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="text-2xl text-eurovision-300 text-center mb-8">
            Final Standings
          </p>
          
          <div className="max-w-4xl mx-auto w-full">
            {/* Winner highlight */}
            {songsWithPoints.length > 0 && (
              <div className="mb-8 p-6 bg-gradient-to-r from-eurovision-800 to-eurovision-900 rounded-lg border-2 border-eurovision-500 purple-glow animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-full bg-eurovision-500 text-white flex items-center justify-center font-bold text-4xl">
                      1
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-eurovision-200">{songsWithPoints[0].title}</h2>
                      <p className="text-xl text-eurovision-300">{songsWithPoints[0].artist}</p>
                      <p className="text-sm text-eurovision-400 mt-1">Added by {songsWithPoints[0].playerName}</p>
                    </div>
                  </div>
                  <div className="text-5xl font-bold text-eurovision-200">
                    {songsWithPoints[0].points}
                    <span className="text-sm ml-1 text-eurovision-400">pts</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Other results */}
            <div className="space-y-4">
              {songsWithPoints.slice(1).map((song, index) => (
                <div 
                  key={song.id}
                  className="bg-eurovision-900/60 backdrop-blur-sm rounded-lg border border-eurovision-800 p-4 flex items-center justify-between animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-eurovision-800 text-eurovision-300 flex items-center justify-center font-bold">
                      {index + 2}
                    </div>
                    <div>
                      <h3 className="text-eurovision-200 font-semibold">{song.title}</h3>
                      <p className="text-eurovision-400 text-sm">{song.artist} • Added by {song.playerName}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-eurovision-300">
                    {song.points}
                    <span className="text-xs ml-1 text-eurovision-400">pts</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Play again button */}
            <div className="mt-10 flex justify-center">
              <Button
                className="px-8 py-6 text-lg bg-gradient-to-r from-eurovision-500 to-eurovision-700 hover:from-eurovision-400 hover:to-eurovision-600 text-white"
                onClick={handlePlayAgain}
              >
                Play Again
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultsPage;
