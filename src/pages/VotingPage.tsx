
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import SongCard from '@/components/SongCard';
import PointsControl from '@/components/PointsControl';
import { toast } from 'sonner';

const VotingPage = () => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const [votes, setVotes] = useState<Record<string, number>>({});
  
  // Available points in Eurovision style
  const availablePoints = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12];
  const usedPoints = Object.values(votes);
  
  // Mock songs data - in a real app, this would come from a backend
  // Excluding the current user's own songs
  const songs = [
    { id: '1', title: 'Euphoria', artist: 'Loreen', youtubeId: 'Pfo-8z86x80', thumbnail: 'https://img.youtube.com/vi/Pfo-8z86x80/0.jpg', playerName: 'Alex' },
    { id: '2', title: 'Satellite', artist: 'Lena', youtubeId: 'esTVVjpTzIY', thumbnail: 'https://img.youtube.com/vi/esTVVjpTzIY/0.jpg', playerName: 'Maria' },
    { id: '4', title: 'Toy', artist: 'Netta', youtubeId: 'CziHrYYSyPc', thumbnail: 'https://img.youtube.com/vi/CziHrYYSyPc/0.jpg', playerName: 'Jackson' },
    { id: '5', title: 'Arcade', artist: 'Duncan Laurence', youtubeId: 'R3D-r4ogr7s', thumbnail: 'https://img.youtube.com/vi/R3D-r4ogr7s/0.jpg', playerName: 'Alex' },
  ];
  
  const handleAssignPoints = (songId: string, points: number) => {
    // First, remove this song from any previous point assignment
    const newVotes = { ...votes };
    
    // Find if this song already has points
    const currentPoints = newVotes[songId];
    if (currentPoints) {
      // Remove the current assignment
      delete newVotes[songId];
    }
    
    // Find if these points are already assigned to another song
    const songWithThesePoints = Object.entries(newVotes).find(([_, p]) => p === points);
    if (songWithThesePoints) {
      // Remove points from that song
      delete newVotes[songWithThesePoints[0]];
    }
    
    // Assign the new points
    newVotes[songId] = points;
    setVotes(newVotes);
  };
  
  const handleConfirmVotes = () => {
    // Check if all points have been assigned
    if (Object.keys(votes).length !== Math.min(availablePoints.length, songs.length)) {
      toast.error("Please assign all your points before confirming!");
      return;
    }
    
    setIsReady(true);
    toast.success("Your votes have been submitted!");
    
    // In a real app, we would send the votes to the backend
    // For now, just navigate to the results after a delay
    setTimeout(() => {
      navigate('/results');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 bg-glow-gradient bg-fixed">
      <h1 className="text-3xl font-bold text-eurovision-200 mb-3 text-center">Time to Vote!</h1>
      <p className="text-eurovision-300 text-center mb-8">Drag points to assign them to your favorite songs</p>
      
      <div className="max-w-6xl mx-auto w-full">
        {/* Points bank */}
        <div className="mb-8 bg-eurovision-900/80 backdrop-blur-md rounded-lg border border-eurovision-600 p-4">
          <h2 className="text-xl font-semibold text-eurovision-200 mb-4">Your Points</h2>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {availablePoints.map(points => (
              <div 
                key={points}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                  usedPoints.includes(points)
                    ? 'bg-eurovision-800 text-eurovision-400'
                    : 'bg-eurovision-500 text-white animate-pulse purple-glow'
                }`}
              >
                {points}
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center text-sm text-eurovision-400">
            {isReady ? (
              "Thanks for voting! Waiting for other players..."
            ) : (
              `Assigned ${Object.keys(votes).length} of ${Math.min(availablePoints.length, songs.length)} songs`
            )}
          </div>
        </div>
        
        {/* Songs to vote for */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {songs.map(song => (
            <div key={song.id} className="flex flex-col">
              <SongCard
                title={song.title}
                artist={song.artist}
                thumbnail={song.thumbnail}
                youtubeId={song.youtubeId}
                playerName={song.playerName}
                selected={!!votes[song.id]}
              />
              
              <PointsControl
                songId={song.id}
                onAssignPoints={handleAssignPoints}
                maxPoints={availablePoints}
                usedPoints={usedPoints}
              />
            </div>
          ))}
        </div>
        
        {/* Confirm button */}
        <div className="mt-8 flex justify-center">
          <Button
            className="px-8 py-6 text-lg bg-gradient-to-r from-eurovision-500 to-eurovision-700 hover:from-eurovision-400 hover:to-eurovision-600 text-white"
            onClick={handleConfirmVotes}
            disabled={isReady}
          >
            {isReady ? 'Votes Confirmed!' : 'Confirm Votes'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VotingPage;
