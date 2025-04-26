
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute w-full h-full top-0 left-0 bg-cosmic-gradient animate-gradient-shift z-0"></div>
      <div className="absolute w-96 h-96 rounded-full bg-eurovision-700/20 blur-3xl -top-20 -left-20 animate-float"></div>
      <div className="absolute w-80 h-80 rounded-full bg-eurovision-500/20 blur-3xl -bottom-10 -right-10 animate-float delay-1000"></div>
      
      {/* Main content */}
      <div className="z-10 px-4 py-8 max-w-screen-sm w-full">
        <div className="flex flex-col items-center mb-16 animate-fade-in">
          <div className="mb-4">
            <Logo />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-center text-white text-glow mb-3">
            Galaxy Song Contest
          </h1>
          <p className="text-eurovision-200 text-center text-lg mb-8 max-w-md">
            Create your own Eurovision-style song contest with friends. Vote, compete, and crown the winner!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <Button 
              onClick={() => navigate('/create-room')}
              className="h-16 text-lg bg-gradient-to-r from-eurovision-500 to-eurovision-700 hover:from-eurovision-400 hover:to-eurovision-600 text-white border-0 purple-glow"
            >
              Create Room
            </Button>
            <Button 
              onClick={() => navigate('/join-room')}
              className="h-16 text-lg bg-gradient-to-r from-eurovision-800 to-eurovision-900 hover:from-eurovision-700 hover:to-eurovision-800 text-eurovision-300 border border-eurovision-600"
            >
              Join Room
            </Button>
          </div>
          
          <Button
            onClick={() => navigate('/song-selection')}
            className="mt-4 w-full h-12 bg-gradient-to-r from-eurovision-900 to-black text-eurovision-300 hover:text-eurovision-200 border border-eurovision-700"
          >
            Select Your Song Pack
          </Button>
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <FeatureCard
            title="Create & Join"
            description="Create rooms or join existing ones to compete with friends."
            delay="0"
          />
          <FeatureCard
            title="Vote"
            description="Eurovision-style voting system with points from 1 to 12."
            delay="200"
          />
          <FeatureCard
            title="Win"
            description="See who comes out on top with animated score reveals."
            delay="400"
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, delay }: { title: string; description: string; delay: string }) => {
  return (
    <div 
      className="bg-eurovision-900/40 backdrop-blur-sm border border-eurovision-700 rounded-lg p-4 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="text-eurovision-300 font-semibold text-lg mb-2">{title}</h3>
      <p className="text-eurovision-200 text-sm">{description}</p>
    </div>
  );
};

export default HomePage;
