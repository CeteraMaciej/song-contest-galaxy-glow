
import React, { useState } from 'react';

interface PointsControlProps {
  songId: string;
  onAssignPoints: (songId: string, points: number) => void;
  maxPoints: number[];
  usedPoints: number[];
}

const PointsControl = ({ songId, onAssignPoints, maxPoints, usedPoints }: PointsControlProps) => {
  const [assignedPoints, setAssignedPoints] = useState<number | null>(null);

  const handlePointsAssign = (points: number) => {
    // Only allow assignment if the points haven't been used yet
    if (!usedPoints.includes(points)) {
      setAssignedPoints(points);
      onAssignPoints(songId, points);
    }
  };

  return (
    <div className="flex flex-col items-center mt-2">
      <div className="w-12 h-12 rounded-full border-2 border-eurovision-600 flex items-center justify-center mb-1 bg-black/80">
        {assignedPoints ? (
          <span className="font-bold text-eurovision-300 animate-score-reveal">
            {assignedPoints}
          </span>
        ) : (
          <span className="text-eurovision-600 text-sm">Points</span>
        )}
      </div>
      
      <div className="flex gap-1 flex-wrap justify-center mt-2">
        {maxPoints.map(points => (
          <button
            key={points}
            onClick={() => handlePointsAssign(points)}
            disabled={usedPoints.includes(points) && assignedPoints !== points}
            className={`w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${
              assignedPoints === points
                ? 'bg-eurovision-500 text-white scale-110 purple-glow'
                : usedPoints.includes(points)
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-eurovision-700 text-eurovision-200 hover:bg-eurovision-600'
            }`}
          >
            {points}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PointsControl;
