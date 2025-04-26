
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Timer } from 'lucide-react';
import { toast } from "sonner";
import SongCard from '@/components/SongCard';

interface GameSongSelectionProps {
  currentPlayer: string;
  isCurrentPlayer: boolean;
  previousSongs: Array<{ title: string; youtubeId: string }>;
  onComplete: (songs: Array<{ title: string; artist: string; youtubeId: string }>) => void;
  onTimeout: () => void;
}

const GameSongSelection = ({ 
  currentPlayer, 
  isCurrentPlayer, 
  previousSongs,
  onComplete, 
  onTimeout 
}: GameSongSelectionProps) => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [songArtist, setSongArtist] = useState('');
  const [selectedSongs, setSelectedSongs] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (!isCurrentPlayer) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCurrentPlayer, onTimeout]);

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const isDuplicateSong = (videoId: string, title: string) => {
    return previousSongs.some(song => 
      song.youtubeId === videoId || 
      song.title.toLowerCase() === title.toLowerCase()
    );
  };

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSongs.length >= 5) {
      toast.error("You can only select 5 songs");
      return;
    }
    
    const videoId = extractYoutubeId(youtubeUrl);
    
    if (!videoId) {
      toast.error("Invalid YouTube URL");
      return;
    }
    
    if (isDuplicateSong(videoId, songTitle)) {
      toast.error("This song was already selected by another player. Please choose a different song.");
      return;
    }

    if (selectedSongs.some(song => song.youtubeId === videoId || song.title.toLowerCase() === songTitle.toLowerCase())) {
      toast.error("You've already added this song");
      return;
    }
    
    setSelectedSongs([...selectedSongs, {
      id: Date.now().toString(),
      title: songTitle,
      artist: songArtist,
      youtubeId: videoId,
      thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`,
    }]);
    
    setYoutubeUrl('');
    setSongTitle('');
    setSongArtist('');
    
    toast.success("Song added to your selection!");
  };
  
  const handleRemoveSong = (songId: string) => {
    setSelectedSongs(selectedSongs.filter(song => song.id !== songId));
    toast.info("Song removed from your selection");
  };
  
  const handleSubmit = () => {
    if (selectedSongs.length !== 5) {
      toast.error("You must select exactly 5 songs");
      return;
    }
    onComplete(selectedSongs);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isCurrentPlayer) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl text-eurovision-200 mb-4">Waiting for {currentPlayer} to select songs...</h2>
        <p className="text-eurovision-300">Time remaining: {formatTime(timeLeft)}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-eurovision-200">Select Your Songs</h2>
        <div className="flex items-center gap-2 text-eurovision-300">
          <Timer className="w-5 h-5" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-eurovision-900/80 backdrop-blur-md rounded-lg border border-eurovision-600 p-4">
            <form onSubmit={handleAddSong} className="space-y-4">
              <div className="space-y-2">
                <label className="text-eurovision-300 text-sm">YouTube URL</label>
                <Input
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="bg-eurovision-900/50 border-eurovision-700 text-eurovision-200"
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-eurovision-300 text-sm">Song Title</label>
                <Input
                  value={songTitle}
                  onChange={(e) => setSongTitle(e.target.value)}
                  className="bg-eurovision-900/50 border-eurovision-700 text-eurovision-200"
                  placeholder="Enter song title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-eurovision-300 text-sm">Artist</label>
                <Input
                  value={songArtist}
                  onChange={(e) => setSongArtist(e.target.value)}
                  className="bg-eurovision-900/50 border-eurovision-700 text-eurovision-200"
                  placeholder="Enter artist name"
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-eurovision-500 to-eurovision-700 hover:from-eurovision-400 hover:to-eurovision-600 text-white"
              >
                Add Song ({selectedSongs.length}/5)
              </Button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="space-y-4">
            {selectedSongs.map(song => (
              <SongCard
                key={song.id}
                title={song.title}
                artist={song.artist}
                thumbnail={song.thumbnail}
                youtubeId={song.youtubeId}
                playerName={currentPlayer}
                onSelect={() => handleRemoveSong(song.id)}
                selected={false}
              />
            ))}
          </div>

          {selectedSongs.length === 5 && (
            <Button
              onClick={handleSubmit}
              className="w-full mt-6 bg-gradient-to-r from-eurovision-500 to-eurovision-700 hover:from-eurovision-400 hover:to-eurovision-600 text-white"
            >
              Confirm Selection
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameSongSelection;
