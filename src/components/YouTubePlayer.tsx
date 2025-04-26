
import React, { useState, useEffect } from 'react';

interface YouTubePlayerProps {
  videoId: string;
  autoplay?: boolean;
  hostControls?: boolean;
  isHost?: boolean;
  onEnded?: () => void;
}

const YouTubePlayer = ({ videoId, autoplay = false, hostControls = false, isHost = false, onEnded }: YouTubePlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset loading state when video changes
    setIsLoading(true);
    
    // Simulate loading time for demo purposes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [videoId]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-eurovision-900/80 animate-pulse">
          <div className="text-eurovision-300">Loading video...</div>
        </div>
      )}
      
      <div className={`aspect-video transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* For demo purposes, we'll use an iframe with a placeholder. In a real app, use the YouTube API */}
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&controls=${hostControls && !isHost ? 0 : 1}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          onLoad={() => setIsLoading(false)}
        ></iframe>
      </div>
      
      {hostControls && !isHost && (
        <div className="absolute bottom-0 left-0 right-0 bg-eurovision-900/80 p-2 text-center text-sm text-eurovision-300">
          Only the host can control this video
        </div>
      )}
    </div>
  );
};

export default YouTubePlayer;
