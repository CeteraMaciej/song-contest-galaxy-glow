
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import RoomCard from '@/components/RoomCard';

const JoinRoomPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  
  // Mock rooms data - in a real app, this would come from a backend
  const rooms = [
    { id: '1', name: 'Eurovision Party 2025', host: 'Michael', players: 3, maxPlayers: 8, status: 'waiting' as const },
    { id: '2', name: 'Song Battle Royale', host: 'Sofia', players: 5, maxPlayers: 6, status: 'waiting' as const },
    { id: '3', name: 'Music Lovers', host: 'David', players: 2, maxPlayers: 10, status: 'waiting' as const },
    { id: '4', name: 'Karaoke Night', host: 'Emma', players: 4, maxPlayers: 8, status: 'playing' as const },
  ];
  
  // Filter rooms based on search query
  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.host.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleJoinRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    setShowNameInput(true);
  };
  
  const handleConfirmJoin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would join the room in the backend
    // For now, just navigate to the "room"
    navigate('/room-lobby');
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
      
      {!showNameInput ? (
        <div className="flex-1 flex flex-col">
          <h1 className="text-3xl font-bold text-eurovision-200 mb-6">Available Rooms</h1>
          
          <div className="mb-6">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-eurovision-900/50 border-eurovision-700 text-eurovision-200 focus:border-eurovision-500"
              placeholder="Search rooms..."
            />
          </div>
          
          {filteredRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRooms.map(room => (
                <RoomCard
                  key={room.id}
                  roomName={room.name}
                  hostName={room.host}
                  playerCount={room.players}
                  maxPlayers={room.maxPlayers}
                  status={room.status}
                  onJoin={() => handleJoinRoom(room.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-eurovision-300 text-center">
                <p className="mb-2">No rooms found matching your search.</p>
                <p className="text-sm">Try a different search or create your own room!</p>
              </div>
            </div>
          )}
          
          <div className="mt-6">
            <Button 
              onClick={() => navigate('/create-room')}
              className="bg-gradient-to-r from-eurovision-500 to-eurovision-700 hover:from-eurovision-400 hover:to-eurovision-600 text-white border-0"
            >
              Create New Room
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md p-6 bg-eurovision-900/80 backdrop-blur-md rounded-lg border border-eurovision-600 purple-glow">
            <h2 className="text-2xl font-bold text-eurovision-200 mb-6">
              Join "{rooms.find(r => r.id === selectedRoomId)?.name}"
            </h2>
            
            <form onSubmit={handleConfirmJoin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-eurovision-300">Your Name</label>
                <Input
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="bg-eurovision-900/50 border-eurovision-700 text-eurovision-200 focus:border-eurovision-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div className="pt-4 flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-eurovision-600 text-eurovision-300 hover:bg-eurovision-800"
                  onClick={() => setShowNameInput(false)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-eurovision-500 to-eurovision-700 hover:from-eurovision-400 hover:to-eurovision-600 text-white border-0"
                >
                  Join Room
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinRoomPage;
