
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface SongCardProps {
  title: string;
  artist: string;
  thumbnail: string;
  youtubeId: string;
  playerName: string;
  onSelect?: () => void;
  selected?: boolean;
}

const SongCard = ({ title, artist, thumbnail, playerName, onSelect, selected }: SongCardProps) => {
  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 ${
        selected 
          ? 'border-eurovision-500 purple-glow bg-eurovision-900/50' 
          : 'border-eurovision-800 bg-eurovision-900/30 hover:border-eurovision-600'
      }`}
      onClick={onSelect}
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
          <p className="text-xs text-eurovision-200">Added by {playerName}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-eurovision-100 truncate">{title}</h3>
        <p className="text-sm text-eurovision-300 truncate">{artist}</p>
      </CardContent>
      {onSelect && (
        <CardFooter className="p-2 bg-eurovision-900/50">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={`w-full py-1 rounded text-sm font-medium ${
              selected 
                ? 'bg-eurovision-500 text-white' 
                : 'bg-eurovision-800 hover:bg-eurovision-700 text-eurovision-200'
            }`}
          >
            {selected ? 'Selected' : 'Select Song'}
          </button>
        </CardFooter>
      )}
    </Card>
  );
};

export default SongCard;
