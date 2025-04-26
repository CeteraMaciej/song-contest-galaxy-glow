
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CreateRoomPage = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(8);

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would create the room in the backend
    // For now, just navigate to the "room"
    navigate('/room-lobby');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-glow-gradient bg-fixed">
      <div className="w-full max-w-md">
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
        
        <Card className="border-eurovision-600 bg-gradient-to-b from-eurovision-900/90 to-black/90 backdrop-blur-md purple-glow">
          <CardHeader>
            <CardTitle className="text-2xl text-eurovision-200">Create a New Room</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateRoom} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="roomName" className="text-eurovision-300">Room Name</Label>
                <Input
                  id="roomName"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="bg-eurovision-900/50 border-eurovision-700 text-eurovision-200 focus:border-eurovision-500"
                  placeholder="Enter a room name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="playerName" className="text-eurovision-300">Your Name</Label>
                <Input
                  id="playerName"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="bg-eurovision-900/50 border-eurovision-700 text-eurovision-200 focus:border-eurovision-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxPlayers" className="text-eurovision-300">Maximum Players</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="maxPlayers"
                    type="range"
                    min={2}
                    max={12}
                    value={maxPlayers}
                    onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-8 text-eurovision-200 text-right">{maxPlayers}</span>
                </div>
              </div>
              
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-eurovision-500 to-eurovision-700 hover:from-eurovision-400 hover:to-eurovision-600 text-white border-0"
                >
                  Create Room
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="text-xs text-eurovision-400 justify-center border-t border-eurovision-800 pt-4">
            Make sure you've selected your songs before creating a room!
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CreateRoomPage;
