
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-glow-gradient bg-fixed p-4">
      <div className="text-center max-w-md w-full bg-eurovision-900/80 backdrop-blur-md rounded-lg border border-eurovision-600 p-8 purple-glow">
        <h1 className="text-6xl font-bold mb-4 text-eurovision-300">404</h1>
        <p className="text-xl text-eurovision-200 mb-6">Oops! This page is lost in space</p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-eurovision-500 to-eurovision-700 hover:from-eurovision-400 hover:to-eurovision-600 text-white"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
