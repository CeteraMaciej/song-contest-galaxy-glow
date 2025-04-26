
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SongCard from '@/components/SongCard';
import { toast } from "sonner";

const SongSelectionPage = () => {
  const navigate = useNavigate();
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [songArtist, setSongArtist] = useState('');
  const [selectedSongs, setSelectedSongs] = useState<any[]>([]);
  
  // Mock function to extract video ID from YouTube URL
  const extractYoutubeId = (url: string) => {
    // Simple regex to extract YouTube video ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSongs.length >= 5) {
      toast.error("You can only select 5 songs. Remove one to add another.");
      return;
    }
    
    const videoId = extractYoutubeId(youtubeUrl);
    
    if (!videoId) {
      toast.error("Invalid YouTube URL. Please enter a valid URL.");
      return;
    }
    
    // Check for duplicates
    if (selectedSongs.some(song => song.youtubeId === videoId || song.title.toLowerCase() === songTitle.toLowerCase())) {
      toast.error("This song or title is already in your selection.");
      return;
    }
    
    // Add the song to selected songs
    setSelectedSongs([...selectedSongs, {
      id: Date.now().toString(),
      title: songTitle,
      artist: songArtist,
      youtubeId: videoId,
      thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`,
      playerName: 'You' // In a real app, this would be the logged-in user's name
    }]);
    
    // Reset form
    setYoutubeUrl('');
    setSongTitle('');
    setSongArtist('');
    
    toast.success("Song added to your selection!");
  };
  
  const handleRemoveSong = (songId: string) => {
    setSelectedSongs(selectedSongs.filter(song => song.id !== songId));
    toast.info("Song removed from your selection.");
  };
  
  const handleSaveSongs = () => {
    if (selectedSongs.length !== 5) {
      toast.error("You need to select exactly 5 songs.");
      return;
    }
    
    // In a real app, we would save these songs to the user's profile
    toast.success("Your song selection has been saved!");
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 bg-glow-gradient bg-fixed">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="text-eurovision-300 hover:text-eurovision-200 hover:bg-eurovision-900/50" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold text-eurovision-200 mb-6">Select Your Songs</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="bg-eurovision-900/80 backdrop-blur-md rounded-lg border border-eurovision-600 p-4 sticky top-4">
            <h2 className="text-xl font-semibold text-eurovision-200 mb-4">Add a Song</h2>
            
            <form onSubmit={handleAddSong} className="space-y-4">
              <div className="space-y-2">
                <label className="text-eurovision-300 text-sm">YouTube URL</label>
                <Input
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="bg-eurovision-900/50 border-eurovision-700 text-eurovision-200 focus:border-eurovision-500"
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-eurovision-300 text-sm">Song Title</label>
                <Input
                  value={songTitle}
                  onChange={(e) => setSongTitle(e.target.value)}
                  className="bg-eurovision-900/50 border-eurovision-700 text-eurovision-200 focus:border-eurovision-500"
                  placeholder="Enter song title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-eurovision-300 text-sm">Artist</label>
                <Input
                  value={songArtist}
                  onChange={(e) => setSongArtist(e.target.value)}
                  className="bg-eurovision-900/50 border-eurovision-700 text-eurovision-200 focus:border-eurovision-500"
                  placeholder="Enter artist name"
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-eurovision-500 to-eurovision-700 hover:from-eurovision-400 hover:to-eurovision-600 text-white border-0"
              >
                Add Song
              </Button>
            </form>
            
            <div className="mt-6 pt-4 border-t border-eurovision-800">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-md font-medium text-eurovision-300">Your Selection</h3>
                <span className="text-sm text-eurovision-400">{selectedSongs.length}/5 songs</span>
              </div>
              
              {selectedSongs.length === 0 ? (
                <p className="text-eurovision-400 text-sm text-center py-4">
                  No songs selected yet. Add some songs!
                </p>
              ) : (
                <ul className="space-y-2">
                  {selectedSongs.map(song => (
                    <li key={song.id} className="bg-eurovision-800/50 rounded p-2 flex justify-between items-center">
                      <div className="truncate">
                        <p className="text-eurovision-200 truncate">{song.title}</p>
                        <p className="text-eurovision-400 text-xs truncate">{song.artist}</p>
                      </div>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 text-eurovision-400 hover:text-eurovision-200 hover:bg-eurovision-700"
                        onClick={() => handleRemoveSong(song.id)}
                      >
                        ✕
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
              
              <Button
                className="w-full mt-4 bg-gradient-to-r from-eurovision-600 to-eurovision-800 hover:from-eurovision-500 hover:to-eurovision-700 text-white"
                disabled={selectedSongs.length !== 5}
                onClick={handleSaveSongs}
              >
                Save Selection
              </Button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 order-1 lg:order-2">
          <h2 className="text-xl font-semibold text-eurovision-200 mb-4">Your Song Collection</h2>
          
          {selectedSongs.length === 0 ? (
            <div className="bg-eurovision-900/60 backdrop-blur-sm rounded-lg border border-eurovision-800 p-8 text-center">
              <p className="text-eurovision-300 mb-3">Your song collection is empty</p>
              <p className="text-eurovision-400 text-sm">Add songs using the form on the left to see them here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedSongs.map(song => (
                <SongCard
                  key={song.id}
                  title={song.title}
                  artist={song.artist}
                  thumbnail={song.thumbnail}
                  youtubeId={song.youtubeId}
                  playerName={song.playerName}
                  onSelect={() => handleRemoveSong(song.id)}
                  selected={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongSelectionPage;
